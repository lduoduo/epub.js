import EventEmitter from "event-emitter";

import {
  extend,
  borders,
  uuid,
  isNumber,
  bounds,
  defer,
  qs,
  parse,
  createBlobUrl,
  revokeBlobUrl,
} from "../../utils/core";

import EpubCFI from "../../epubcfi";
import Contents from "../../contents";
import { EVENTS } from "../../utils/constants";
import { Pane, Highlight, Underline } from "../pane/marks";

class InlineView {
  constructor(section, options) {
    this.settings = extend(
      {
        ignoreClass: "",
        axis: "vertical",
        width: 0,
        height: 0,
        layout: undefined,
        globalLayoutProperties: {},
      },
      options || {}
    );

    this.id = "epubjs-view:" + uuid();
    this.section = section;
    this.index = section.index;

    this.element = this.container(this.settings.axis);

    this.added = false;
    this.displayed = false;
    this.rendered = false;

    this._width = this.settings.width;
    this._height = this.settings.height;

    this.fixedWidth = 0;
    this.fixedHeight = 0;

    // Blank Cfi for Parsing
    this.epubcfi = new EpubCFI();

    this.layout = this.settings.layout;
    // Dom events to listen for
    // this.listenedEvents = ["keydown", "keyup", "keypressed", "mouseup", "mousedown", "click", "touchend", "touchstart"];

    this.pane = undefined;
    this.highlights = {};
    this.underlines = {};
    this.marks = {};
  }

  container(axis) {
    var element = document.createElement("div");

    element.classList.add("epub-view");

    element.style.overflow = "hidden";

    if (axis && axis == "horizontal") {
      element.style.flex = "none";
    } else {
      element.style.flex = "initial";
    }

    return element;
  }

  create() {
    if (this.frame) {
      return this.frame;
    }

    if (!this.element) {
      this.element = this.createContainer();
    }

    this.frame = document.createElement("div");
    this.frame.id = this.id;
    this.frame.style.overflow = "hidden";
    this.frame.style.wordSpacing = "initial";
    this.frame.style.lineHeight = "initial";

    this.resizing = true;

    this.element.style.visibility = "hidden";
    this.frame.style.visibility = "hidden";

    if (this.settings.axis === "horizontal") {
      this.frame.style.width = "auto";
    } else {
      this.frame.style.height = "auto";
    }

    this.viewBody = document.createElement("div");
    this.viewBody.className = "epubjs-view-body";
    this.viewBody.style.overflow = "visible";

    this.frame.appendChild(this.viewBody);

    this.element.appendChild(this.frame);
    this.added = true;

    this.elementBounds = bounds(this.element);

    return this.frame;
  }

  render(request, show) {
    this.create();

    // Fit to size of the container, apply padding
    this.size();

    // Render Chain
    return (
      this.section
        .render(request)
        .then(
          function (contents) {
            return this.load(contents);
          }.bind(this)
        )
        // .then(function(doc){
        // 	return this.hooks.content.trigger(view, this);
        // }.bind(this))
        .then(
          function () {
            // this.settings.layout.format(view.contents);
            // return this.hooks.layout.trigger(view, this);
          }.bind(this)
        )
        // .then(function(){
        // 	return this.display();
        // }.bind(this))
        // .then(function(){
        // 	return this.hooks.render.trigger(view, this);
        // }.bind(this))
        .then(
          function () {
            // apply the layout function to the contents
            this.settings.layout.format(this.contents, this.section, this.axis);

            // Listen for events that require an expansion of the iframe
            this.addListeners();

            // Expand the iframe to the full size of the content
            this.expand();

            if (show !== false) {
              //this.q.enqueue(function(view){
              this.show();
              //}, view);
            }
            // this.map = new Map(view, this.layout);
            //this.hooks.show.trigger(view, this);
            this.emit(EVENTS.VIEWS.RENDERED, this.section);
          }.bind(this)
        )
        .catch(
          function (e) {
            this.emit(EVENTS.VIEWS.LOAD_ERROR, e);
          }.bind(this)
        )
    );
  }

  // Determine locks base on settings
  size(_width, _height) {
    var width = _width || this.settings.width;
    var height = _height || this.settings.height;

    if (this.layout.name === "pre-paginated") {
      // TODO: check if these are different than the size set in chapter
      this.lock("both", width, height);
    } else if (this.settings.axis === "horizontal") {
      this.lock("height", width, height);
    } else {
      this.lock("width", width, height);
    }
  }

  // Lock an axis to element dimensions, taking borders into account
  lock(what, width, height) {
    var elBorders = borders(this.element);
    var iframeBorders;

    if (this.frame) {
      iframeBorders = borders(this.frame);
    } else {
      iframeBorders = { width: 0, height: 0 };
    }

    if (what == "width" && isNumber(width)) {
      this.lockedWidth = width - elBorders.width - iframeBorders.width;
    }

    if (what == "height" && isNumber(height)) {
      this.lockedHeight = height - elBorders.height - iframeBorders.height;
      // this.reframe(false, this.lockedHeight);
    }

    if (what === "both" && isNumber(width) && isNumber(height)) {
      this.lockedWidth = width - elBorders.width - iframeBorders.width;
      this.lockedHeight = height - elBorders.height - iframeBorders.height;
    }

    if (this.displayed && this.iframe) {
      this.expand();
    }
  }

  contentWidth(min) {
    return this.frame.scrollWidth;
  }

  contentHeight(min) {
    return this.frame.scrollHeight;
  }

  // Resize a single axis based on content dimensions
  expand(force) {
    var width = this.lockedWidth;
    var height = this.lockedHeight;

    var textWidth, textHeight;

    if (!this.frame || this._expanding) return;

    this._expanding = true;

    // Expand Horizontally
    if (this.settings.axis === "horizontal") {
      width = this.contentWidth(textWidth);
      width = this.contents.textWidth();

      if (width % this.layout.pageWidth > 0) {
        width =
          Math.ceil(width / this.layout.pageWidth) * this.layout.pageWidth;
      }

      if (this.settings.forceEvenPages) {
        const columns = width / this.layout.pageWidth;
        if (
          this.layout.divisor > 1 &&
          this.layout.name === "reflowable" &&
          columns % 2 > 0
        ) {
          // add a blank page
          width += this.layout.pageWidth;
        }
      }
    } // Expand Vertically
    else if (this.settings.axis === "vertical") {
      height = this.contentHeight(textHeight);
    }

    // Only Resize if dimensions have changed or
    // if Frame is still hidden, so needs reframing
    if (this._needsReframe || width != this._width || height != this._height) {
      this.reframe(width, height);
    }

    this._expanding = false;
  }

  reframe(width, height) {
    if (!this.frame) return;

    if (isNumber(width)) {
      this.element.style.width = width + "px";
      this.frame.style.width = width + "px";
      this._width = width;
    }

    if (isNumber(height)) {
      this.element.style.height = height + "px";
      this.frame.style.height = height + "px";
      this._height = height;
    }

    this.prevBounds = this.elementBounds;

    this.elementBounds = bounds(this.element);

    let size = {
      width: this.elementBounds.width,
      height: this.elementBounds.height,
      widthDelta: this.elementBounds.width - this.prevBounds.width,
      heightDelta: this.elementBounds.height - this.prevBounds.height,
    };

    this.onResize(this, size);

    this.emit(EVENTS.VIEWS.RESIZED, size);
  }

  load(contents) {
    var loading = new defer();
    var loaded = loading.promise;
    var doc = parse(contents, "text/html");
    var body = qs(doc, "body");

    this.viewBody.innerHTML = body.innerHTML;

    this.document = this.viewBody.ownerDocument;
    this.window = this.document.defaultView;

    this.contents = new Contents(
      this.document,
      this.viewBody,
      this.section.cfiBase,
      this.section.index
    );

    this.rendering = false;

    loading.resolve(this.contents);

    return loaded;
  }

  setLayout(layout) {
    this.layout = layout;
  }

  resizeListenters() {
    // Test size again
    // clearTimeout(this.expanding);
    // this.expanding = setTimeout(this.expand.bind(this), 350);
  }

  addListeners() {
    //TODO: Add content listeners for expanding
  }

  removeListeners(layoutFunc) {
    //TODO: remove content listeners for expanding
  }

  display(request) {
    var displayed = new defer();

    if (!this.displayed) {
      this.render(request).then(
        function () {
          this.emit(EVENTS.VIEWS.DISPLAYED, this);
          this.onDisplayed(this);

          this.displayed = true;

          displayed.resolve(this);
        }.bind(this)
      );
    } else {
      displayed.resolve(this);
    }

    return displayed.promise;
  }

  show() {
    this.element.style.visibility = "visible";

    if (this.frame) {
      this.frame.style.visibility = "visible";
    }

    if (this.viewBody) {
      this.viewBody.style.visibility = "visible";
      this.viewBody.style.overflow = "visible";
    }

    this.emit(EVENTS.VIEWS.SHOWN, this);
  }

  hide() {
    this.element.style.visibility = "hidden";
    this.frame.style.visibility = "hidden";
    this.viewBody.style.visibility = "hidden";

    this.stopExpanding = true;
    this.emit(EVENTS.VIEWS.HIDDEN, this);
  }

  width() {
    return this._width;
  }

  height() {
    return this._height;
  }

  position() {
    return this.element.getBoundingClientRect();
  }

  locationOf(target) {
    var parentPos = this.frame.getBoundingClientRect();
    var targetPos = this.contents.locationOf(target, this.settings.ignoreClass);

    return {
      left: window.scrollX + parentPos.left + targetPos.left,
      top: window.scrollY + parentPos.top + targetPos.top,
    };
  }

  onDisplayed(view) {
    // Stub, override with a custom functions
  }

  onResize(view, e) {
    // Stub, override with a custom functions
  }

  bounds() {
    if (!this.elementBounds) {
      this.elementBounds = bounds(this.element);
    }
    return this.elementBounds;
  }

  highlight(cfiRange, data = {}, cb, className = "epubjs-hl", styles = {}) {
    if (!this.contents) {
      return;
    }
    const attributes = Object.assign(
      { fill: "yellow", "fill-opacity": "0.3", "mix-blend-mode": "multiply" },
      styles
    );
    let range = this.contents.range(cfiRange);

    let emitter = () => {
      this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
    };

    data["epubcfi"] = cfiRange;

    if (!this.pane) {
      this.pane = new Pane(this.iframe, this.element);
    }

    let m = new Highlight(range, className, data, attributes);
    let h = this.pane.addMark(m);

    this.highlights[cfiRange] = {
      mark: h,
      element: h.element,
      listeners: [emitter, cb],
    };

    h.element.setAttribute("ref", className);
    h.element.addEventListener("click", emitter);
    h.element.addEventListener("touchstart", emitter);

    if (cb) {
      h.element.addEventListener("click", cb);
      h.element.addEventListener("touchstart", cb);
    }
    return h;
  }

  underline(cfiRange, data = {}, cb, className = "epubjs-ul", styles = {}) {
    if (!this.contents) {
      return;
    }
    const attributes = Object.assign(
      {
        stroke: "black",
        "stroke-opacity": "0.3",
        "mix-blend-mode": "multiply",
      },
      styles
    );
    let range = this.contents.range(cfiRange);
    let emitter = () => {
      this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
    };

    data["epubcfi"] = cfiRange;

    if (!this.pane) {
      this.pane = new Pane(this.iframe, this.element);
    }

    let m = new Underline(range, className, data, attributes);
    let h = this.pane.addMark(m);

    this.underlines[cfiRange] = {
      mark: h,
      element: h.element,
      listeners: [emitter, cb],
    };

    h.element.setAttribute("ref", className);
    h.element.addEventListener("click", emitter);
    h.element.addEventListener("touchstart", emitter);

    if (cb) {
      h.element.addEventListener("click", cb);
      h.element.addEventListener("touchstart", cb);
    }
    return h;
  }

  mark(cfiRange, data = {}, cb) {
    if (!this.contents) {
      return;
    }

    if (cfiRange in this.marks) {
      let item = this.marks[cfiRange];
      return item;
    }

    let range = this.contents.range(cfiRange);
    if (!range) {
      return;
    }
    let container = range.commonAncestorContainer;
    let parent = container.nodeType === 1 ? container : container.parentNode;

    let emitter = (e) => {
      this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
    };

    if (range.collapsed && container.nodeType === 1) {
      range = new Range();
      range.selectNodeContents(container);
    } else if (range.collapsed) {
      // Webkit doesn't like collapsed ranges
      range = new Range();
      range.selectNodeContents(parent);
    }

    let mark = this.document.createElement("a");
    mark.setAttribute("ref", "epubjs-mk");
    mark.style.position = "absolute";

    mark.dataset["epubcfi"] = cfiRange;

    if (data) {
      Object.keys(data).forEach((key) => {
        mark.dataset[key] = data[key];
      });
    }

    if (cb) {
      mark.addEventListener("click", cb);
      mark.addEventListener("touchstart", cb);
    }

    mark.addEventListener("click", emitter);
    mark.addEventListener("touchstart", emitter);

    this.placeMark(mark, range);

    this.element.appendChild(mark);

    this.marks[cfiRange] = {
      element: mark,
      range: range,
      listeners: [emitter, cb],
    };

    return parent;
  }

  placeMark(element, range) {
    let top, right, left;

    if (
      this.layout.name === "pre-paginated" ||
      this.settings.axis !== "horizontal"
    ) {
      let pos = range.getBoundingClientRect();
      top = pos.top;
      right = pos.right;
    } else {
      // Element might break columns, so find the left most element
      let rects = range.getClientRects();

      let rect;
      for (var i = 0; i != rects.length; i++) {
        rect = rects[i];
        if (!left || rect.left < left) {
          left = rect.left;
          // right = rect.right;
          right =
            Math.ceil(left / this.layout.props.pageWidth) *
              this.layout.props.pageWidth -
            this.layout.gap / 2;
          top = rect.top;
        }
      }
    }

    element.style.top = `${top}px`;
    element.style.left = `${right}px`;
  }

  unhighlight(cfiRange) {
    let item;
    if (cfiRange in this.highlights) {
      item = this.highlights[cfiRange];

      this.pane.removeMark(item.mark);
      item.listeners.forEach((l) => {
        if (l) {
          item.element.removeEventListener("click", l);
          item.element.removeEventListener("touchstart", l);
        }
      });
      delete this.highlights[cfiRange];
    }
  }

  ununderline(cfiRange) {
    let item;
    if (cfiRange in this.underlines) {
      item = this.underlines[cfiRange];
      this.pane.removeMark(item.mark);
      item.listeners.forEach((l) => {
        if (l) {
          item.element.removeEventListener("click", l);
          item.element.removeEventListener("touchstart", l);
        }
      });
      delete this.underlines[cfiRange];
    }
  }

  unmark(cfiRange) {
    let item;
    if (cfiRange in this.marks) {
      item = this.marks[cfiRange];
      this.element.removeChild(item.element);
      item.listeners.forEach((l) => {
        if (l) {
          item.element.removeEventListener("click", l);
          item.element.removeEventListener("touchstart", l);
        }
      });
      delete this.marks[cfiRange];
    }
  }

  destroy() {
    for (let cfiRange in this.highlights) {
      this.unhighlight(cfiRange);
    }

    for (let cfiRange in this.underlines) {
      this.ununderline(cfiRange);
    }

    for (let cfiRange in this.marks) {
      this.unmark(cfiRange);
    }

    if (this.blobUrl) {
      revokeBlobUrl(this.blobUrl);
    }

    if (this.displayed) {
      this.displayed = false;

      this.removeListeners();

      this.stopExpanding = true;
      this.element.removeChild(this.frame);
      this.displayed = false;
      this.frame = null;

      this._textWidth = null;
      this._textHeight = null;
      this._width = null;
      this._height = null;
    }
    // this.element.style.height = "0px";
    // this.element.style.width = "0px";
  }
}

EventEmitter(InlineView.prototype);

export default InlineView;

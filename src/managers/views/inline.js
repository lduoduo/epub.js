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
  constructor(section, options, manager) {
    this.settings = extend(
      {
        ignoreClass: "",
        axis: undefined, //options.layout && options.layout.props.flow === "scrolled" ? "vertical" : "horizontal",
        direction: undefined,
        width: 0,
        height: 0,
        layout: undefined,
        globalLayoutProperties: {},
        method: undefined,
        forceRight: false,
      },
      options || {}
    );

    this.manager = manager;
    this.id = "epubjs-view-" + uuid();
    this.section = section;
    this.index = section.index;

    this.element = this.container(this.settings.axis);

    this.added = false;
    this.displayed = false;
    this.rendered = false;

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

    // this.element.style.minHeight = "100px";
    element.style.height = "0px";
    element.style.width = "0px";
    element.style.overflow = "hidden";
    element.style.position = "relative";
    element.style.display = "block";

    if (axis && axis == "horizontal") {
      element.style.flex = "none";
    } else {
      element.style.flex = "initial";
    }

    return element;
  }

  create() {
    if (this.iframe) {
      return this.iframe;
    }

    if (!this.element) {
      this.element = this.createContainer();
    }

    this.iframe = document.createElement("div");
    this.iframe.id = this.id;
    this.iframe.style.overflow = "hidden";
    this.iframe.style.wordSpacing = "initial";
    this.iframe.style.lineHeight = "initial";

    this.resizing = true;

    this.element.style.visibility = "hidden";
    this.iframe.style.visibility = "hidden";

    if (this.settings.axis === "horizontal") {
      this.iframe.style.width = "auto";
    } else {
      this.iframe.style.height = "auto";
    }

    this.viewBody = document.createElement("div");
    this.viewBody.className = "epubjs-view-body";
    this.viewBody.style.overflow = "visible";

    this.iframe.appendChild(this.viewBody);

    this.element.appendChild(this.iframe);
    this.element.setAttribute("ref", this.index);

    this.added = true;

    this.elementBounds = bounds(this.element);

    return this.iframe;
  }

  render(request, show) {
    // view.onLayout = this.layout.format.bind(this.layout);
    this.create();

    // Fit to size of the container, apply padding
    this.size();

    if (!this.sectionRender) {
      this.sectionRender = this.section.render(request);
    }

    // Render Chain
    return this.sectionRender
      .then((contents) => this.load(contents))
      .then(
        () => {
          // find and report the writingMode axis
          let writingMode = this.contents.writingMode();

          // Set the axis based on the flow and writing mode
          let axis;
          if (this.settings.flow === "scrolled") {
            axis =
              writingMode.indexOf("vertical") === 0 ? "horizontal" : "vertical";
          } else {
            axis =
              writingMode.indexOf("vertical") === 0 ? "vertical" : "horizontal";
          }

          if (
            writingMode.indexOf("vertical") === 0 &&
            this.settings.flow === "paginated"
          ) {
            this.layout.delta = this.layout.height;
          }

          this.setAxis(axis);
          this.emit(EVENTS.VIEWS.AXIS, axis);

          this.setWritingMode(writingMode);
          this.emit(EVENTS.VIEWS.WRITING_MODE, writingMode);

          // apply the layout function to the contents
          this.layout.format(this.contents, this.section, this.axis);

          // Listen for events that require an expansion of the iframe
          this.addListeners();

          return new Promise((resolve, reject) => {
            this.show();

            // Expand the iframe to the full size of the content
            this.expand();

            if (this.settings.forceRight) {
              this.element.style.marginLeft = this.width() + "px";
            }

            // console.log("expanded resolve");
            resolve();
          });
        },
        (e) => {
          this.emit(EVENTS.VIEWS.LOAD_ERROR, e);
          return new Promise((resolve, reject) => {
            reject(e);
          });
        }
      )
      .then(() => this.emit(EVENTS.VIEWS.RENDERED, this.section));
  }

  reset() {
    if (this.iframe) {
      this.iframe.style.width = "0";
      this.iframe.style.height = "0";
      this._width = 0;
      this._height = 0;
      this._textWidth = undefined;
      this._contentWidth = undefined;
      this._textHeight = undefined;
      this._contentHeight = undefined;
    }
    this._needsReframe = true;
  }

  // Determine locks base on settings
  size(_width, _height) {
    var width = _width || this.settings.width;
    var height = _height || this.settings.height;

    // console.log("inline size");
    if (this.layout.name === "pre-paginated") {
      this.lock("both", width, height);
    } else if (this.settings.axis === "horizontal") {
      this.lock("height", width, height);
    } else {
      this.lock("width", width, height);
    }

    this.settings.width = width;
    this.settings.height = height;
  }

  // Lock an axis to element dimensions, taking borders into account
  lock(what, width, height) {
    var elBorders = borders(this.element);
    var iframeBorders;

    if (this.iframe) {
      iframeBorders = borders(this.iframe);
    } else {
      iframeBorders = { width: 0, height: 0 };
    }

    if (what == "width" && isNumber(width)) {
      this.lockedWidth = width - elBorders.width - iframeBorders.width;
      // this.resize(this.lockedWidth, width); //  width keeps ratio correct
    }

    if (what == "height" && isNumber(height)) {
      this.lockedHeight = height - elBorders.height - iframeBorders.height;
      // this.resize(width, this.lockedHeight);
    }

    if (what === "both" && isNumber(width) && isNumber(height)) {
      this.lockedWidth = width - elBorders.width - iframeBorders.width;
      this.lockedHeight = height - elBorders.height - iframeBorders.height;
      // this.resize(this.lockedWidth, this.lockedHeight);
    }

    if (this.displayed && this.iframe) {
      // this.contents.layout();

      // console.log("lock expand");
      this.expand();
    }
  }

  // Resize a single axis based on content dimensions
  expand(force) {
    var width = this.lockedWidth;
    var height = this.lockedHeight;
    var columns;

    if (!this.iframe || this._expanding) return;

    this._expanding = true;

    if (this.layout.name === "pre-paginated") {
      width = this.layout.columnWidth;
      height = this.layout.height;
    }
    // Expand Horizontally
    else if (this.settings.axis === "horizontal") {
      // Get the width of the text
      width = this.contents.textWidth();
      // console.log("计算宽度", width, this.contents);

      if (width % this.layout.pageWidth > 0) {
        width =
          Math.ceil(width / this.layout.pageWidth) * this.layout.pageWidth;
      }

      if (this.settings.forceEvenPages) {
        columns = width / this.layout.pageWidth;
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
      height = this.contents.textHeight();
      if (
        this.settings.flow === "paginated" &&
        height % this.layout.height > 0
      ) {
        height = Math.ceil(height / this.layout.height) * this.layout.height;
      }
    }

    // Only Resize if dimensions have changed or
    // if Frame is still hidden, so needs reframing
    if (this._needsReframe || width != this._width || height != this._height) {
      this.reframe(width, height);
    }

    this._expanding = false;
  }

  reframe(width, height) {
    var size;

    if (isNumber(width)) {
      this.element.style.width = width + "px";
      this.iframe.style.width = width + "px";
      this._width = width;
    }

    if (isNumber(height)) {
      this.element.style.height = height + "px";
      this.iframe.style.height = height + "px";
      this._height = height;
    }

    let widthDelta = this.prevBounds ? width - this.prevBounds.width : width;
    let heightDelta = this.prevBounds
      ? height - this.prevBounds.height
      : height;

    size = {
      width: width,
      height: height,
      widthDelta: widthDelta,
      heightDelta: heightDelta,
    };

    this.pane && this.pane.render();

    requestAnimationFrame(() => {
      let mark;
      for (let m in this.marks) {
        if (this.marks.hasOwnProperty(m)) {
          mark = this.marks[m];
          this.placeMark(mark.element, mark.range);
        }
      }
    });

    this.onResize(this, size);

    this.emit(EVENTS.VIEWS.RESIZED, size);

    this.prevBounds = size;

    this.elementBounds = bounds(this.element);
  }

  load(contents) {
    var loading = new defer();
    var loaded = loading.promise;
    var doc = parse(contents, "text/html");
    var html = qs(doc, "html");

    const innerHTML = html.innerHTML
      .replace(/head/g, "div")
      .replace(/body/g, "div");
    this.viewBody.innerHTML = innerHTML;

    setTimeout(() => {
      this.onLoad(event, loading);
    }, 100);

    return loaded;
  }

  onLoad(event, promise) {
    this.document = this.viewBody.ownerDocument;
    this.window = this.document.defaultView;

    this.contents = new Contents(
      this.document,
      this.iframe,
      this.viewBody,
      this.section.cfiBase,
      this.section.index
    );

    this.contents.viewType = "inline";

    this.rendering = false;

    this.rendering = false;

    var link = this.document.querySelector("link[rel='canonical']");
    if (link) {
      link.setAttribute("href", this.section.canonical);
    } else {
      link = this.document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", this.section.canonical);
      this.document.querySelector("head").appendChild(link);
    }

    this.contents.on(EVENTS.CONTENTS.EXPAND, (e) => {
      // console.log("inline EVENTS.CONTENTS.EXPAND", e);
      if (this.displayed && this.iframe) {
        this.expand();
        if (this.contents) {
          this.layout.format(this.contents);
        }
      }
    });

    this.contents.on(EVENTS.CONTENTS.RESIZE, (e) => {
      // console.log("inline EVENTS.CONTENTS.RESIZE", e);
      if (this.displayed && this.iframe) {
        this.expand();
        if (this.contents) {
          this.layout.format(this.contents);
        }
      }
    });

    // console.log("load done");
    promise.resolve(this.contents);
  }

  setLayout(layout) {
    this.layout = layout;

    if (this.contents) {
      this.layout.format(this.contents);
      // console.log("setLayout expand");

      this.expand();
    }
  }

  setAxis(axis) {
    this.settings.axis = axis;

    if (axis == "horizontal") {
      this.element.style.flex = "none";
    } else {
      this.element.style.flex = "initial";
    }

    this.size();
  }

  setWritingMode(mode) {
    // this.element.style.writingMode = writingMode;
    this.writingMode = mode;
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
        () => {
          this.emit(EVENTS.VIEWS.DISPLAYED, this);
          this.onDisplayed(this);

          this.displayed = true;
          displayed.resolve(this);
        },
        (err) => {
          displayed.reject(err, this);
        }
      );
    } else {
      displayed.resolve(this);
    }

    return displayed.promise;
  }

  show() {
    // const that = this;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.element.style.visibility = "visible";

        if (this.iframe) {
          this.iframe.style.visibility = "visible";

          // Remind Safari to redraw the iframe
          this.iframe.style.transform = "translateZ(0)";
          this.iframe.offsetWidth;
          this.iframe.style.transform = null;
        }

        if (this.viewBody) {
          this.viewBody.style.visibility = "visible";
          this.viewBody.style.overflow = "visible";
        }

        resolve();
      }, 200);
    }).then(() => {
      this.emit(EVENTS.VIEWS.SHOWN, this);
    });
  }

  hide() {
    // console.log("hide", this.iframe, this.element, this.viewBody);
    // this.iframe.style.display = "none";
    this.element.style.visibility = "hidden";
    if (this.iframe) {
      this.iframe.style.visibility = "hidden";
    }
    this.viewBody.style.visibility = "hidden";

    this.stopExpanding = true;
    this.emit(EVENTS.VIEWS.HIDDEN, this);
  }

  offset() {
    return {
      top: this.element.offsetTop,
      left: this.element.offsetLeft,
    };
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
    var parentPos = this.iframe.getBoundingClientRect();
    var targetPos = this.contents.locationOf(target, this.settings.ignoreClass);

    return {
      left: targetPos.left,
      top: targetPos.top,
    };
  }

  onDisplayed(view) {
    // Stub, override with a custom functions
  }

  onResize(view, e) {
    // Stub, override with a custom functions
  }

  bounds(force) {
    if (force || !this.elementBounds) {
      this.elementBounds = bounds(this.element);
    }

    return this.elementBounds;
  }

  highlight(cfiRange, data = {}, cb, className = "epubjs-hl", styles = {}) {
    if (!this.contents) {
      return;
    }

    const attributes = Object.assign(
      {
        fill: styles.color || "yellow",
        "fill-opacity": "0.2",
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

    let m = new Highlight(range, className, data, attributes);
    // console.log("m this", m, this);

    // 这里再非ifame渲染时，添加mark, range的getClientRects返回的是基于document的位置信息，所以翻页会有问题
    let h = this.pane.addMark(m);

    this.highlights[cfiRange] = {
      mark: h,
      element: h.element,
      listeners: [emitter, cb],
    };

    h.element.setAttribute("ref", className);
    h.element.addEventListener("click", emitter);
    h.element.addEventListener("touchstart", emitter);

    // if (cb) {
    //   h.element.addEventListener("click", cb);
    //   h.element.addEventListener("touchstart", cb);
    // }
    return h;
  }

  underline(cfiRange, data = {}, cb, className = "epubjs-ul", styles = {}) {
    if (!this.contents) {
      return;
    }

    // 检查是否已经有了，
    if (this.pane && this.pane.marks) {
      const h = this.pane.marks.find((d) => d.data.epubcfi === cfiRange);
      if (h) return h;
    }

    const attributes = styles;

    let range = this.contents.range(cfiRange);

    data["epubcfi"] = cfiRange;

    if (!this.pane) {
      this.pane = new Pane(this.iframe, this.element);
    }

    let m = new Underline(range, className, data, attributes);
    let h = this.pane.addMark(m);

    let emitter = (e) => {
      e.stopPropagation();
      e.preventDefault();

      // console.log("emitter", e.target, h, e, this);
      const { target: { x: eX, width: eWidth } = {} } = e;

      if (!eX || !eWidth) return;

      const {
        rendition: { location = {} } = {},
        layout: { gap = 0, columnWidth = 0 } = {},
      } = this.manager;
      const { start: { displayed: { page = 1 } = {} } = {} } = location;

      const w1 = page <= 1 ? 0 : (page - 1) * (columnWidth + gap) - gap;
      const w2 = w1 + columnWidth;

      console.log("left", eX.baseVal.value, eWidth.baseVal.value);
      console.log("前一页", w1);
      console.log("当前页", w2);

      // 判断点击区域是否在当前有热词的页面
      if (eX.baseVal.value > w1 && eX.baseVal.value < w2) {
        console.log("当前热词");
        this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
      }

      if (
        eX.baseVal.value + eWidth.baseVal.value > w1 &&
        eX.baseVal.value + eWidth.baseVal.value < w2
      ) {
        console.log("当前热词");
        this.emit(EVENTS.VIEWS.MARK_CLICKED, cfiRange, data);
      }
    };

    this.underlines[cfiRange] = {
      mark: h,
      element: h.element,
      listeners: [emitter, cb],
    };

    h.element.setAttribute("ref", className);
    h.element.addEventListener("click", emitter);
    h.element.addEventListener("touchstart", emitter);

    // console.log("underline cfiRange", h.element, data, cfiRange);

    if (cb) {
      console.log("注册cfi点击事件 cfiRange", data, cfiRange, h.element);
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
      this.contents.destroy();

      this.stopExpanding = true;
      this.iframe && this.element.removeChild(this.iframe);

      this.iframe = undefined;
      this.contents = undefined;

      this._textWidth = null;
      this._textHeight = null;
      this._width = null;
      this._height = null;
    }
  }
}

InlineView.type = "inline";

EventEmitter(InlineView.prototype);

export default InlineView;

import svg from "./svg";
import events from "./events";

export class Pane {
  constructor(target, container = document.body) {
    this.target = target;
    this.element = svg.createElement("svg");
    this.marks = [];

    // Match the coordinates of the target element
    this.element.style.position = "absolute";
    // Disable pointer events
    this.element.setAttribute("pointer-events", "none");

    // Set up mouse event proxying between the target element and the marks
    events.proxyMouse(this.target, this.marks);

    this.container = container;
    this.container.appendChild(this.element);

    this.render();
  }

  addMark(mark) {
    var g = svg.createElement("g");
    this.element.appendChild(g);
    mark.bind(g, this.container);

    this.marks.push(mark);

    // console.log("addMark", mark.data.epubcfi);
    mark.render();
    return mark;
  }

  removeMark(mark) {
    var idx = this.marks.indexOf(mark);
    if (idx === -1) {
      return;
    }
    var el = mark.unbind();
    this.element.removeChild(el);
    this.marks.splice(idx, 1);
  }

  render() {
    setCoords(this.element, coords(this.target, this.container));
    for (var m of this.marks) {
      m.render();
    }
  }
}

export class Mark {
  constructor() {
    this.element = null;
  }

  bind(element, container) {
    this.element = element;
    this.container = container;
  }

  unbind() {
    var el = this.element;
    this.element = null;
    return el;
  }

  render() {}

  dispatchEvent(e) {
    if (!this.element) return;
    this.element.dispatchEvent(e);
  }

  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }

  getClientRects() {
    var rects = [];
    var el = this.element.firstChild;
    while (el) {
      rects.push(el.getBoundingClientRect());
      el = el.nextSibling;
    }
    return rects;
  }

  filteredRanges(type = "") {
    if (!this.range) return [];
    var rects = Array.from(this.range.getClientRects());

    if (!type) return rects;

    return rects.filter((d) => filterRects(d, rects, type));
  }
}

export class Highlight extends Mark {
  constructor(range, className, data, attributes = {}) {
    super();
    this.range = range;
    this.className = className;
    this.data = data || {};

    this.attributes = {};
    this.strokAttributes = {};

    Object.keys(attributes).map((k) => {
      if (/stroke/.test(k)) {
        this.strokAttributes[k] = attributes[k];
      } else {
        this.attributes[k] = attributes[k];
      }
    });
  }

  bind(element, container) {
    super.bind(element, container);

    for (var attr in this.data) {
      if (this.data.hasOwnProperty(attr)) {
        this.element.dataset[attr] = this.data[attr];
      }
    }

    for (var attr in this.attributes) {
      if (this.attributes.hasOwnProperty(attr)) {
        this.element.setAttribute(attr, this.attributes[attr]);
      }
    }

    if (this.className) {
      this.element.classList.add(this.className);
    }
  }

  render() {
    const { data: { offsetX = 1 } = {} } = this;
    // Empty element
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    var docFrag = this.element.ownerDocument.createDocumentFragment();
    var filtered = this.filteredRanges("parent");
    var offset = this.element.getBoundingClientRect();
    var container = this.container.getBoundingClientRect();

    console.log("Highlight render filtered", filtered);

    for (var i = 0, len = filtered.length; i < len; i++) {
      var r = filtered[i];
      var el = svg.createElement("rect");
      el.setAttribute("x", r.left + offsetX - offset.left + container.left);
      el.setAttribute("y", r.top - offset.top + container.top);
      el.setAttribute("height", r.height);
      el.setAttribute("width", r.width);
      docFrag.appendChild(el);
    }

    this.element.appendChild(docFrag);
  }
}

export class Underline extends Highlight {
  constructor(range, className, data, attributes) {
    super(range, className, data, attributes);
  }

  render() {
    // Empty element
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    var docFrag = this.element.ownerDocument.createDocumentFragment();
    var filtered = this.filteredRanges("child");
    var offset = this.element.getBoundingClientRect();
    var container = this.container.getBoundingClientRect();

    const styles = Object.keys(this.strokAttributes).map((k) => ({
      key: [k],
      value: this.strokAttributes[k],
    }));

    const constainerLeft = container.left < 0 ? 0 : container.left;

    for (var i = 0, len = filtered.length; i < len; i++) {
      var r = filtered[i];

      const left = r.left - offset.left + constainerLeft;
      const top = r.top - offset.top + container.top;

      // console.log("rect x, y", left, top);

      var rect = svg.createElement("rect");

      // rect.style.position = "absolute";
      // rect.style.left = `${left}px`;
      rect.setAttribute("x", left);
      rect.setAttribute("y", top);
      rect.setAttribute("height", r.height);
      rect.setAttribute("width", r.width);
      rect.setAttribute("fill", "none");

      var line = svg.createElement("line");
      // line.style.position = "absolute";
      // line.style.left = `${left}px`;
      line.setAttribute("x1", left);
      line.setAttribute("x2", left + r.width);
      line.setAttribute("y1", top + r.height + 1);
      line.setAttribute("y2", top + r.height + 1);

      line.setAttribute("stroke-linecap", "square");
      styles.map((d) => line.setAttribute(d.key, d.value));

      docFrag.appendChild(rect);

      docFrag.appendChild(line);
    }

    this.element.appendChild(docFrag);
  }
}

function coords(el, container) {
  var offset = container.getBoundingClientRect();
  var rect = el.getBoundingClientRect();

  return {
    top: rect.top - offset.top,
    left: rect.left - offset.left,
    height: el.scrollHeight,
    width: el.scrollWidth,
  };
}

function setCoords(el, coords) {
  el.style.setProperty("top", `${coords.top}px`, "important");
  el.style.setProperty("left", `${coords.left}px`, "important");
  el.style.setProperty("height", `${coords.height}px`, "important");
  el.style.setProperty("width", `${coords.width}px`, "important");
}

function filterRects(target, list, type) {
  // De-duplicate the boxes, 这里原始逻辑把被大块包裹的小块去掉了，对于下划线来说，我们需要做相反的逻辑，去掉大块，保留小块
  // 以大的为主，过滤掉小的
  if (type === "parent") {
    const d = list.find((d) => d !== target && contains(d, target));
    return !d;
  }

  // 以小的为主，过滤掉大的
  const d = list.find((d) => d !== target && contains(target, d));
  return !d;
}

function contains(parent, child) {
  return (
    child.right <= parent.right &&
    child.left >= parent.left &&
    child.top >= parent.top &&
    child.bottom <= parent.bottom
  );
}

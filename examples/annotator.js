!(function t(e, n, o) {
  var i = "function" == typeof hypothesisRequire && hypothesisRequire;
  function r(s, a) {
    if (!n[s]) {
      if (!e[s]) {
        var l = "function" == typeof hypothesisRequire && hypothesisRequire;
        if (!a && l) return l(s, !0);
        if (i) return i(s, !0);
        var c = new Error("Cannot find module '" + s + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      var u = (n[s] = { exports: {} });
      e[s][0].call(
        u.exports,
        function (t) {
          var n = e[s][1][t];
          return r(n || t);
        },
        u,
        u.exports,
        t,
        e,
        n,
        o
      );
    }
    return n[s].exports;
  }
  for (var s = 0; s < o.length; s++) r(o[s]);
  return r;
})(
  {
    1: [
      function (t, e, n) {
        "use strict";
        function o(t) {
          return t.split("").reverse().join("");
        }
        function i(t) {
          return ((t | -t) >> 31) & 1;
        }
        function r(t, e, n, o) {
          var r = t.P[n],
            s = t.M[n],
            a = o >>> 31,
            l = e[n] | a,
            c = l | s,
            u = (((l & r) + r) ^ r) | l,
            h = s | ~(u | r),
            d = r & u,
            f = i(h & t.lastRowMask[n]) - i(d & t.lastRowMask[n]);
          return (
            (h <<= 1),
            (d <<= 1),
            (r = (d |= a) | ~(c | (h |= i(o) - a))),
            (s = h & c),
            (t.P[n] = r),
            (t.M[n] = s),
            f
          );
        }
        function s(t, e, n) {
          if (0 === e.length) return [];
          n = Math.min(n, e.length);
          var o = [],
            i = 32,
            s = Math.ceil(e.length / i) - 1,
            a = {
              P: new Uint32Array(s + 1),
              M: new Uint32Array(s + 1),
              lastRowMask: new Uint32Array(s + 1),
            };
          a.lastRowMask.fill(1 << 31),
            (a.lastRowMask[s] = 1 << (e.length - 1) % i);
          for (
            var l = new Uint32Array(s + 1), c = new Map(), u = [], h = 0;
            h < 256;
            h++
          )
            u.push(l);
          for (var d = 0; d < e.length; d += 1) {
            var f = e.charCodeAt(d);
            if (!c.has(f)) {
              var p = new Uint32Array(s + 1);
              c.set(f, p), f < u.length && (u[f] = p);
              for (var g = 0; g <= s; g += 1) {
                p[g] = 0;
                for (var m = 0; m < i; m += 1) {
                  var _ = g * i + m;
                  _ >= e.length || (e.charCodeAt(_) === f && (p[g] |= 1 << m));
                }
              }
            }
          }
          var v = Math.max(0, Math.ceil(n / i) - 1),
            y = new Uint32Array(s + 1);
          for (g = 0; g <= v; g += 1) y[g] = (g + 1) * i;
          for (y[s] = e.length, g = 0; g <= v; g += 1)
            (a.P[g] = -1), (a.M[g] = 0);
          for (var b = 0; b < t.length; b += 1) {
            var w = t.charCodeAt(b);
            (p = void 0),
              w < u.length ? (p = u[w]) : void 0 === (p = c.get(w)) && (p = l);
            var E = 0;
            for (g = 0; g <= v; g += 1) (E = r(a, p, g, E)), (y[g] += E);
            if (y[v] - E <= n && v < s && (1 & p[v + 1] || E < 0)) {
              (v += 1), (a.P[v] = -1), (a.M[v] = 0);
              var O = v === s ? e.length % i : i;
              y[v] = y[v - 1] + O - E + r(a, p, v, E);
            } else for (; v > 0 && y[v] >= n + i; ) v -= 1;
            v === s &&
              y[v] <= n &&
              (y[v] < n && o.splice(0, o.length),
              o.push({ start: -1, end: b + 1, errors: y[v] }),
              (n = y[v]));
          }
          return o;
        }
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (t, e, n) {
            return (function (t, e, n) {
              var i = o(e);
              return n.map(function (n) {
                var r = Math.max(0, n.end - e.length - n.errors);
                return {
                  start: s(o(t.slice(r, n.end)), i, n.errors).reduce(function (
                    t,
                    e
                  ) {
                    return n.end - e.end < t ? n.end - e.end : t;
                  },
                  n.end),
                  end: n.end,
                  errors: n.errors,
                };
              });
            })(t, e, s(t, e, n));
          });
      },
      {},
    ],
    2: [
      function (t, e, n) {
        (function (t) {
          (function () {
            /*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
            !(function () {
              "use strict";
              var n = {}.hasOwnProperty;
              function o() {
                for (var t = [], e = 0; e < arguments.length; e++) {
                  var i = arguments[e];
                  if (i) {
                    var r = typeof i;
                    if ("string" === r || "number" === r) t.push(i);
                    else if (Array.isArray(i) && i.length) {
                      var s = o.apply(null, i);
                      s && t.push(s);
                    } else if ("object" === r)
                      for (var a in i) n.call(i, a) && i[a] && t.push(a);
                  }
                }
                return t.join(" ");
              }
              void 0 !== e && e.exports
                ? ((o.default = o), (e.exports = o))
                : "function" == typeof t && "object" == typeof t.amd && t.amd
                ? t("classnames", [], function () {
                    return o;
                  })
                : (window.classNames = o);
            })();
          }.call(this));
        }.call(this, void 0));
      },
      {},
    ],
    3: [
      function (t, e, n) {
        (function (t) {
          (function () {
            var o;
            (o = function () {
              "use strict";
              function t(t) {
                var e = !0,
                  n = !1,
                  o = null,
                  i = {
                    text: !0,
                    search: !0,
                    url: !0,
                    tel: !0,
                    email: !0,
                    password: !0,
                    number: !0,
                    date: !0,
                    month: !0,
                    week: !0,
                    time: !0,
                    datetime: !0,
                    "datetime-local": !0,
                  };
                function r(t) {
                  return !!(
                    t &&
                    t !== document &&
                    "HTML" !== t.nodeName &&
                    "BODY" !== t.nodeName &&
                    "classList" in t &&
                    "contains" in t.classList
                  );
                }
                function s(t) {
                  t.classList.contains("focus-visible") ||
                    (t.classList.add("focus-visible"),
                    t.setAttribute("data-focus-visible-added", ""));
                }
                function a(t) {
                  e = !1;
                }
                function l() {
                  document.addEventListener("mousemove", c),
                    document.addEventListener("mousedown", c),
                    document.addEventListener("mouseup", c),
                    document.addEventListener("pointermove", c),
                    document.addEventListener("pointerdown", c),
                    document.addEventListener("pointerup", c),
                    document.addEventListener("touchmove", c),
                    document.addEventListener("touchstart", c),
                    document.addEventListener("touchend", c);
                }
                function c(t) {
                  (t.target.nodeName &&
                    "html" === t.target.nodeName.toLowerCase()) ||
                    ((e = !1),
                    document.removeEventListener("mousemove", c),
                    document.removeEventListener("mousedown", c),
                    document.removeEventListener("mouseup", c),
                    document.removeEventListener("pointermove", c),
                    document.removeEventListener("pointerdown", c),
                    document.removeEventListener("pointerup", c),
                    document.removeEventListener("touchmove", c),
                    document.removeEventListener("touchstart", c),
                    document.removeEventListener("touchend", c));
                }
                document.addEventListener(
                  "keydown",
                  function (n) {
                    n.metaKey ||
                      n.altKey ||
                      n.ctrlKey ||
                      (r(t.activeElement) && s(t.activeElement), (e = !0));
                  },
                  !0
                ),
                  document.addEventListener("mousedown", a, !0),
                  document.addEventListener("pointerdown", a, !0),
                  document.addEventListener("touchstart", a, !0),
                  document.addEventListener(
                    "visibilitychange",
                    function (t) {
                      "hidden" === document.visibilityState &&
                        (n && (e = !0), l());
                    },
                    !0
                  ),
                  l(),
                  t.addEventListener(
                    "focus",
                    function (t) {
                      var n, o, a;
                      r(t.target) &&
                        (e ||
                          ((o = (n = t.target).type),
                          ("INPUT" === (a = n.tagName) &&
                            i[o] &&
                            !n.readOnly) ||
                            ("TEXTAREA" === a && !n.readOnly) ||
                            n.isContentEditable)) &&
                        s(t.target);
                    },
                    !0
                  ),
                  t.addEventListener(
                    "blur",
                    function (t) {
                      var e;
                      r(t.target) &&
                        (t.target.classList.contains("focus-visible") ||
                          t.target.hasAttribute("data-focus-visible-added")) &&
                        ((n = !0),
                        window.clearTimeout(o),
                        (o = window.setTimeout(function () {
                          n = !1;
                        }, 100)),
                        (e = t.target).hasAttribute(
                          "data-focus-visible-added"
                        ) &&
                          (e.classList.remove("focus-visible"),
                          e.removeAttribute("data-focus-visible-added")));
                    },
                    !0
                  ),
                  t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host
                    ? t.host.setAttribute("data-js-focus-visible", "")
                    : t.nodeType === Node.DOCUMENT_NODE &&
                      (document.documentElement.classList.add(
                        "js-focus-visible"
                      ),
                      document.documentElement.setAttribute(
                        "data-js-focus-visible",
                        ""
                      ));
              }
              if (
                "undefined" != typeof window &&
                "undefined" != typeof document
              ) {
                var e;
                window.applyFocusVisiblePolyfill = t;
                try {
                  e = new CustomEvent("focus-visible-polyfill-ready");
                } catch (n) {
                  (e = document.createEvent("CustomEvent")).initCustomEvent(
                    "focus-visible-polyfill-ready",
                    !1,
                    !1,
                    {}
                  );
                }
                window.dispatchEvent(e);
              }
              "undefined" != typeof document && t(document);
            }),
              "object" == typeof n && void 0 !== e
                ? o()
                : "function" == typeof t && t.amd
                ? t(o)
                : o();
          }.call(this));
        }.call(this, void 0));
      },
      {},
    ],
    4: [
      function (t, e, n) {
        (function (t) {
          (function () {
            /*! Hammer.JS - v2.0.7 - 2016-04-22
             * http://hammerjs.github.io/
             *
             * Copyright (c) 2016 Jorik Tangelder;
             * Licensed under the MIT license */
            !(function (n, o, i, r) {
              "use strict";
              var s,
                a = ["", "webkit", "Moz", "MS", "ms", "o"],
                l = o.createElement("div"),
                c = Math.round,
                u = Math.abs,
                h = Date.now;
              function d(t, e, n) {
                return setTimeout(y(t, n), e);
              }
              function f(t, e, n) {
                return !!Array.isArray(t) && (p(t, n[e], n), !0);
              }
              function p(t, e, n) {
                var o;
                if (t)
                  if (t.forEach) t.forEach(e, n);
                  else if (t.length !== r)
                    for (o = 0; o < t.length; ) e.call(n, t[o], o, t), o++;
                  else
                    for (o in t) t.hasOwnProperty(o) && e.call(n, t[o], o, t);
              }
              function g(t, e, o) {
                var i = "DEPRECATED METHOD: " + e + "\n" + o + " AT \n";
                return function () {
                  var e = new Error("get-stack-trace"),
                    o =
                      e && e.stack
                        ? e.stack
                            .replace(/^[^\(]+?[\n$]/gm, "")
                            .replace(/^\s+at\s+/gm, "")
                            .replace(
                              /^Object.<anonymous>\s*\(/gm,
                              "{anonymous}()@"
                            )
                        : "Unknown Stack Trace",
                    r = n.console && (n.console.warn || n.console.log);
                  return r && r.call(n.console, i, o), t.apply(this, arguments);
                };
              }
              s =
                "function" != typeof Object.assign
                  ? function (t) {
                      if (t === r || null === t)
                        throw new TypeError(
                          "Cannot convert undefined or null to object"
                        );
                      for (
                        var e = Object(t), n = 1;
                        n < arguments.length;
                        n++
                      ) {
                        var o = arguments[n];
                        if (o !== r && null !== o)
                          for (var i in o) o.hasOwnProperty(i) && (e[i] = o[i]);
                      }
                      return e;
                    }
                  : Object.assign;
              var m = g(
                  function (t, e, n) {
                    for (var o = Object.keys(e), i = 0; i < o.length; )
                      (!n || (n && t[o[i]] === r)) && (t[o[i]] = e[o[i]]), i++;
                    return t;
                  },
                  "extend",
                  "Use `assign`."
                ),
                _ = g(
                  function (t, e) {
                    return m(t, e, !0);
                  },
                  "merge",
                  "Use `assign`."
                );
              function v(t, e, n) {
                var o,
                  i = e.prototype;
                ((o = t.prototype = Object.create(i)).constructor = t),
                  (o._super = i),
                  n && s(o, n);
              }
              function y(t, e) {
                return function () {
                  return t.apply(e, arguments);
                };
              }
              function b(t, e) {
                return "function" == typeof t
                  ? t.apply((e && e[0]) || r, e)
                  : t;
              }
              function w(t, e) {
                return t === r ? e : t;
              }
              function E(t, e, n) {
                p(T(e), function (e) {
                  t.addEventListener(e, n, !1);
                });
              }
              function O(t, e, n) {
                p(T(e), function (e) {
                  t.removeEventListener(e, n, !1);
                });
              }
              function S(t, e) {
                for (; t; ) {
                  if (t == e) return !0;
                  t = t.parentNode;
                }
                return !1;
              }
              function P(t, e) {
                return t.indexOf(e) > -1;
              }
              function T(t) {
                return t.trim().split(/\s+/g);
              }
              function C(t, e, n) {
                if (t.indexOf && !n) return t.indexOf(e);
                for (var o = 0; o < t.length; ) {
                  if ((n && t[o][n] == e) || (!n && t[o] === e)) return o;
                  o++;
                }
                return -1;
              }
              function x(t) {
                return Array.prototype.slice.call(t, 0);
              }
              function k(t, e, n) {
                for (var o = [], i = [], r = 0; r < t.length; ) {
                  var s = e ? t[r][e] : t[r];
                  C(i, s) < 0 && o.push(t[r]), (i[r] = s), r++;
                }
                return (
                  n &&
                    (o = e
                      ? o.sort(function (t, n) {
                          return t[e] > n[e];
                        })
                      : o.sort()),
                  o
                );
              }
              function A(t, e) {
                for (
                  var n, o, i = e[0].toUpperCase() + e.slice(1), s = 0;
                  s < a.length;

                ) {
                  if ((o = (n = a[s]) ? n + i : e) in t) return o;
                  s++;
                }
                return r;
              }
              var R = 1;
              function j(t) {
                var e = t.ownerDocument || t;
                return e.defaultView || e.parentWindow || n;
              }
              var M = "ontouchstart" in n,
                D = A(n, "PointerEvent") !== r,
                N =
                  M &&
                  /mobile|tablet|ip(ad|hone|od)|android/i.test(
                    navigator.userAgent
                  ),
                L = "touch",
                I = "mouse",
                F = ["x", "y"],
                H = ["clientX", "clientY"];
              function q(t, e) {
                var n = this;
                (this.manager = t),
                  (this.callback = e),
                  (this.element = t.element),
                  (this.target = t.options.inputTarget),
                  (this.domHandler = function (e) {
                    b(t.options.enable, [t]) && n.handler(e);
                  }),
                  this.init();
              }
              function U(t, e, n) {
                var o = n.pointers.length,
                  i = n.changedPointers.length,
                  s = 1 & e && o - i == 0,
                  a = 12 & e && o - i == 0;
                (n.isFirst = !!s),
                  (n.isFinal = !!a),
                  s && (t.session = {}),
                  (n.eventType = e),
                  (function (t, e) {
                    var n = t.session,
                      o = e.pointers,
                      i = o.length;
                    n.firstInput || (n.firstInput = B(e)),
                      i > 1 && !n.firstMultiple
                        ? (n.firstMultiple = B(e))
                        : 1 === i && (n.firstMultiple = !1);
                    var s = n.firstInput,
                      a = n.firstMultiple,
                      l = a ? a.center : s.center,
                      c = (e.center = V(o));
                    (e.timeStamp = h()),
                      (e.deltaTime = e.timeStamp - s.timeStamp),
                      (e.angle = X(l, c)),
                      (e.distance = $(l, c)),
                      (function (t, e) {
                        var n = e.center,
                          o = t.offsetDelta || {},
                          i = t.prevDelta || {},
                          r = t.prevInput || {};
                        (1 !== e.eventType && 4 !== r.eventType) ||
                          ((i = t.prevDelta = {
                            x: r.deltaX || 0,
                            y: r.deltaY || 0,
                          }),
                          (o = t.offsetDelta = { x: n.x, y: n.y })),
                          (e.deltaX = i.x + (n.x - o.x)),
                          (e.deltaY = i.y + (n.y - o.y));
                      })(n, e),
                      (e.offsetDirection = z(e.deltaX, e.deltaY));
                    var d,
                      f,
                      p = W(e.deltaTime, e.deltaX, e.deltaY);
                    (e.overallVelocityX = p.x),
                      (e.overallVelocityY = p.y),
                      (e.overallVelocity = u(p.x) > u(p.y) ? p.x : p.y),
                      (e.scale = a
                        ? ((d = a.pointers),
                          $((f = o)[0], f[1], H) / $(d[0], d[1], H))
                        : 1),
                      (e.rotation = a
                        ? (function (t, e) {
                            return X(e[1], e[0], H) + X(t[1], t[0], H);
                          })(a.pointers, o)
                        : 0),
                      (e.maxPointers = n.prevInput
                        ? e.pointers.length > n.prevInput.maxPointers
                          ? e.pointers.length
                          : n.prevInput.maxPointers
                        : e.pointers.length),
                      (function (t, e) {
                        var n,
                          o,
                          i,
                          s,
                          a = t.lastInterval || e,
                          l = e.timeStamp - a.timeStamp;
                        if (8 != e.eventType && (l > 25 || a.velocity === r)) {
                          var c = e.deltaX - a.deltaX,
                            h = e.deltaY - a.deltaY,
                            d = W(l, c, h);
                          (o = d.x),
                            (i = d.y),
                            (n = u(d.x) > u(d.y) ? d.x : d.y),
                            (s = z(c, h)),
                            (t.lastInterval = e);
                        } else
                          (n = a.velocity),
                            (o = a.velocityX),
                            (i = a.velocityY),
                            (s = a.direction);
                        (e.velocity = n),
                          (e.velocityX = o),
                          (e.velocityY = i),
                          (e.direction = s);
                      })(n, e);
                    var g = t.element;
                    S(e.srcEvent.target, g) && (g = e.srcEvent.target),
                      (e.target = g);
                  })(t, n),
                  t.emit("hammer.input", n),
                  t.recognize(n),
                  (t.session.prevInput = n);
              }
              function B(t) {
                for (var e = [], n = 0; n < t.pointers.length; )
                  (e[n] = {
                    clientX: c(t.pointers[n].clientX),
                    clientY: c(t.pointers[n].clientY),
                  }),
                    n++;
                return {
                  timeStamp: h(),
                  pointers: e,
                  center: V(e),
                  deltaX: t.deltaX,
                  deltaY: t.deltaY,
                };
              }
              function V(t) {
                var e = t.length;
                if (1 === e) return { x: c(t[0].clientX), y: c(t[0].clientY) };
                for (var n = 0, o = 0, i = 0; i < e; )
                  (n += t[i].clientX), (o += t[i].clientY), i++;
                return { x: c(n / e), y: c(o / e) };
              }
              function W(t, e, n) {
                return { x: e / t || 0, y: n / t || 0 };
              }
              function z(t, e) {
                return t === e
                  ? 1
                  : u(t) >= u(e)
                  ? t < 0
                    ? 2
                    : 4
                  : e < 0
                  ? 8
                  : 16;
              }
              function $(t, e, n) {
                n || (n = F);
                var o = e[n[0]] - t[n[0]],
                  i = e[n[1]] - t[n[1]];
                return Math.sqrt(o * o + i * i);
              }
              function X(t, e, n) {
                n || (n = F);
                var o = e[n[0]] - t[n[0]],
                  i = e[n[1]] - t[n[1]];
                return (180 * Math.atan2(i, o)) / Math.PI;
              }
              q.prototype = {
                handler: function () {},
                init: function () {
                  this.evEl && E(this.element, this.evEl, this.domHandler),
                    this.evTarget &&
                      E(this.target, this.evTarget, this.domHandler),
                    this.evWin &&
                      E(j(this.element), this.evWin, this.domHandler);
                },
                destroy: function () {
                  this.evEl && O(this.element, this.evEl, this.domHandler),
                    this.evTarget &&
                      O(this.target, this.evTarget, this.domHandler),
                    this.evWin &&
                      O(j(this.element), this.evWin, this.domHandler);
                },
              };
              var Y = { mousedown: 1, mousemove: 2, mouseup: 4 },
                G = "mousedown",
                Q = "mousemove mouseup";
              function K() {
                (this.evEl = G),
                  (this.evWin = Q),
                  (this.pressed = !1),
                  q.apply(this, arguments);
              }
              v(K, q, {
                handler: function (t) {
                  var e = Y[t.type];
                  1 & e && 0 === t.button && (this.pressed = !0),
                    2 & e && 1 !== t.which && (e = 4),
                    this.pressed &&
                      (4 & e && (this.pressed = !1),
                      this.callback(this.manager, e, {
                        pointers: [t],
                        changedPointers: [t],
                        pointerType: I,
                        srcEvent: t,
                      }));
                },
              });
              var Z = {
                  pointerdown: 1,
                  pointermove: 2,
                  pointerup: 4,
                  pointercancel: 8,
                  pointerout: 8,
                },
                J = { 2: L, 3: "pen", 4: I, 5: "kinect" },
                tt = "pointerdown",
                et = "pointermove pointerup pointercancel";
              function nt() {
                (this.evEl = tt),
                  (this.evWin = et),
                  q.apply(this, arguments),
                  (this.store = this.manager.session.pointerEvents = []);
              }
              n.MSPointerEvent &&
                !n.PointerEvent &&
                ((tt = "MSPointerDown"),
                (et = "MSPointerMove MSPointerUp MSPointerCancel")),
                v(nt, q, {
                  handler: function (t) {
                    var e = this.store,
                      n = !1,
                      o = t.type.toLowerCase().replace("ms", ""),
                      i = Z[o],
                      r = J[t.pointerType] || t.pointerType,
                      s = r == L,
                      a = C(e, t.pointerId, "pointerId");
                    1 & i && (0 === t.button || s)
                      ? a < 0 && (e.push(t), (a = e.length - 1))
                      : 12 & i && (n = !0),
                      a < 0 ||
                        ((e[a] = t),
                        this.callback(this.manager, i, {
                          pointers: e,
                          changedPointers: [t],
                          pointerType: r,
                          srcEvent: t,
                        }),
                        n && e.splice(a, 1));
                  },
                });
              var ot = {
                  touchstart: 1,
                  touchmove: 2,
                  touchend: 4,
                  touchcancel: 8,
                },
                it = "touchstart",
                rt = "touchstart touchmove touchend touchcancel";
              function st() {
                (this.evTarget = it),
                  (this.evWin = rt),
                  (this.started = !1),
                  q.apply(this, arguments);
              }
              function at(t, e) {
                var n = x(t.touches),
                  o = x(t.changedTouches);
                return 12 & e && (n = k(n.concat(o), "identifier", !0)), [n, o];
              }
              v(st, q, {
                handler: function (t) {
                  var e = ot[t.type];
                  if ((1 === e && (this.started = !0), this.started)) {
                    var n = at.call(this, t, e);
                    12 & e &&
                      n[0].length - n[1].length == 0 &&
                      (this.started = !1),
                      this.callback(this.manager, e, {
                        pointers: n[0],
                        changedPointers: n[1],
                        pointerType: L,
                        srcEvent: t,
                      });
                  }
                },
              });
              var lt = {
                  touchstart: 1,
                  touchmove: 2,
                  touchend: 4,
                  touchcancel: 8,
                },
                ct = "touchstart touchmove touchend touchcancel";
              function ut() {
                (this.evTarget = ct),
                  (this.targetIds = {}),
                  q.apply(this, arguments);
              }
              function ht(t, e) {
                var n = x(t.touches),
                  o = this.targetIds;
                if (3 & e && 1 === n.length)
                  return (o[n[0].identifier] = !0), [n, n];
                var i,
                  r,
                  s = x(t.changedTouches),
                  a = [],
                  l = this.target;
                if (
                  ((r = n.filter(function (t) {
                    return S(t.target, l);
                  })),
                  1 === e)
                )
                  for (i = 0; i < r.length; ) (o[r[i].identifier] = !0), i++;
                for (i = 0; i < s.length; )
                  o[s[i].identifier] && a.push(s[i]),
                    12 & e && delete o[s[i].identifier],
                    i++;
                return a.length
                  ? [k(r.concat(a), "identifier", !0), a]
                  : void 0;
              }
              function dt() {
                q.apply(this, arguments);
                var t = y(this.handler, this);
                (this.touch = new ut(this.manager, t)),
                  (this.mouse = new K(this.manager, t)),
                  (this.primaryTouch = null),
                  (this.lastTouches = []);
              }
              function ft(t, e) {
                1 & t
                  ? ((this.primaryTouch = e.changedPointers[0].identifier),
                    pt.call(this, e))
                  : 12 & t && pt.call(this, e);
              }
              function pt(t) {
                var e = t.changedPointers[0];
                if (e.identifier === this.primaryTouch) {
                  var n = { x: e.clientX, y: e.clientY };
                  this.lastTouches.push(n);
                  var o = this.lastTouches;
                  setTimeout(function () {
                    var t = o.indexOf(n);
                    t > -1 && o.splice(t, 1);
                  }, 2500);
                }
              }
              function gt(t) {
                for (
                  var e = t.srcEvent.clientX, n = t.srcEvent.clientY, o = 0;
                  o < this.lastTouches.length;
                  o++
                ) {
                  var i = this.lastTouches[o],
                    r = Math.abs(e - i.x),
                    s = Math.abs(n - i.y);
                  if (r <= 25 && s <= 25) return !0;
                }
                return !1;
              }
              v(ut, q, {
                handler: function (t) {
                  var e = lt[t.type],
                    n = ht.call(this, t, e);
                  n &&
                    this.callback(this.manager, e, {
                      pointers: n[0],
                      changedPointers: n[1],
                      pointerType: L,
                      srcEvent: t,
                    });
                },
              }),
                v(dt, q, {
                  handler: function (t, e, n) {
                    var o = n.pointerType == L,
                      i = n.pointerType == I;
                    if (
                      !(
                        i &&
                        n.sourceCapabilities &&
                        n.sourceCapabilities.firesTouchEvents
                      )
                    ) {
                      if (o) ft.call(this, e, n);
                      else if (i && gt.call(this, n)) return;
                      this.callback(t, e, n);
                    }
                  },
                  destroy: function () {
                    this.touch.destroy(), this.mouse.destroy();
                  },
                });
              var mt = A(l.style, "touchAction"),
                _t = mt !== r,
                vt = "compute",
                yt = "auto",
                bt = "manipulation",
                wt = "none",
                Et = "pan-x",
                Ot = "pan-y",
                St = (function () {
                  if (!_t) return !1;
                  var t = {},
                    e = n.CSS && n.CSS.supports;
                  return (
                    [
                      "auto",
                      "manipulation",
                      "pan-y",
                      "pan-x",
                      "pan-x pan-y",
                      "none",
                    ].forEach(function (o) {
                      t[o] = !e || n.CSS.supports("touch-action", o);
                    }),
                    t
                  );
                })();
              function Pt(t, e) {
                (this.manager = t), this.set(e);
              }
              Pt.prototype = {
                set: function (t) {
                  t == vt && (t = this.compute()),
                    _t &&
                      this.manager.element.style &&
                      St[t] &&
                      (this.manager.element.style[mt] = t),
                    (this.actions = t.toLowerCase().trim());
                },
                update: function () {
                  this.set(this.manager.options.touchAction);
                },
                compute: function () {
                  var t = [];
                  return (
                    p(this.manager.recognizers, function (e) {
                      b(e.options.enable, [e]) &&
                        (t = t.concat(e.getTouchAction()));
                    }),
                    (function (t) {
                      if (P(t, wt)) return wt;
                      var e = P(t, Et),
                        n = P(t, Ot);
                      return e && n
                        ? wt
                        : e || n
                        ? e
                          ? Et
                          : Ot
                        : P(t, bt)
                        ? bt
                        : yt;
                    })(t.join(" "))
                  );
                },
                preventDefaults: function (t) {
                  var e = t.srcEvent,
                    n = t.offsetDirection;
                  if (this.manager.session.prevented) e.preventDefault();
                  else {
                    var o = this.actions,
                      i = P(o, wt) && !St.none,
                      r = P(o, Ot) && !St["pan-y"],
                      s = P(o, Et) && !St["pan-x"];
                    if (i) {
                      var a = 1 === t.pointers.length,
                        l = t.distance < 2,
                        c = t.deltaTime < 250;
                      if (a && l && c) return;
                    }
                    if (!s || !r)
                      return i || (r && 6 & n) || (s && 24 & n)
                        ? this.preventSrc(e)
                        : void 0;
                  }
                },
                preventSrc: function (t) {
                  (this.manager.session.prevented = !0), t.preventDefault();
                },
              };
              var Tt = 32;
              function Ct(t) {
                (this.options = s({}, this.defaults, t || {})),
                  (this.id = R++),
                  (this.manager = null),
                  (this.options.enable = w(this.options.enable, !0)),
                  (this.state = 1),
                  (this.simultaneous = {}),
                  (this.requireFail = []);
              }
              function xt(t) {
                return 16 & t
                  ? "cancel"
                  : 8 & t
                  ? "end"
                  : 4 & t
                  ? "move"
                  : 2 & t
                  ? "start"
                  : "";
              }
              function kt(t) {
                return 16 == t
                  ? "down"
                  : 8 == t
                  ? "up"
                  : 2 == t
                  ? "left"
                  : 4 == t
                  ? "right"
                  : "";
              }
              function At(t, e) {
                var n = e.manager;
                return n ? n.get(t) : t;
              }
              function Rt() {
                Ct.apply(this, arguments);
              }
              function jt() {
                Rt.apply(this, arguments), (this.pX = null), (this.pY = null);
              }
              function Mt() {
                Rt.apply(this, arguments);
              }
              function Dt() {
                Ct.apply(this, arguments),
                  (this._timer = null),
                  (this._input = null);
              }
              function Nt() {
                Rt.apply(this, arguments);
              }
              function Lt() {
                Rt.apply(this, arguments);
              }
              function It() {
                Ct.apply(this, arguments),
                  (this.pTime = !1),
                  (this.pCenter = !1),
                  (this._timer = null),
                  (this._input = null),
                  (this.count = 0);
              }
              function Ft(t, e) {
                return (
                  ((e = e || {}).recognizers = w(
                    e.recognizers,
                    Ft.defaults.preset
                  )),
                  new Ht(t, e)
                );
              }
              function Ht(t, e) {
                (this.options = s({}, Ft.defaults, e || {})),
                  (this.options.inputTarget = this.options.inputTarget || t),
                  (this.handlers = {}),
                  (this.session = {}),
                  (this.recognizers = []),
                  (this.oldCssProps = {}),
                  (this.element = t),
                  (this.input = new (this.options.inputClass ||
                    (D ? nt : N ? ut : M ? dt : K))(this, U)),
                  (this.touchAction = new Pt(this, this.options.touchAction)),
                  qt(this, !0),
                  p(
                    this.options.recognizers,
                    function (t) {
                      var e = this.add(new t[0](t[1]));
                      t[2] && e.recognizeWith(t[2]),
                        t[3] && e.requireFailure(t[3]);
                    },
                    this
                  );
              }
              function qt(t, e) {
                var n,
                  o = t.element;
                o.style &&
                  (p(t.options.cssProps, function (i, r) {
                    (n = A(o.style, r)),
                      e
                        ? ((t.oldCssProps[n] = o.style[n]), (o.style[n] = i))
                        : (o.style[n] = t.oldCssProps[n] || "");
                  }),
                  e || (t.oldCssProps = {}));
              }
              (Ct.prototype = {
                defaults: {},
                set: function (t) {
                  return (
                    s(this.options, t),
                    this.manager && this.manager.touchAction.update(),
                    this
                  );
                },
                recognizeWith: function (t) {
                  if (f(t, "recognizeWith", this)) return this;
                  var e = this.simultaneous;
                  return (
                    e[(t = At(t, this)).id] ||
                      ((e[t.id] = t), t.recognizeWith(this)),
                    this
                  );
                },
                dropRecognizeWith: function (t) {
                  return (
                    f(t, "dropRecognizeWith", this) ||
                      ((t = At(t, this)), delete this.simultaneous[t.id]),
                    this
                  );
                },
                requireFailure: function (t) {
                  if (f(t, "requireFailure", this)) return this;
                  var e = this.requireFail;
                  return (
                    -1 === C(e, (t = At(t, this))) &&
                      (e.push(t), t.requireFailure(this)),
                    this
                  );
                },
                dropRequireFailure: function (t) {
                  if (f(t, "dropRequireFailure", this)) return this;
                  t = At(t, this);
                  var e = C(this.requireFail, t);
                  return e > -1 && this.requireFail.splice(e, 1), this;
                },
                hasRequireFailures: function () {
                  return this.requireFail.length > 0;
                },
                canRecognizeWith: function (t) {
                  return !!this.simultaneous[t.id];
                },
                emit: function (t) {
                  var e = this,
                    n = this.state;
                  function o(n) {
                    e.manager.emit(n, t);
                  }
                  n < 8 && o(e.options.event + xt(n)),
                    o(e.options.event),
                    t.additionalEvent && o(t.additionalEvent),
                    n >= 8 && o(e.options.event + xt(n));
                },
                tryEmit: function (t) {
                  if (this.canEmit()) return this.emit(t);
                  this.state = Tt;
                },
                canEmit: function () {
                  for (var t = 0; t < this.requireFail.length; ) {
                    if (!(33 & this.requireFail[t].state)) return !1;
                    t++;
                  }
                  return !0;
                },
                recognize: function (t) {
                  var e = s({}, t);
                  if (!b(this.options.enable, [this, e]))
                    return this.reset(), void (this.state = Tt);
                  56 & this.state && (this.state = 1),
                    (this.state = this.process(e)),
                    30 & this.state && this.tryEmit(e);
                },
                process: function (t) {},
                getTouchAction: function () {},
                reset: function () {},
              }),
                v(Rt, Ct, {
                  defaults: { pointers: 1 },
                  attrTest: function (t) {
                    var e = this.options.pointers;
                    return 0 === e || t.pointers.length === e;
                  },
                  process: function (t) {
                    var e = this.state,
                      n = t.eventType,
                      o = 6 & e,
                      i = this.attrTest(t);
                    return o && (8 & n || !i)
                      ? 16 | e
                      : o || i
                      ? 4 & n
                        ? 8 | e
                        : 2 & e
                        ? 4 | e
                        : 2
                      : Tt;
                  },
                }),
                v(jt, Rt, {
                  defaults: {
                    event: "pan",
                    threshold: 10,
                    pointers: 1,
                    direction: 30,
                  },
                  getTouchAction: function () {
                    var t = this.options.direction,
                      e = [];
                    return 6 & t && e.push(Ot), 24 & t && e.push(Et), e;
                  },
                  directionTest: function (t) {
                    var e = this.options,
                      n = !0,
                      o = t.distance,
                      i = t.direction,
                      r = t.deltaX,
                      s = t.deltaY;
                    return (
                      i & e.direction ||
                        (6 & e.direction
                          ? ((i = 0 === r ? 1 : r < 0 ? 2 : 4),
                            (n = r != this.pX),
                            (o = Math.abs(t.deltaX)))
                          : ((i = 0 === s ? 1 : s < 0 ? 8 : 16),
                            (n = s != this.pY),
                            (o = Math.abs(t.deltaY)))),
                      (t.direction = i),
                      n && o > e.threshold && i & e.direction
                    );
                  },
                  attrTest: function (t) {
                    return (
                      Rt.prototype.attrTest.call(this, t) &&
                      (2 & this.state ||
                        (!(2 & this.state) && this.directionTest(t)))
                    );
                  },
                  emit: function (t) {
                    (this.pX = t.deltaX), (this.pY = t.deltaY);
                    var e = kt(t.direction);
                    e && (t.additionalEvent = this.options.event + e),
                      this._super.emit.call(this, t);
                  },
                }),
                v(Mt, Rt, {
                  defaults: { event: "pinch", threshold: 0, pointers: 2 },
                  getTouchAction: function () {
                    return [wt];
                  },
                  attrTest: function (t) {
                    return (
                      this._super.attrTest.call(this, t) &&
                      (Math.abs(t.scale - 1) > this.options.threshold ||
                        2 & this.state)
                    );
                  },
                  emit: function (t) {
                    if (1 !== t.scale) {
                      var e = t.scale < 1 ? "in" : "out";
                      t.additionalEvent = this.options.event + e;
                    }
                    this._super.emit.call(this, t);
                  },
                }),
                v(Dt, Ct, {
                  defaults: {
                    event: "press",
                    pointers: 1,
                    time: 251,
                    threshold: 9,
                  },
                  getTouchAction: function () {
                    return [yt];
                  },
                  process: function (t) {
                    var e = this.options,
                      n = t.pointers.length === e.pointers,
                      o = t.distance < e.threshold,
                      i = t.deltaTime > e.time;
                    if (
                      ((this._input = t), !o || !n || (12 & t.eventType && !i))
                    )
                      this.reset();
                    else if (1 & t.eventType)
                      this.reset(),
                        (this._timer = d(
                          function () {
                            (this.state = 8), this.tryEmit();
                          },
                          e.time,
                          this
                        ));
                    else if (4 & t.eventType) return 8;
                    return Tt;
                  },
                  reset: function () {
                    clearTimeout(this._timer);
                  },
                  emit: function (t) {
                    8 === this.state &&
                      (t && 4 & t.eventType
                        ? this.manager.emit(this.options.event + "up", t)
                        : ((this._input.timeStamp = h()),
                          this.manager.emit(this.options.event, this._input)));
                  },
                }),
                v(Nt, Rt, {
                  defaults: { event: "rotate", threshold: 0, pointers: 2 },
                  getTouchAction: function () {
                    return [wt];
                  },
                  attrTest: function (t) {
                    return (
                      this._super.attrTest.call(this, t) &&
                      (Math.abs(t.rotation) > this.options.threshold ||
                        2 & this.state)
                    );
                  },
                }),
                v(Lt, Rt, {
                  defaults: {
                    event: "swipe",
                    threshold: 10,
                    velocity: 0.3,
                    direction: 30,
                    pointers: 1,
                  },
                  getTouchAction: function () {
                    return jt.prototype.getTouchAction.call(this);
                  },
                  attrTest: function (t) {
                    var e,
                      n = this.options.direction;
                    return (
                      30 & n
                        ? (e = t.overallVelocity)
                        : 6 & n
                        ? (e = t.overallVelocityX)
                        : 24 & n && (e = t.overallVelocityY),
                      this._super.attrTest.call(this, t) &&
                        n & t.offsetDirection &&
                        t.distance > this.options.threshold &&
                        t.maxPointers == this.options.pointers &&
                        u(e) > this.options.velocity &&
                        4 & t.eventType
                    );
                  },
                  emit: function (t) {
                    var e = kt(t.offsetDirection);
                    e && this.manager.emit(this.options.event + e, t),
                      this.manager.emit(this.options.event, t);
                  },
                }),
                v(It, Ct, {
                  defaults: {
                    event: "tap",
                    pointers: 1,
                    taps: 1,
                    interval: 300,
                    time: 250,
                    threshold: 9,
                    posThreshold: 10,
                  },
                  getTouchAction: function () {
                    return [bt];
                  },
                  process: function (t) {
                    var e = this.options,
                      n = t.pointers.length === e.pointers,
                      o = t.distance < e.threshold,
                      i = t.deltaTime < e.time;
                    if ((this.reset(), 1 & t.eventType && 0 === this.count))
                      return this.failTimeout();
                    if (o && i && n) {
                      if (4 != t.eventType) return this.failTimeout();
                      var r =
                          !this.pTime || t.timeStamp - this.pTime < e.interval,
                        s =
                          !this.pCenter ||
                          $(this.pCenter, t.center) < e.posThreshold;
                      if (
                        ((this.pTime = t.timeStamp),
                        (this.pCenter = t.center),
                        s && r ? (this.count += 1) : (this.count = 1),
                        (this._input = t),
                        0 == this.count % e.taps)
                      )
                        return this.hasRequireFailures()
                          ? ((this._timer = d(
                              function () {
                                (this.state = 8), this.tryEmit();
                              },
                              e.interval,
                              this
                            )),
                            2)
                          : 8;
                    }
                    return Tt;
                  },
                  failTimeout: function () {
                    return (
                      (this._timer = d(
                        function () {
                          this.state = Tt;
                        },
                        this.options.interval,
                        this
                      )),
                      Tt
                    );
                  },
                  reset: function () {
                    clearTimeout(this._timer);
                  },
                  emit: function () {
                    8 == this.state &&
                      ((this._input.tapCount = this.count),
                      this.manager.emit(this.options.event, this._input));
                  },
                }),
                (Ft.VERSION = "2.0.7"),
                (Ft.defaults = {
                  domEvents: !1,
                  touchAction: vt,
                  enable: !0,
                  inputTarget: null,
                  inputClass: null,
                  preset: [
                    [Nt, { enable: !1 }],
                    [Mt, { enable: !1 }, ["rotate"]],
                    [Lt, { direction: 6 }],
                    [jt, { direction: 6 }, ["swipe"]],
                    [It],
                    [It, { event: "doubletap", taps: 2 }, ["tap"]],
                    [Dt],
                  ],
                  cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    contentZooming: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)",
                  },
                }),
                (Ht.prototype = {
                  set: function (t) {
                    return (
                      s(this.options, t),
                      t.touchAction && this.touchAction.update(),
                      t.inputTarget &&
                        (this.input.destroy(),
                        (this.input.target = t.inputTarget),
                        this.input.init()),
                      this
                    );
                  },
                  stop: function (t) {
                    this.session.stopped = t ? 2 : 1;
                  },
                  recognize: function (t) {
                    var e = this.session;
                    if (!e.stopped) {
                      var n;
                      this.touchAction.preventDefaults(t);
                      var o = this.recognizers,
                        i = e.curRecognizer;
                      (!i || (i && 8 & i.state)) &&
                        (i = e.curRecognizer = null);
                      for (var r = 0; r < o.length; )
                        (n = o[r]),
                          2 === e.stopped ||
                          (i && n != i && !n.canRecognizeWith(i))
                            ? n.reset()
                            : n.recognize(t),
                          !i && 14 & n.state && (i = e.curRecognizer = n),
                          r++;
                    }
                  },
                  get: function (t) {
                    if (t instanceof Ct) return t;
                    for (var e = this.recognizers, n = 0; n < e.length; n++)
                      if (e[n].options.event == t) return e[n];
                    return null;
                  },
                  add: function (t) {
                    if (f(t, "add", this)) return this;
                    var e = this.get(t.options.event);
                    return (
                      e && this.remove(e),
                      this.recognizers.push(t),
                      (t.manager = this),
                      this.touchAction.update(),
                      t
                    );
                  },
                  remove: function (t) {
                    if (f(t, "remove", this)) return this;
                    if ((t = this.get(t))) {
                      var e = this.recognizers,
                        n = C(e, t);
                      -1 !== n && (e.splice(n, 1), this.touchAction.update());
                    }
                    return this;
                  },
                  on: function (t, e) {
                    if (t !== r && e !== r) {
                      var n = this.handlers;
                      return (
                        p(T(t), function (t) {
                          (n[t] = n[t] || []), n[t].push(e);
                        }),
                        this
                      );
                    }
                  },
                  off: function (t, e) {
                    if (t !== r) {
                      var n = this.handlers;
                      return (
                        p(T(t), function (t) {
                          e ? n[t] && n[t].splice(C(n[t], e), 1) : delete n[t];
                        }),
                        this
                      );
                    }
                  },
                  emit: function (t, e) {
                    this.options.domEvents &&
                      (function (t, e) {
                        var n = o.createEvent("Event");
                        n.initEvent(t, !0, !0),
                          (n.gesture = e),
                          e.target.dispatchEvent(n);
                      })(t, e);
                    var n = this.handlers[t] && this.handlers[t].slice();
                    if (n && n.length) {
                      (e.type = t),
                        (e.preventDefault = function () {
                          e.srcEvent.preventDefault();
                        });
                      for (var i = 0; i < n.length; ) n[i](e), i++;
                    }
                  },
                  destroy: function () {
                    this.element && qt(this, !1),
                      (this.handlers = {}),
                      (this.session = {}),
                      this.input.destroy(),
                      (this.element = null);
                  },
                }),
                s(Ft, {
                  INPUT_START: 1,
                  INPUT_MOVE: 2,
                  INPUT_END: 4,
                  INPUT_CANCEL: 8,
                  STATE_POSSIBLE: 1,
                  STATE_BEGAN: 2,
                  STATE_CHANGED: 4,
                  STATE_ENDED: 8,
                  STATE_RECOGNIZED: 8,
                  STATE_CANCELLED: 16,
                  STATE_FAILED: Tt,
                  DIRECTION_NONE: 1,
                  DIRECTION_LEFT: 2,
                  DIRECTION_RIGHT: 4,
                  DIRECTION_UP: 8,
                  DIRECTION_DOWN: 16,
                  DIRECTION_HORIZONTAL: 6,
                  DIRECTION_VERTICAL: 24,
                  DIRECTION_ALL: 30,
                  Manager: Ht,
                  Input: q,
                  TouchAction: Pt,
                  TouchInput: ut,
                  MouseInput: K,
                  PointerEventInput: nt,
                  TouchMouseInput: dt,
                  SingleTouchInput: st,
                  Recognizer: Ct,
                  AttrRecognizer: Rt,
                  Tap: It,
                  Pan: jt,
                  Swipe: Lt,
                  Pinch: Mt,
                  Rotate: Nt,
                  Press: Dt,
                  on: E,
                  off: O,
                  each: p,
                  merge: _,
                  extend: m,
                  assign: s,
                  inherit: v,
                  bindFn: y,
                  prefixed: A,
                }),
                ((void 0 !== n
                  ? n
                  : "undefined" != typeof self
                  ? self
                  : {}
                ).Hammer = Ft),
                "function" == typeof t && t.amd
                  ? t(function () {
                      return Ft;
                    })
                  : void 0 !== e && e.exports
                  ? (e.exports = Ft)
                  : (n.Hammer = Ft);
            })(window, document);
          }.call(this));
        }.call(this, void 0));
      },
      {},
    ],
    5: [
      function (t, e, n) {
        (function (t) {
          (function () {
            var n = /^\s+|\s+$/g,
              o = /^[-+]0x[0-9a-f]+$/i,
              i = /^0b[01]+$/i,
              r = /^0o[0-7]+$/i,
              s = parseInt,
              a = "object" == typeof t && t && t.Object === Object && t,
              l =
                "object" == typeof self &&
                self &&
                self.Object === Object &&
                self,
              c = a || l || Function("return this")(),
              u = Object.prototype.toString,
              h = Math.max,
              d = Math.min,
              f = function () {
                return c.Date.now();
              };
            function p(t) {
              var e = typeof t;
              return !!t && ("object" == e || "function" == e);
            }
            function g(t) {
              if ("number" == typeof t) return t;
              if (
                (function (t) {
                  return (
                    "symbol" == typeof t ||
                    ((function (t) {
                      return !!t && "object" == typeof t;
                    })(t) &&
                      "[object Symbol]" == u.call(t))
                  );
                })(t)
              )
                return NaN;
              if (p(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = p(e) ? e + "" : e;
              }
              if ("string" != typeof t) return 0 === t ? t : +t;
              t = t.replace(n, "");
              var a = i.test(t);
              return a || r.test(t)
                ? s(t.slice(2), a ? 2 : 8)
                : o.test(t)
                ? NaN
                : +t;
            }
            e.exports = function (t, e, n) {
              var o,
                i,
                r,
                s,
                a,
                l,
                c = 0,
                u = !1,
                m = !1,
                _ = !0;
              if ("function" != typeof t)
                throw new TypeError("Expected a function");
              function v(e) {
                var n = o,
                  r = i;
                return (o = i = void 0), (c = e), (s = t.apply(r, n));
              }
              function y(t) {
                return (c = t), (a = setTimeout(w, e)), u ? v(t) : s;
              }
              function b(t) {
                var n = t - l;
                return void 0 === l || n >= e || n < 0 || (m && t - c >= r);
              }
              function w() {
                var t = f();
                if (b(t)) return E(t);
                a = setTimeout(
                  w,
                  (function (t) {
                    var n = e - (t - l);
                    return m ? d(n, r - (t - c)) : n;
                  })(t)
                );
              }
              function E(t) {
                return (a = void 0), _ && o ? v(t) : ((o = i = void 0), s);
              }
              function O() {
                var t = f(),
                  n = b(t);
                if (((o = arguments), (i = this), (l = t), n)) {
                  if (void 0 === a) return y(l);
                  if (m) return (a = setTimeout(w, e)), v(l);
                }
                return void 0 === a && (a = setTimeout(w, e)), s;
              }
              return (
                (e = g(e) || 0),
                p(n) &&
                  ((u = !!n.leading),
                  (r = (m = "maxWait" in n) ? h(g(n.maxWait) || 0, e) : r),
                  (_ = "trailing" in n ? !!n.trailing : _)),
                (O.cancel = function () {
                  void 0 !== a && clearTimeout(a),
                    (c = 0),
                    (o = l = i = a = void 0);
                }),
                (O.flush = function () {
                  return void 0 === a ? s : E(f());
                }),
                O
              );
            };
          }.call(this));
        }.call(this, window));
      },
      {},
    ],
    6: [
      function (t, e, n) {
        var o,
          i,
          r,
          s,
          a,
          l,
          c,
          u = {},
          h = [],
          d = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
        function f(t, e) {
          for (var n in e) t[n] = e[n];
          return t;
        }
        function p(t) {
          var e = t.parentNode;
          e && e.removeChild(t);
        }
        function g(t, e, n) {
          var o,
            i,
            r,
            s = arguments,
            a = {};
          for (r in e)
            "key" == r ? (o = e[r]) : "ref" == r ? (i = e[r]) : (a[r] = e[r]);
          if (arguments.length > 3)
            for (n = [n], r = 3; r < arguments.length; r++) n.push(s[r]);
          if (
            (null != n && (a.children = n),
            "function" == typeof t && null != t.defaultProps)
          )
            for (r in t.defaultProps)
              void 0 === a[r] && (a[r] = t.defaultProps[r]);
          return m(t, a, o, i, null);
        }
        function m(t, e, n, i, r) {
          var s = {
            type: t,
            props: e,
            key: n,
            ref: i,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == r ? ++o.__v : r,
          };
          return null != o.vnode && o.vnode(s), s;
        }
        function _(t) {
          return t.children;
        }
        function v(t, e) {
          (this.props = t), (this.context = e);
        }
        function y(t, e) {
          if (null == e) return t.__ ? y(t.__, t.__.__k.indexOf(t) + 1) : null;
          for (var n; e < t.__k.length; e++)
            if (null != (n = t.__k[e]) && null != n.__e) return n.__e;
          return "function" == typeof t.type ? y(t) : null;
        }
        function b(t) {
          var e, n;
          if (null != (t = t.__) && null != t.__c) {
            for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
              if (null != (n = t.__k[e]) && null != n.__e) {
                t.__e = t.__c.base = n.__e;
                break;
              }
            return b(t);
          }
        }
        function w(t) {
          ((!t.__d && (t.__d = !0) && r.push(t) && !E.__r++) ||
            a !== o.debounceRendering) &&
            ((a = o.debounceRendering) || s)(E);
        }
        function E() {
          for (var t; (E.__r = r.length); )
            (t = r.sort(function (t, e) {
              return t.__v.__b - e.__v.__b;
            })),
              (r = []),
              t.some(function (t) {
                var e, n, o, i, r, s;
                t.__d &&
                  ((r = (i = (e = t).__v).__e),
                  (s = e.__P) &&
                    ((n = []),
                    ((o = f({}, i)).__v = i.__v + 1),
                    A(
                      s,
                      i,
                      o,
                      e.__n,
                      void 0 !== s.ownerSVGElement,
                      null != i.__h ? [r] : null,
                      n,
                      null == r ? y(i) : r,
                      i.__h
                    ),
                    R(n, i),
                    i.__e != r && b(i)));
              });
        }
        function O(t, e, n, o, i, r, s, a, l, c) {
          var d,
            f,
            g,
            v,
            b,
            w,
            E,
            O = (o && o.__k) || h,
            T = O.length;
          for (
            l == u && (l = null != s ? s[0] : T ? y(o, 0) : null),
              n.__k = [],
              d = 0;
            d < e.length;
            d++
          )
            if (
              null !=
              (v = n.__k[d] =
                null == (v = e[d]) || "boolean" == typeof v
                  ? null
                  : "string" == typeof v || "number" == typeof v
                  ? m(null, v, null, null, v)
                  : Array.isArray(v)
                  ? m(_, { children: v }, null, null, null)
                  : v.__b > 0
                  ? m(v.type, v.props, v.key, null, v.__v)
                  : v)
            ) {
              if (
                ((v.__ = n),
                (v.__b = n.__b + 1),
                null === (g = O[d]) ||
                  (g && v.key == g.key && v.type === g.type))
              )
                O[d] = void 0;
              else
                for (f = 0; f < T; f++) {
                  if ((g = O[f]) && v.key == g.key && v.type === g.type) {
                    O[f] = void 0;
                    break;
                  }
                  g = null;
                }
              A(t, v, (g = g || u), i, r, s, a, l, c),
                (b = v.__e),
                (f = v.ref) &&
                  g.ref != f &&
                  (E || (E = []),
                  g.ref && E.push(g.ref, null, v),
                  E.push(f, v.__c || b, v)),
                null != b
                  ? (null == w && (w = b),
                    "function" == typeof v.type &&
                    null != v.__k &&
                    v.__k === g.__k
                      ? (v.__d = l = S(v, l, t))
                      : (l = P(t, v, g, O, s, b, l)),
                    c || "option" !== n.type
                      ? "function" == typeof n.type && (n.__d = l)
                      : (t.value = ""))
                  : l && g.__e == l && l.parentNode != t && (l = y(g));
            }
          if (((n.__e = w), null != s && "function" != typeof n.type))
            for (d = s.length; d--; ) null != s[d] && p(s[d]);
          for (d = T; d--; )
            null != O[d] &&
              ("function" == typeof n.type &&
                null != O[d].__e &&
                O[d].__e == n.__d &&
                (n.__d = y(o, d + 1)),
              D(O[d], O[d]));
          if (E) for (d = 0; d < E.length; d++) M(E[d], E[++d], E[++d]);
        }
        function S(t, e, n) {
          var o, i;
          for (o = 0; o < t.__k.length; o++)
            (i = t.__k[o]) &&
              ((i.__ = t),
              (e =
                "function" == typeof i.type
                  ? S(i, e, n)
                  : P(n, i, i, t.__k, null, i.__e, e)));
          return e;
        }
        function P(t, e, n, o, i, r, s) {
          var a, l, c;
          if (void 0 !== e.__d) (a = e.__d), (e.__d = void 0);
          else if (i == n || r != s || null == r.parentNode)
            t: if (null == s || s.parentNode !== t)
              t.appendChild(r), (a = null);
            else {
              for (l = s, c = 0; (l = l.nextSibling) && c < o.length; c += 2)
                if (l == r) break t;
              t.insertBefore(r, s), (a = s);
            }
          return void 0 !== a ? a : r.nextSibling;
        }
        function T(t, e, n) {
          "-" === e[0]
            ? t.setProperty(e, n)
            : (t[e] =
                null == n
                  ? ""
                  : "number" != typeof n || d.test(e)
                  ? n
                  : n + "px");
        }
        function C(t, e, n, o, i) {
          var r, s, a;
          if ((i && "className" == e && (e = "class"), "style" === e))
            if ("string" == typeof n) t.style.cssText = n;
            else {
              if (("string" == typeof o && (t.style.cssText = o = ""), o))
                for (e in o) (n && e in n) || T(t.style, e, "");
              if (n) for (e in n) (o && n[e] === o[e]) || T(t.style, e, n[e]);
            }
          else
            "o" === e[0] && "n" === e[1]
              ? ((r = e !== (e = e.replace(/Capture$/, ""))),
                (s = e.toLowerCase()) in t && (e = s),
                (e = e.slice(2)),
                t.l || (t.l = {}),
                (t.l[e + r] = n),
                (a = r ? k : x),
                n
                  ? o || t.addEventListener(e, a, r)
                  : t.removeEventListener(e, a, r))
              : "list" !== e &&
                "tagName" !== e &&
                "form" !== e &&
                "type" !== e &&
                "size" !== e &&
                "download" !== e &&
                "href" !== e &&
                "contentEditable" !== e &&
                !i &&
                e in t
              ? (t[e] = null == n ? "" : n)
              : "function" != typeof n &&
                "dangerouslySetInnerHTML" !== e &&
                (e !== (e = e.replace(/xlink:?/, ""))
                  ? null == n || !1 === n
                    ? t.removeAttributeNS(
                        "http://www.w3.org/1999/xlink",
                        e.toLowerCase()
                      )
                    : t.setAttributeNS(
                        "http://www.w3.org/1999/xlink",
                        e.toLowerCase(),
                        n
                      )
                  : null == n || (!1 === n && !/^ar/.test(e))
                  ? t.removeAttribute(e)
                  : t.setAttribute(e, n));
        }
        function x(t) {
          this.l[t.type + !1](o.event ? o.event(t) : t);
        }
        function k(t) {
          this.l[t.type + !0](o.event ? o.event(t) : t);
        }
        function A(t, e, n, i, r, s, a, l, c) {
          var u,
            h,
            d,
            p,
            g,
            m,
            y,
            b,
            w,
            E,
            S,
            P = e.type;
          if (void 0 !== e.constructor) return null;
          null != n.__h &&
            ((c = n.__h), (l = e.__e = n.__e), (e.__h = null), (s = [l])),
            (u = o.__b) && u(e);
          try {
            t: if ("function" == typeof P) {
              if (
                ((b = e.props),
                (w = (u = P.contextType) && i[u.__c]),
                (E = u ? (w ? w.props.value : u.__) : i),
                n.__c
                  ? (y = (h = e.__c = n.__c).__ = h.__E)
                  : ("prototype" in P && P.prototype.render
                      ? (e.__c = h = new P(b, E))
                      : ((e.__c = h = new v(b, E)),
                        (h.constructor = P),
                        (h.render = N)),
                    w && w.sub(h),
                    (h.props = b),
                    h.state || (h.state = {}),
                    (h.context = E),
                    (h.__n = i),
                    (d = h.__d = !0),
                    (h.__h = [])),
                null == h.__s && (h.__s = h.state),
                null != P.getDerivedStateFromProps &&
                  (h.__s == h.state && (h.__s = f({}, h.__s)),
                  f(h.__s, P.getDerivedStateFromProps(b, h.__s))),
                (p = h.props),
                (g = h.state),
                d)
              )
                null == P.getDerivedStateFromProps &&
                  null != h.componentWillMount &&
                  h.componentWillMount(),
                  null != h.componentDidMount &&
                    h.__h.push(h.componentDidMount);
              else {
                if (
                  (null == P.getDerivedStateFromProps &&
                    b !== p &&
                    null != h.componentWillReceiveProps &&
                    h.componentWillReceiveProps(b, E),
                  (!h.__e &&
                    null != h.shouldComponentUpdate &&
                    !1 === h.shouldComponentUpdate(b, h.__s, E)) ||
                    e.__v === n.__v)
                ) {
                  (h.props = b),
                    (h.state = h.__s),
                    e.__v !== n.__v && (h.__d = !1),
                    (h.__v = e),
                    (e.__e = n.__e),
                    (e.__k = n.__k),
                    h.__h.length && a.push(h);
                  break t;
                }
                null != h.componentWillUpdate &&
                  h.componentWillUpdate(b, h.__s, E),
                  null != h.componentDidUpdate &&
                    h.__h.push(function () {
                      h.componentDidUpdate(p, g, m);
                    });
              }
              (h.context = E),
                (h.props = b),
                (h.state = h.__s),
                (u = o.__r) && u(e),
                (h.__d = !1),
                (h.__v = e),
                (h.__P = t),
                (u = h.render(h.props, h.state, h.context)),
                (h.state = h.__s),
                null != h.getChildContext &&
                  (i = f(f({}, i), h.getChildContext())),
                d ||
                  null == h.getSnapshotBeforeUpdate ||
                  (m = h.getSnapshotBeforeUpdate(p, g)),
                (S =
                  null != u && u.type === _ && null == u.key
                    ? u.props.children
                    : u),
                O(t, Array.isArray(S) ? S : [S], e, n, i, r, s, a, l, c),
                (h.base = e.__e),
                (e.__h = null),
                h.__h.length && a.push(h),
                y && (h.__E = h.__ = null),
                (h.__e = !1);
            } else
              null == s && e.__v === n.__v
                ? ((e.__k = n.__k), (e.__e = n.__e))
                : (e.__e = j(n.__e, e, n, i, r, s, a, c));
            (u = o.diffed) && u(e);
          } catch (t) {
            (e.__v = null),
              (c || null != s) &&
                ((e.__e = l), (e.__h = !!c), (s[s.indexOf(l)] = null)),
              o.__e(t, e, n);
          }
        }
        function R(t, e) {
          o.__c && o.__c(e, t),
            t.some(function (e) {
              try {
                (t = e.__h),
                  (e.__h = []),
                  t.some(function (t) {
                    t.call(e);
                  });
              } catch (t) {
                o.__e(t, e.__v);
              }
            });
        }
        function j(t, e, n, o, i, r, s, a) {
          var l,
            c,
            d,
            f,
            p,
            g = n.props,
            m = e.props;
          if (((i = "svg" === e.type || i), null != r))
            for (l = 0; l < r.length; l++)
              if (
                null != (c = r[l]) &&
                ((null === e.type
                  ? 3 === c.nodeType
                  : c.localName === e.type) ||
                  t == c)
              ) {
                (t = c), (r[l] = null);
                break;
              }
          if (null == t) {
            if (null === e.type) return document.createTextNode(m);
            (t = i
              ? document.createElementNS("http://www.w3.org/2000/svg", e.type)
              : document.createElement(e.type, m.is && { is: m.is })),
              (r = null),
              (a = !1);
          }
          if (null === e.type) g === m || (a && t.data === m) || (t.data = m);
          else {
            if (
              (null != r && (r = h.slice.call(t.childNodes)),
              (d = (g = n.props || u).dangerouslySetInnerHTML),
              (f = m.dangerouslySetInnerHTML),
              !a)
            ) {
              if (null != r)
                for (g = {}, p = 0; p < t.attributes.length; p++)
                  g[t.attributes[p].name] = t.attributes[p].value;
              (f || d) &&
                ((f &&
                  ((d && f.__html == d.__html) || f.__html === t.innerHTML)) ||
                  (t.innerHTML = (f && f.__html) || ""));
            }
            (function (t, e, n, o, i) {
              var r;
              for (r in n)
                "children" === r ||
                  "key" === r ||
                  r in e ||
                  C(t, r, null, n[r], o);
              for (r in e)
                (i && "function" != typeof e[r]) ||
                  "children" === r ||
                  "key" === r ||
                  "value" === r ||
                  "checked" === r ||
                  n[r] === e[r] ||
                  C(t, r, e[r], n[r], o);
            })(t, m, g, i, a),
              f
                ? (e.__k = [])
                : ((l = e.props.children),
                  O(
                    t,
                    Array.isArray(l) ? l : [l],
                    e,
                    n,
                    o,
                    "foreignObject" !== e.type && i,
                    r,
                    s,
                    u,
                    a
                  )),
              a ||
                ("value" in m &&
                  void 0 !== (l = m.value) &&
                  (l !== t.value || ("progress" === e.type && !l)) &&
                  C(t, "value", l, g.value, !1),
                "checked" in m &&
                  void 0 !== (l = m.checked) &&
                  l !== t.checked &&
                  C(t, "checked", l, g.checked, !1));
          }
          return t;
        }
        function M(t, e, n) {
          try {
            "function" == typeof t ? t(e) : (t.current = e);
          } catch (t) {
            o.__e(t, n);
          }
        }
        function D(t, e, n) {
          var i, r, s;
          if (
            (o.unmount && o.unmount(t),
            (i = t.ref) &&
              ((i.current && i.current !== t.__e) || M(i, null, e)),
            n || "function" == typeof t.type || (n = null != (r = t.__e)),
            (t.__e = t.__d = void 0),
            null != (i = t.__c))
          ) {
            if (i.componentWillUnmount)
              try {
                i.componentWillUnmount();
              } catch (t) {
                o.__e(t, e);
              }
            i.base = i.__P = null;
          }
          if ((i = t.__k)) for (s = 0; s < i.length; s++) i[s] && D(i[s], e, n);
          null != r && p(r);
        }
        function N(t, e, n) {
          return this.constructor(t, n);
        }
        function L(t, e, n) {
          var i, r, s;
          o.__ && o.__(t, e),
            (r = (i = n === l) ? null : (n && n.__k) || e.__k),
            (t = g(_, null, [t])),
            (s = []),
            A(
              e,
              ((i ? e : n || e).__k = t),
              r || u,
              u,
              void 0 !== e.ownerSVGElement,
              n && !i
                ? [n]
                : r
                ? null
                : e.childNodes.length
                ? h.slice.call(e.childNodes)
                : null,
              s,
              n || u,
              i
            ),
            R(s, t);
        }
        (o = {
          __e: function (t, e) {
            for (var n, o, i, r = e.__h; (e = e.__); )
              if ((n = e.__c) && !n.__)
                try {
                  if (
                    ((o = n.constructor) &&
                      null != o.getDerivedStateFromError &&
                      (n.setState(o.getDerivedStateFromError(t)), (i = n.__d)),
                    null != n.componentDidCatch &&
                      (n.componentDidCatch(t), (i = n.__d)),
                    i)
                  )
                    return (e.__h = r), (n.__E = n);
                } catch (e) {
                  t = e;
                }
            throw t;
          },
          __v: 0,
        }),
          (i = function (t) {
            return null != t && void 0 === t.constructor;
          }),
          (v.prototype.setState = function (t, e) {
            var n;
            (n =
              null != this.__s && this.__s !== this.state
                ? this.__s
                : (this.__s = f({}, this.state))),
              "function" == typeof t && (t = t(f({}, n), this.props)),
              t && f(n, t),
              null != t && this.__v && (e && this.__h.push(e), w(this));
          }),
          (v.prototype.forceUpdate = function (t) {
            this.__v && ((this.__e = !0), t && this.__h.push(t), w(this));
          }),
          (v.prototype.render = _),
          (r = []),
          (s =
            "function" == typeof Promise
              ? Promise.prototype.then.bind(Promise.resolve())
              : setTimeout),
          (E.__r = 0),
          (l = u),
          (c = 0),
          (n.render = L),
          (n.hydrate = function (t, e) {
            L(t, e, l);
          }),
          (n.createElement = g),
          (n.h = g),
          (n.Fragment = _),
          (n.createRef = function () {
            return { current: null };
          }),
          (n.isValidElement = i),
          (n.Component = v),
          (n.cloneElement = function (t, e, n) {
            var o,
              i,
              r,
              s = arguments,
              a = f({}, t.props);
            for (r in e)
              "key" == r ? (o = e[r]) : "ref" == r ? (i = e[r]) : (a[r] = e[r]);
            if (arguments.length > 3)
              for (n = [n], r = 3; r < arguments.length; r++) n.push(s[r]);
            return (
              null != n && (a.children = n),
              m(t.type, a, o || t.key, i || t.ref, null)
            );
          }),
          (n.createContext = function (t, e) {
            var n = {
              __c: (e = "__cC" + c++),
              __: t,
              Consumer: function (t, e) {
                return t.children(e);
              },
              Provider: function (t) {
                var n, o;
                return (
                  this.getChildContext ||
                    ((n = []),
                    ((o = {})[e] = this),
                    (this.getChildContext = function () {
                      return o;
                    }),
                    (this.shouldComponentUpdate = function (t) {
                      this.props.value !== t.value && n.some(w);
                    }),
                    (this.sub = function (t) {
                      n.push(t);
                      var e = t.componentWillUnmount;
                      t.componentWillUnmount = function () {
                        n.splice(n.indexOf(t), 1), e && e.call(t);
                      };
                    })),
                  t.children
                );
              },
            };
            return (n.Provider.__ = n.Consumer.contextType = n);
          }),
          (n.toChildArray = function t(e, n) {
            return (
              (n = n || []),
              null == e ||
                "boolean" == typeof e ||
                (Array.isArray(e)
                  ? e.some(function (e) {
                      t(e, n);
                    })
                  : n.push(e)),
              n
            );
          }),
          (n.options = o);
      },
      {},
    ],
    7: [
      function (t, e, n) {
        var o,
          i,
          r,
          s = t("preact"),
          a = 0,
          l = [],
          c = s.options.__b,
          u = s.options.__r,
          h = s.options.diffed,
          d = s.options.__c,
          f = s.options.unmount;
        function p(t, e) {
          s.options.__h && s.options.__h(i, t, a || e), (a = 0);
          var n = i.__H || (i.__H = { __: [], __h: [] });
          return t >= n.__.length && n.__.push({}), n.__[t];
        }
        function g(t) {
          return (a = 1), m(S, t);
        }
        function m(t, e, n) {
          var r = p(o++, 2);
          return (
            (r.t = t),
            r.__c ||
              ((r.__ = [
                n ? n(e) : S(void 0, e),
                function (t) {
                  var e = r.t(r.__[0], t);
                  r.__[0] !== e && ((r.__ = [e, r.__[1]]), r.__c.setState({}));
                },
              ]),
              (r.__c = i)),
            r.__
          );
        }
        function _(t, e) {
          var n = p(o++, 4);
          !s.options.__s &&
            O(n.__H, e) &&
            ((n.__ = t), (n.__H = e), i.__h.push(n));
        }
        function v(t, e) {
          var n = p(o++, 7);
          return O(n.__H, e) && ((n.__ = t()), (n.__H = e), (n.__h = t)), n.__;
        }
        function y() {
          l.forEach(function (t) {
            if (t.__P)
              try {
                t.__H.__h.forEach(w), t.__H.__h.forEach(E), (t.__H.__h = []);
              } catch (i) {
                (t.__H.__h = []), s.options.__e(i, t.__v);
              }
          }),
            (l = []);
        }
        (s.options.__b = function (t) {
          (i = null), c && c(t);
        }),
          (s.options.__r = function (t) {
            u && u(t), (o = 0);
            var e = (i = t.__c).__H;
            e && (e.__h.forEach(w), e.__h.forEach(E), (e.__h = []));
          }),
          (s.options.diffed = function (t) {
            h && h(t);
            var e = t.__c;
            e &&
              e.__H &&
              e.__H.__h.length &&
              ((1 !== l.push(e) && r === s.options.requestAnimationFrame) ||
                (
                  (r = s.options.requestAnimationFrame) ||
                  function (t) {
                    var e,
                      n = function () {
                        clearTimeout(o),
                          b && cancelAnimationFrame(e),
                          setTimeout(t);
                      },
                      o = setTimeout(n, 100);
                    b && (e = requestAnimationFrame(n));
                  }
                )(y)),
              (i = void 0);
          }),
          (s.options.__c = function (t, e) {
            e.some(function (t) {
              try {
                t.__h.forEach(w),
                  (t.__h = t.__h.filter(function (t) {
                    return !t.__ || E(t);
                  }));
              } catch (r) {
                e.some(function (t) {
                  t.__h && (t.__h = []);
                }),
                  (e = []),
                  s.options.__e(r, t.__v);
              }
            }),
              d && d(t, e);
          }),
          (s.options.unmount = function (t) {
            f && f(t);
            var e = t.__c;
            if (e && e.__H)
              try {
                e.__H.__.forEach(w);
              } catch (t) {
                s.options.__e(t, e.__v);
              }
          });
        var b = "function" == typeof requestAnimationFrame;
        function w(t) {
          var e = i;
          "function" == typeof t.__c && t.__c(), (i = e);
        }
        function E(t) {
          var e = i;
          (t.__c = t.__()), (i = e);
        }
        function O(t, e) {
          return (
            !t ||
            t.length !== e.length ||
            e.some(function (e, n) {
              return e !== t[n];
            })
          );
        }
        function S(t, e) {
          return "function" == typeof e ? e(t) : e;
        }
        (n.useState = g),
          (n.useReducer = m),
          (n.useEffect = function (t, e) {
            var n = p(o++, 3);
            !s.options.__s &&
              O(n.__H, e) &&
              ((n.__ = t), (n.__H = e), i.__H.__h.push(n));
          }),
          (n.useLayoutEffect = _),
          (n.useRef = function (t) {
            return (
              (a = 5),
              v(function () {
                return { current: t };
              }, [])
            );
          }),
          (n.useImperativeHandle = function (t, e, n) {
            (a = 6),
              _(
                function () {
                  "function" == typeof t ? t(e()) : t && (t.current = e());
                },
                null == n ? n : n.concat(t)
              );
          }),
          (n.useMemo = v),
          (n.useCallback = function (t, e) {
            return (
              (a = 8),
              v(function () {
                return t;
              }, e)
            );
          }),
          (n.useContext = function (t) {
            var e = i.context[t.__c],
              n = p(o++, 9);
            return (
              (n.__c = t),
              e
                ? (null == n.__ && ((n.__ = !0), e.sub(i)), e.props.value)
                : t.__
            );
          }),
          (n.useDebugValue = function (t, e) {
            s.options.useDebugValue && s.options.useDebugValue(e ? e(t) : t);
          }),
          (n.useErrorBoundary = function (t) {
            var e = p(o++, 10),
              n = g();
            return (
              (e.__ = t),
              i.componentDidCatch ||
                (i.componentDidCatch = function (t) {
                  e.__ && e.__(t), n[1](t);
                }),
              [
                n[0],
                function () {
                  n[1](void 0);
                },
              ]
            );
          });
      },
      { preact: 6 },
    ],
    8: [
      function (t, e, n) {
        "use strict";
        var o = t("./lib/ReactPropTypesSecret");
        function i() {}
        function r() {}
        (r.resetWarningCache = i),
          (e.exports = function () {
            function t(t, e, n, i, r, s) {
              if (s !== o) {
                var a = new Error(
                  "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
                );
                throw ((a.name = "Invariant Violation"), a);
              }
            }
            function e() {
              return t;
            }
            t.isRequired = t;
            var n = {
              array: t,
              bool: t,
              func: t,
              number: t,
              object: t,
              string: t,
              symbol: t,
              any: t,
              arrayOf: e,
              element: t,
              elementType: t,
              instanceOf: e,
              node: t,
              objectOf: e,
              oneOf: e,
              oneOfType: e,
              shape: e,
              exact: e,
              checkPropTypes: r,
              resetWarningCache: i,
            };
            return (n.PropTypes = n), n;
          });
      },
      { "./lib/ReactPropTypesSecret": 10 },
    ],
    9: [
      function (t, e, n) {
        e.exports = t("./factoryWithThrowingShims")();
      },
      { "./factoryWithThrowingShims": 8 },
    ],
    10: [
      function (t, e, n) {
        "use strict";
        e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      },
      {},
    ],
    11: [
      function (t, e, n) {
        var o = "complete",
          i = "canceled";
        function r(t, e, n) {
          t.self === t
            ? t.scrollTo(e, n)
            : ((t.scrollLeft = e), (t.scrollTop = n));
        }
        function s(t) {
          var e = t._scrollSettings;
          if (e) {
            var n = e.maxSynchronousAlignments,
              i = (function (t, e) {
                var n,
                  o,
                  i,
                  r,
                  s,
                  a,
                  l,
                  c = t.align,
                  u = t.target.getBoundingClientRect(),
                  h = c && null != c.left ? c.left : 0.5,
                  d = c && null != c.top ? c.top : 0.5,
                  f = c && null != c.leftOffset ? c.leftOffset : 0,
                  p = c && null != c.topOffset ? c.topOffset : 0,
                  g = h,
                  m = d;
                if (t.isWindow(e))
                  (a = Math.min(u.width, e.innerWidth)),
                    (l = Math.min(u.height, e.innerHeight)),
                    (o = u.left + e.pageXOffset - e.innerWidth * g + a * g),
                    (i = u.top + e.pageYOffset - e.innerHeight * m + l * m),
                    (i -= p),
                    (r = (o -= f) - e.pageXOffset),
                    (s = i - e.pageYOffset);
                else {
                  (a = u.width),
                    (l = u.height),
                    (n = e.getBoundingClientRect());
                  var _ = u.left - (n.left - e.scrollLeft),
                    v = u.top - (n.top - e.scrollTop);
                  (o = _ + a * g - e.clientWidth * g),
                    (i = v + l * m - e.clientHeight * m),
                    (o -= f),
                    (i -= p),
                    (o = Math.max(
                      Math.min(o, e.scrollWidth - e.clientWidth),
                      0
                    )),
                    (i = Math.max(
                      Math.min(i, e.scrollHeight - e.clientHeight),
                      0
                    )),
                    (r = o - e.scrollLeft),
                    (s = i - e.scrollTop);
                }
                return { x: o, y: i, differenceX: r, differenceY: s };
              })(e, t),
              a = Date.now() - e.startTime,
              l = Math.min((1 / e.time) * a, 1);
            if (e.endIterations >= n)
              return r(t, i.x, i.y), (t._scrollSettings = null), e.end(o);
            var c = 1 - e.ease(l);
            if (
              (r(t, i.x - i.differenceX * c, i.y - i.differenceY * c),
              a >= e.time)
            )
              return e.endIterations++, s(t);
            !(function (t) {
              if ("requestAnimationFrame" in window)
                return window.requestAnimationFrame(t);
              setTimeout(t, 16);
            })(s.bind(null, t));
          }
        }
        function a(t) {
          return t.self === t;
        }
        function l(t, e, n, o) {
          var r,
            l = !e._scrollSettings,
            c = e._scrollSettings,
            u = Date.now(),
            h = { passive: !0 };
          function d(t) {
            (e._scrollSettings = null),
              e.parentElement &&
                e.parentElement._scrollSettings &&
                e.parentElement._scrollSettings.end(t),
              n.debug && console.log("Scrolling ended with type", t, "for", e),
              o(t),
              r &&
                (e.removeEventListener("touchstart", r, h),
                e.removeEventListener("wheel", r, h));
          }
          c && c.end(i);
          var f = n.maxSynchronousAlignments;
          return (
            null == f && (f = 3),
            (e._scrollSettings = {
              startTime: u,
              endIterations: 0,
              target: t,
              time: n.time,
              ease: n.ease,
              align: n.align,
              isWindow: n.isWindow || a,
              maxSynchronousAlignments: f,
              end: d,
            }),
            ("cancellable" in n && !n.cancellable) ||
              ((r = d.bind(null, i)),
              e.addEventListener("touchstart", r, h),
              e.addEventListener("wheel", r, h)),
            l && s(e),
            r
          );
        }
        function c(t) {
          return (
            "pageXOffset" in t ||
            ((t.scrollHeight !== t.clientHeight ||
              t.scrollWidth !== t.clientWidth) &&
              "hidden" !== getComputedStyle(t).overflow)
          );
        }
        function u() {
          return !0;
        }
        function h(t) {
          if (t.assignedSlot) return h(t.assignedSlot);
          if (t.parentElement)
            return "BODY" === t.parentElement.tagName
              ? t.parentElement.ownerDocument.defaultView ||
                  t.parentElement.ownerDocument.ownerWindow
              : t.parentElement;
          if (t.getRootNode) {
            var e = t.getRootNode();
            if (11 === e.nodeType) return e.host;
          }
        }
        e.exports = function (t, e, n) {
          if (t) {
            "function" == typeof e && ((n = e), (e = null)),
              e || (e = {}),
              (e.time = isNaN(e.time) ? 1e3 : e.time),
              (e.ease =
                e.ease ||
                function (t) {
                  return 1 - Math.pow(1 - t, t / 2);
                });
            var i,
              r = h(t),
              s = 1,
              a = e.validTarget || u,
              d = e.isScrollable;
            for (
              e.debug &&
              (console.log("About to scroll to", t),
              r ||
                console.error(
                  "Target did not have a parent, is it mounted in the DOM?"
                ));
              r;

            )
              if (
                (e.debug && console.log("Scrolling parent node", r),
                a(r, s) && (d ? d(r, c) : c(r)) && (s++, (i = l(t, r, e, f))),
                !(r = h(r)))
              ) {
                f(o);
                break;
              }
            return i;
          }
          function f(t) {
            --s || (n && n(t));
          }
        };
      },
      {},
    ],
    12: [
      function (t, e, n) {
        function o() {}
        (o.prototype = {
          on: function (t, e, n) {
            var o = this.e || (this.e = {});
            return (o[t] || (o[t] = [])).push({ fn: e, ctx: n }), this;
          },
          once: function (t, e, n) {
            var o = this;
            function i() {
              o.off(t, i), e.apply(n, arguments);
            }
            return (i._ = e), this.on(t, i, n);
          },
          emit: function (t) {
            for (
              var e = [].slice.call(arguments, 1),
                n = ((this.e || (this.e = {}))[t] || []).slice(),
                o = 0,
                i = n.length;
              o < i;
              o++
            )
              n[o].fn.apply(n[o].ctx, e);
            return this;
          },
          off: function (t, e) {
            var n = this.e || (this.e = {}),
              o = n[t],
              i = [];
            if (o && e)
              for (var r = 0, s = o.length; r < s; r++)
                o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
            return i.length ? (n[t] = i) : delete n[t], this;
          },
        }),
          (e.exports = o),
          (e.exports.TinyEmitter = o);
      },
      {},
    ],
    13: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.Adder = n.ARROW_POINTING_UP = n.ARROW_POINTING_DOWN = void 0);
        var o,
          i = t("preact"),
          r =
            (o = t("./components/adder-toolbar")) && o.__esModule
              ? o
              : { default: o },
          s = t("./util/shadow-root");
        n.ARROW_POINTING_DOWN = 1;
        function a(t) {
          return t.toString() + "px";
        }
        n.ARROW_POINTING_UP = 2;
        n.Adder = class {
          constructor(t, e) {
            (this._container = t),
              (this._shadowRoot = (0, s.createShadowRoot)(t)),
              Object.assign(t.style, {
                display: "block",
                position: "absolute",
                top: 0,
              }),
              (this._view = t.ownerDocument.defaultView),
              (this._width = () =>
                this._shadowRoot.firstChild.getBoundingClientRect().width),
              (this._height = () =>
                this._shadowRoot.firstChild.getBoundingClientRect().height),
              (this._isVisible = !1),
              (this._arrowDirection = "up"),
              (this._onAnnotate = e.onAnnotate),
              (this._onHighlight = e.onHighlight),
              (this._onShowAnnotations = e.onShowAnnotations),
              (this.annotationsForSelection = []),
              this._render();
          }
          hide() {
            (this._isVisible = !1), this._render();
          }
          show(t, e) {
            const {
              left: n,
              top: o,
              arrowDirection: i,
            } = this._calculateTarget(t, e);
            this._showAt(n, o),
              (this._isVisible = !0),
              (this._arrowDirection = 2 === i ? "up" : "down"),
              this._render();
          }
          _calculateTarget(t, e) {
            let n, o, i;
            n = e ? 1 : 2;
            const r = Math.min(20, t.width),
              s = this._width(),
              a = this._height();
            return (
              (i = e ? t.left - s / 2 + r : t.left + t.width - s / 2 - r),
              t.top - a < 0 && 1 === n
                ? (n = 2)
                : t.top + a > this._view.innerHeight && (n = 1),
              (o = 2 === n ? t.top + t.height + 10 : t.top - a - 10),
              (i = Math.max(i, 0)),
              (i = Math.min(i, this._view.innerWidth - s)),
              (o = Math.max(o, 0)),
              (o = Math.min(o, this._view.innerHeight - a)),
              { top: o, left: i, arrowDirection: n }
            );
          }
          _findZindex(t, e) {
            if (void 0 === document.elementsFromPoint) return 32768;
            const n = this._width(),
              o = this._height(),
              i = [
                ...new Set([
                  ...document.elementsFromPoint(t, e),
                  ...document.elementsFromPoint(t, e + o),
                  ...document.elementsFromPoint(t + n / 2, e + o / 2),
                  ...document.elementsFromPoint(t + n, e),
                  ...document.elementsFromPoint(t + n, e + o),
                ]),
              ]
                .map((t) => +getComputedStyle(t).zIndex)
                .filter(Number.isInteger);
            return i.push(0), Math.max(...i) + 1;
          }
          _showAt(t, e) {
            const n = (function (t) {
                let e = t.parentElement;
                for (
                  ;
                  e.parentElement && "static" === getComputedStyle(e).position;

                )
                  e = e.parentElement;
                return e;
              })(this._container).getBoundingClientRect(),
              o = this._findZindex(t, e);
            Object.assign(this._container.style, {
              left: a(t - n.left),
              top: a(e - n.top),
              zIndex: o,
            });
          }
          _render() {
            (0, i.render)(
              (0, i.createElement)(r.default, {
                isVisible: this._isVisible,
                arrowDirection: this._arrowDirection,
                onCommand: (t) => {
                  switch (t) {
                    case "annotate":
                      this._onAnnotate(), this.hide();
                      break;
                    case "highlight":
                      this._onHighlight(), this.hide();
                      break;
                    case "show":
                      this._onShowAnnotations(this.annotationsForSelection);
                  }
                },
                annotationCount: this.annotationsForSelection.length,
              }),
              this._shadowRoot
            );
          }
        };
      },
      { "./components/adder-toolbar": 22, "./util/shadow-root": 52, preact: 6 },
    ],
    14: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.anchor = function (t, e, n = {}) {
            let r = null,
              s = null,
              a = null;
            for (let o of e)
              switch (o.type) {
                case "TextPositionSelector":
                  (r = o), (n.hint = r.start);
                  break;
                case "TextQuoteSelector":
                  s = o;
                  break;
                case "RangeSelector":
                  a = o;
              }
            const l = (t) => {
              var e;
              if (
                null !== (e = s) &&
                void 0 !== e &&
                e.exact &&
                t.toString() !== s.exact
              )
                throw new Error("quote mismatch");
              return t;
            };
            let c = Promise.reject("unable to anchor");
            return (
              a &&
                (c = c.catch(() =>
                  i(o.RangeAnchor.fromSelector(t, a), n).then(l)
                )),
              r &&
                (c = c.catch(() =>
                  i(o.TextPositionAnchor.fromSelector(t, r), n).then(l)
                )),
              s &&
                (c = c.catch(() => i(o.TextQuoteAnchor.fromSelector(t, s), n))),
              c
            );
          }),
          (n.describe = function (t, e) {
            const n = [o.RangeAnchor, o.TextPositionAnchor, o.TextQuoteAnchor],
              i = [];
            for (let o of n)
              try {
                const n = o.fromRange(t, e);
                i.push(n.toSelector());
              } catch (r) {
                continue;
              }
            return i;
          });
        var o = t("./types");
        async function i(t, e = {}) {
          return t.toRange(e);
        }
      },
      { "./types": 18 },
    ],
    15: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.matchQuote = function (t, e, n = {}) {
            if (0 === e.length) return null;
            const o = Math.min(256, e.length / 2),
              i = r(t, e, o);
            if (0 === i.length) return null;
            const a = (o) => {
                const i = 1 - o.errors / e.length,
                  r = n.prefix
                    ? s(t.slice(o.start - n.prefix.length, o.start), n.prefix)
                    : 1,
                  a = n.suffix
                    ? s(t.slice(o.end, o.end + n.suffix.length), n.suffix)
                    : 1;
                let l = 1;
                return (
                  "number" == typeof n.hint &&
                    (l = 1 - Math.abs(o.start - n.hint) / t.length),
                  (50 * i + 20 * r + 20 * a + 2 * l) / 92
                );
              },
              l = i.map((t) => ({ start: t.start, end: t.end, score: a(t) }));
            return l.sort((t, e) => e.score - t.score), l[0];
          });
        var o,
          i =
            (o = t("approx-string-match")) && o.__esModule ? o : { default: o };
        function r(t, e, n) {
          let o = 0,
            r = [];
          for (; -1 !== o; )
            (o = t.indexOf(e, o)),
              -1 !== o &&
                (r.push({ start: o, end: o + e.length, errors: 0 }), (o += 1));
          return r.length > 0 ? r : (0, i.default)(t, e, n);
        }
        function s(t, e) {
          return 0 === e.length
            ? 0
            : 1 - r(t, e, e.length)[0].errors / e.length;
        }
      },
      { "approx-string-match": 1 },
    ],
    16: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.documentHasText = async function () {
            const t = u();
            let e = !1;
            for (let n = 0; n < t.pagesCount; n++)
              if ((await d(n)).trim().length > 0) {
                e = !0;
                break;
              }
            return e;
          }),
          (n.anchor = function (t, e) {
            const n = e.find((t) => "TextPositionSelector" === t.type),
              o = e.find((t) => "TextQuoteSelector" === t.type);
            let i = Promise.reject("unable to anchor");
            return (
              n &&
                (i = i.catch(() =>
                  p(n.start).then(({ index: t, offset: e, textContent: i }) => {
                    const r = n.start - e,
                      s = n.end - e,
                      a = s - r;
                    return (
                      ((t) => {
                        if (o && o.exact !== t.toString())
                          throw new Error("quote mismatch");
                      })(i.substr(r, a)),
                      g(t, r, s)
                    );
                  })
                )),
              o &&
                (i = i.catch(() => {
                  var t;
                  if (n && l[o.exact] && l[o.exact][n.start]) {
                    const { pageIndex: t, anchor: e } = l[o.exact][n.start];
                    return g(t, e.start, e.end);
                  }
                  return (function (t) {
                    const e = u().pagesCount,
                      n = Array(e)
                        .fill(0)
                        .map((t, e) => e);
                    return t
                      ? p(t).then(({ index: t }) =>
                          (function (t) {
                            const e = n.slice(0, t),
                              o = n.slice(t),
                              i = [];
                            for (; e.length > 0 || o.length > 0; )
                              o.length && i.push(o.shift()),
                                e.length && i.push(e.pop());
                            return i;
                          })(t)
                        )
                      : Promise.resolve(n);
                  })(
                    null !== (t = null == n ? void 0 : n.start) && void 0 !== t
                      ? t
                      : 0
                  ).then((t) => m(t, o, n));
                })),
              i
            );
          }),
          (n.describe = async function (t, e) {
            try {
              e = r.TextRange.fromRange(e).toRange();
            } catch (h) {
              throw new Error("Selection does not contain text");
            }
            const n = c(e.startContainer),
              o = c(e.endContainer);
            if (!n || !o) throw new Error("Selection is outside page text");
            if (n !== o)
              throw new Error("Selecting across page breaks is not supported");
            const i = r.TextPosition.fromPoint(
                e.startContainer,
                e.startOffset
              ).relativeTo(n),
              a = r.TextPosition.fromPoint(
                e.endContainer,
                e.endOffset
              ).relativeTo(o),
              l = (function (t) {
                let e = 0;
                for (; t.previousSibling; ) ++e, (t = t.previousSibling);
                return e;
              })(n.parentNode),
              u = await f(l);
            return [
              {
                type: "TextPositionSelector",
                start: u + i.offset,
                end: u + a.offset,
              },
              s.TextQuoteAnchor.fromRange(t, e).toSelector(),
            ];
          }),
          (n.purgeCache = function () {
            (a = {}), (l = {});
          });
        var o,
          i =
            (o = t("../pdfjs-rendering-states")) && o.__esModule
              ? o
              : { default: o },
          r = t("./text-range"),
          s = t("./types");
        let a = {},
          l = {};
        function c(t) {
          var e;
          const n = "closest" in t ? t : t.parentElement;
          return null !== (e = null == n ? void 0 : n.closest(".textLayer")) &&
            void 0 !== e
            ? e
            : null;
        }
        function u() {
          return PDFViewerApplication.pdfViewer;
        }
        async function h(t) {
          const e = u();
          let n = e.getPageView(t);
          return (
            (n && n.pdfPage) ||
              (n = await new Promise((n) => {
                const o = () => {
                  e.eventBus
                    ? e.eventBus.off("pagesloaded", o)
                    : document.removeEventListener("pagesloaded", o),
                    n(e.getPageView(t));
                };
                e.eventBus
                  ? e.eventBus.on("pagesloaded", o)
                  : document.addEventListener("pagesloaded", o);
              })),
            n
          );
        }
        async function d(t) {
          return (
            a[t] ||
              (a[t] = (async (t) => {
                const e = await h(t);
                return (
                  await e.pdfPage.getTextContent({ normalizeWhitespace: !0 })
                ).items
                  .filter((t) => /\S/.test(t.str))
                  .map((t) => t.str)
                  .join("");
              })(t)),
            a[t]
          );
        }
        function f(t) {
          let e = -1;
          const n = (o) => (
            ++e,
            e === t ? Promise.resolve(o) : d(e).then((t) => n(o + t.length))
          );
          return n(0);
        }
        function p(t) {
          let e = 0,
            n = 0;
          const o = (i) => {
            const r = u().pagesCount - 1;
            return n + i.length > t || e === r
              ? ((t = n),
                Promise.resolve({ index: e, offset: t, textContent: i }))
              : (++e, (n += i.length), d(e).then(o));
          };
          return d(0).then(o);
        }
        async function g(t, e, n) {
          const o = await h(t);
          if (
            o.renderingState === i.default.FINISHED &&
            o.textLayer &&
            o.textLayer.renderingDone
          ) {
            const t = o.textLayer.textLayerDiv,
              i = new r.TextPosition(t, e),
              s = new r.TextPosition(t, n);
            return new r.TextRange(i, s).toRange();
          }
          let s = o.div.querySelector(".annotator-placeholder");
          s ||
            ((s = document.createElement("span")),
            s.classList.add("annotator-placeholder"),
            (s.textContent = "Loading annotations…"),
            o.div.appendChild(s));
          const a = document.createRange();
          return a.setStartBefore(s), a.setEndAfter(s), a;
        }
        function m(t, e, n) {
          if (0 === t.length)
            return Promise.reject(new Error("Quote not found"));
          const [o, ...i] = t,
            r = d(o),
            a = f(o);
          return Promise.all([r, a])
            .then(([t, o]) => {
              const i = document.createElement("div");
              i.textContent = t;
              const r = s.TextQuoteAnchor.fromSelector(i, e);
              if (n) {
                let e = n.start - o;
                return (
                  (e = Math.max(0, e)),
                  (e = Math.min(e, t.length)),
                  r.toPositionAnchor({ hint: e })
                );
              }
              return r.toPositionAnchor();
            })
            .then(
              (t) => (
                n &&
                  (l[e.exact] || (l[e.exact] = {}),
                  (l[e.exact][n.start] = { pageIndex: o, anchor: t })),
                g(o, t.start, t.end)
              )
            )
            .catch(() => m(i, e, n));
        }
      },
      { "../pdfjs-rendering-states": 39, "./text-range": 17, "./types": 18 },
    ],
    17: [
      function (t, e, n) {
        "use strict";
        function o(t) {
          switch (t.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.TEXT_NODE:
              return t.textContent.length;
            default:
              return 0;
          }
        }
        function i(t) {
          let e = t.previousSibling,
            n = 0;
          for (; e; ) (n += o(e)), (e = e.previousSibling);
          return n;
        }
        function r(t, ...e) {
          let n = e.shift();
          const o = t.ownerDocument.createNodeIterator(t, NodeFilter.SHOW_TEXT),
            i = [];
          let r,
            s = o.nextNode(),
            a = 0;
          for (; void 0 !== n && s; )
            (r = s),
              a + r.data.length > n
                ? (i.push({ node: r, offset: n - a }), (n = e.shift()))
                : ((s = o.nextNode()), (a += r.data.length));
          for (; void 0 !== n && r && a === n; )
            i.push({ node: r, offset: r.data.length }), (n = e.shift());
          if (void 0 !== n) throw new RangeError("Offset exceeds text length");
          return i;
        }
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.TextRange = n.TextPosition = n.RESOLVE_BACKWARDS = n.RESOLVE_FORWARDS = void 0);
        n.RESOLVE_FORWARDS = 1;
        n.RESOLVE_BACKWARDS = 2;
        class s {
          constructor(t, e) {
            if (e < 0) throw new Error("Offset is invalid");
            (this.element = t), (this.offset = e);
          }
          relativeTo(t) {
            if (!t.contains(this.element))
              throw new Error("Parent is not an ancestor of current element");
            let e = this.element,
              n = this.offset;
            for (; e !== t; ) (n += i(e)), (e = e.parentElement);
            return new s(e, n);
          }
          resolve(t = {}) {
            try {
              return r(this.element, this.offset)[0];
            } catch (e) {
              if (0 === this.offset && void 0 !== t.direction) {
                const n = document.createTreeWalker(
                  this.element.getRootNode(),
                  NodeFilter.SHOW_TEXT
                );
                n.currentNode = this.element;
                const o = 1 === t.direction,
                  i = o ? n.nextNode() : n.previousNode();
                if (!i) throw e;
                return { node: i, offset: o ? 0 : i.data.length };
              }
              throw e;
            }
          }
          static fromCharOffset(t, e) {
            switch (t.nodeType) {
              case Node.TEXT_NODE:
                return s.fromPoint(t, e);
              case Node.ELEMENT_NODE:
                return new s(t, e);
              default:
                throw new Error("Node is not an element or text node");
            }
          }
          static fromPoint(t, e) {
            switch (t.nodeType) {
              case Node.TEXT_NODE: {
                if (e < 0 || e > t.data.length)
                  throw new Error("Text node offset is out of range");
                if (!t.parentElement)
                  throw new Error("Text node has no parent");
                const n = i(t) + e;
                return new s(t.parentElement, n);
              }
              case Node.ELEMENT_NODE: {
                if (e < 0 || e > t.childNodes.length)
                  throw new Error("Child node offset is out of range");
                let n = 0;
                for (let i = 0; i < e; i++) n += o(t.childNodes[i]);
                return new s(t, n);
              }
              default:
                throw new Error("Point is not in an element or text node");
            }
          }
        }
        n.TextPosition = s;
        class a {
          constructor(t, e) {
            (this.start = t), (this.end = e);
          }
          relativeTo(t) {
            return new a(this.start.relativeTo(t), this.end.relativeTo(t));
          }
          toRange() {
            let t, e;
            this.start.element === this.end.element &&
            this.start.offset <= this.end.offset
              ? ([t, e] = r(
                  this.start.element,
                  this.start.offset,
                  this.end.offset
                ))
              : ((t = this.start.resolve({ direction: 1 })),
                (e = this.end.resolve({ direction: 2 })));
            const n = new Range();
            return n.setStart(t.node, t.offset), n.setEnd(e.node, e.offset), n;
          }
          static fromRange(t) {
            const e = s.fromPoint(t.startContainer, t.startOffset),
              n = s.fromPoint(t.endContainer, t.endOffset);
            return new a(e, n);
          }
          static fromOffsets(t, e, n) {
            return new a(new s(t, e), new s(t, n));
          }
        }
        n.TextRange = a;
      },
      {},
    ],
    18: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.TextQuoteAnchor = n.TextPositionAnchor = n.RangeAnchor = void 0);
        var o = t("./match-quote"),
          i = t("./text-range"),
          r = t("./xpath");
        function s(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function a(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? s(Object(n), !0).forEach(function (e) {
                  l(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : s(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function l(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        class c {
          constructor(t, e) {
            (this.root = t), (this.range = e);
          }
          static fromRange(t, e) {
            return new c(t, e);
          }
          static fromSelector(t, e) {
            const n = (0, r.nodeFromXPath)(e.startContainer, t);
            if (!n) throw new Error("Failed to resolve startContainer XPath");
            const o = (0, r.nodeFromXPath)(e.endContainer, t);
            if (!o) throw new Error("Failed to resolve endContainer XPath");
            const s = i.TextPosition.fromCharOffset(n, e.startOffset),
              a = i.TextPosition.fromCharOffset(o, e.endOffset),
              l = new i.TextRange(s, a).toRange();
            return new c(t, l);
          }
          toRange() {
            return this.range;
          }
          toSelector() {
            const t = i.TextRange.fromRange(this.range).toRange(),
              e = i.TextRange.fromRange(t),
              n = (0, r.xpathFromNode)(e.start.element, this.root),
              o = (0, r.xpathFromNode)(e.end.element, this.root);
            return {
              type: "RangeSelector",
              startContainer: n,
              startOffset: e.start.offset,
              endContainer: o,
              endOffset: e.end.offset,
            };
          }
        }
        n.RangeAnchor = c;
        class u {
          constructor(t, e, n) {
            (this.root = t), (this.start = e), (this.end = n);
          }
          static fromRange(t, e) {
            const n = i.TextRange.fromRange(e).relativeTo(t);
            return new u(t, n.start.offset, n.end.offset);
          }
          static fromSelector(t, e) {
            return new u(t, e.start, e.end);
          }
          toSelector() {
            return {
              type: "TextPositionSelector",
              start: this.start,
              end: this.end,
            };
          }
          toRange() {
            return i.TextRange.fromOffsets(
              this.root,
              this.start,
              this.end
            ).toRange();
          }
        }
        n.TextPositionAnchor = u;
        class h {
          constructor(t, e, n = {}) {
            (this.root = t), (this.exact = e), (this.context = n);
          }
          static fromRange(t, e) {
            const n = t.textContent,
              o = i.TextRange.fromRange(e).relativeTo(t),
              r = o.start.offset,
              s = o.end.offset;
            return new h(t, n.slice(r, s), {
              prefix: n.slice(Math.max(0, r - 32), r),
              suffix: n.slice(s, Math.min(n.length, s + 32)),
            });
          }
          static fromSelector(t, e) {
            const { prefix: n, suffix: o } = e;
            return new h(t, e.exact, { prefix: n, suffix: o });
          }
          toSelector() {
            return {
              type: "TextQuoteSelector",
              exact: this.exact,
              prefix: this.context.prefix,
              suffix: this.context.suffix,
            };
          }
          toRange(t = {}) {
            return this.toPositionAnchor(t).toRange();
          }
          toPositionAnchor(t = {}) {
            const e = this.root.textContent,
              n = (0, o.matchQuote)(
                e,
                this.exact,
                a(a({}, this.context), {}, { hint: t.hint })
              );
            if (!n) throw new Error("Quote not found");
            return new u(this.root, n.start, n.end);
          }
        }
        n.TextQuoteAnchor = h;
      },
      { "./match-quote": 15, "./text-range": 17, "./xpath": 19 },
    ],
    19: [
      function (t, e, n) {
        "use strict";
        function o(t) {
          return `${(function (t) {
            const e = t.nodeName.toLowerCase();
            let n = e;
            return "#text" === e && (n = "text()"), n;
          })(t)}[${(function (t) {
            let e = 0,
              n = t;
            for (; n; )
              n.nodeName === t.nodeName && (e += 1), (n = n.previousSibling);
            return e;
          })(t)}]`;
        }
        function i(t, e, n) {
          e = e.toUpperCase();
          let o = -1;
          for (let i = 0; i < t.children.length; i++) {
            const r = t.children[i];
            if (r.nodeName.toUpperCase() === e && (++o, o === n)) return r;
          }
          return null;
        }
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.xpathFromNode = function (t, e) {
            let n = "",
              i = t;
            for (; i !== e; ) {
              if (!i) throw new Error("Node is not a descendant of root");
              (n = o(i) + "/" + n), (i = i.parentNode);
            }
            return (n = "/" + n), (n = n.replace(/\/$/, "")), n;
          }),
          (n.nodeFromXPath = function (t, e = document.body) {
            try {
              return (function (t, e) {
                if (null === t.match(/^(\/[A-Za-z0-9-]+(\[[0-9]+\])?)+$/))
                  throw new Error("Expression is not a simple XPath");
                const n = t.split("/");
                let o = e;
                n.shift();
                for (let r of n) {
                  let t, e;
                  const n = r.indexOf("[");
                  if (-1 !== n) {
                    t = r.slice(0, n);
                    const o = r.slice(n + 1, r.indexOf("]"));
                    if (((e = parseInt(o) - 1), e < 0)) return null;
                  } else (t = r), (e = 0);
                  const s = i(o, t, e);
                  if (!s) return null;
                  o = s;
                }
                return o;
              })(t, e);
            } catch (n) {
              return document.evaluate(
                "." + t,
                e,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
              ).singleNodeValue;
            }
          });
      },
      {},
    ],
    20: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (t, e) {
            e.on(i.default.PUBLIC_ANNOTATION_COUNT_CHANGED, function (e) {
              const n = t.querySelectorAll(
                "[data-hypothesis-annotation-count]"
              );
              Array.from(n).forEach(function (t) {
                t.textContent = e;
              });
            });
          });
        var o,
          i =
            (o = t("../shared/bridge-events")) && o.__esModule
              ? o
              : { default: o };
      },
      { "../shared/bridge-events": 65 },
    ],
    21: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        n.default = class {
          constructor(t, e) {
            (this.bridge = t),
              (this.cache = {}),
              (this._on = e.on),
              (this._emit = e.emit),
              this.bridge.on("deleteAnnotation", (t, e) => {
                const n = this._parse(t);
                delete this.cache[n.$tag],
                  this._emit("annotationDeleted", n),
                  e(null, this._format(n));
              }),
              this.bridge.on("loadAnnotations", (t, e) => {
                const n = t.map((t) => this._parse(t));
                this._emit("annotationsLoaded", n), e(null, n);
              }),
              this._on("beforeAnnotationCreated", (t) => {
                t.$tag ||
                  this.bridge.call("beforeCreateAnnotation", this._format(t));
              });
          }
          sync(t) {
            this.bridge.call(
              "sync",
              t.map((t) => this._format(t))
            );
          }
          _tag(t, e) {
            return (
              t.$tag ||
                ((e = e || window.btoa(Math.random().toString())),
                Object.defineProperty(t, "$tag", { value: e }),
                (this.cache[e] = t)),
              t
            );
          }
          _parse(t) {
            const e = Object.assign(this.cache[t.tag] || {}, t.msg);
            return this._tag(e, t.tag);
          }
          _format(t) {
            return this._tag(t), { tag: t.$tag, msg: t };
          }
        };
      },
      {},
    ],
    22: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }), (n.default = u);
        var o = l(t("classnames")),
          i = t("preact"),
          r = l(t("prop-types")),
          s = t("../../shared/shortcut"),
          a = l(t("../../shared/components/svg-icon"));
        function l(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function c({
          badgeCount: t,
          icon: e,
          label: n,
          onClick: o,
          shortcut: r,
        }) {
          (0, s.useShortcut)(r, o);
          const l = r ? `${n} (${r})` : n;
          return (0, i.createElement)(
            "button",
            {
              className: "annotator-adder-button",
              onClick: o,
              "aria-label": l,
              title: l,
            },
            e &&
              (0, i.createElement)(a.default, {
                name: e,
                className: "annotator-adder-button__icon",
              }),
            "number" == typeof t &&
              (0, i.createElement)(
                "span",
                { className: "annotator-adder-button__badge" },
                t
              ),
            (0, i.createElement)(
              "span",
              { className: "annotator-adder-button__label" },
              n
            )
          );
        }
        function u({
          arrowDirection: t,
          isVisible: e,
          onCommand: n,
          annotationCount: r = 0,
        }) {
          const s = (t, e) => {
              t.preventDefault(), t.stopPropagation(), n(e);
            },
            l = e ? "a" : null,
            u = e ? "h" : null,
            h = e ? "s" : null;
          return (0, i.createElement)(
            "hypothesis-adder-toolbar",
            {
              class: (0, o.default)("annotator-adder", {
                "annotator-adder--down": "up" === t,
                "annotator-adder--up": "down" === t,
                "is-active": e,
              }),
              style: { visibility: e ? "visible" : "hidden" },
            },
            (0, i.createElement)(
              "hypothesis-adder-actions",
              { className: "annotator-adder-actions" },
              (0, i.createElement)(c, {
                icon: "annotate",
                onClick: (t) => s(t, "annotate"),
                label: "Annotate",
                shortcut: l,
              }),
              (0, i.createElement)(c, {
                icon: "highlight",
                onClick: (t) => s(t, "highlight"),
                label: "Highlight",
                shortcut: u,
              }),
              r > 0 &&
                (0, i.createElement)("div", {
                  className: "annotator-adder-actions__separator",
                }),
              r > 0 &&
                (0, i.createElement)(c, {
                  badgeCount: r,
                  onClick: (t) => s(t, "show"),
                  label: "Show",
                  shortcut: h,
                })
            ),
            (0, i.createElement)(a.default, {
              name: "pointer",
              inline: !0,
              className: (0, o.default)("annotator-adder-arrow", {
                "annotator-adder-arrow--down": "down" === t,
                "annotator-adder-arrow--up": "up" === t,
              }),
            })
          );
        }
        (c.propTypes = {
          badgeCount: r.default.number,
          icon: r.default.string,
          label: r.default.string.isRequired,
          onClick: r.default.func.isRequired,
          shortcut: r.default.string,
        }),
          (u.propTypes = {
            arrowDirection: r.default.oneOf(["up", "down"]).isRequired,
            isVisible: r.default.bool.isRequired,
            onCommand: r.default.func.isRequired,
            annotationCount: r.default.number,
          });
      },
      {
        "../../shared/components/svg-icon": 68,
        "../../shared/shortcut": 71,
        classnames: 2,
        preact: 6,
        "prop-types": 9,
      },
    ],
    23: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }), (n.default = d);
        var o = t("preact"),
          i = c(t("classnames")),
          r = c(t("prop-types")),
          s = c(t("scroll-into-view")),
          a = t("../highlighter"),
          l = t("../util/buckets");
        function c(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function u({ bucket: t, onSelectAnnotations: e }) {
          const n = t.anchors.map((t) => t.annotation),
            i = `Select nearby annotations (${t.anchors.length})`;
          function r(e) {
            t.anchors.forEach((t) => {
              (0, a.setHighlightsFocused)(t.highlights || [], e);
            });
          }
          return (0, o.createElement)(
            "button",
            {
              className: "bucket-button bucket-button--left",
              onClick: (t) =>
                (function (t) {
                  t.stopPropagation(), e(n, t.metaKey || t.ctrlKey);
                })(t),
              onMouseMove: () => r(!0),
              onMouseOut: () => r(!1),
              onBlur: () => r(!1),
              title: i,
              "aria-label": i,
            },
            t.anchors.length
          );
        }
        function h({ bucket: t, direction: e }) {
          const n = `Go ${e} to next annotations (${t.anchors.length})`;
          return (0, o.createElement)(
            "button",
            {
              className: (0, i.default)("bucket-button", `bucket-button--${e}`),
              onClick: (n) =>
                (function (n) {
                  var o;
                  n.stopPropagation();
                  const i = (0, l.findClosestOffscreenAnchor)(t.anchors, e);
                  null != i &&
                    null !== (o = i.highlights) &&
                    void 0 !== o &&
                    o.length &&
                    (0, s.default)(i.highlights[0]);
                })(n),
              title: n,
              "aria-label": n,
            },
            t.anchors.length
          );
        }
        function d({ above: t, below: e, buckets: n, onSelectAnnotations: i }) {
          const r = t.anchors.length > 0,
            s = e.anchors.length > 0;
          return (0, o.createElement)(
            "ul",
            { className: "buckets" },
            r &&
              (0, o.createElement)(
                "li",
                { className: "bucket", style: { top: t.position } },
                (0, o.createElement)(h, { bucket: t, direction: "up" })
              ),
            n.map((t, e) =>
              (0, o.createElement)(
                "li",
                { className: "bucket", style: { top: t.position }, key: e },
                (0, o.createElement)(u, { bucket: t, onSelectAnnotations: i })
              )
            ),
            s &&
              (0, o.createElement)(
                "li",
                { className: "bucket", style: { top: e.position } },
                (0, o.createElement)(h, { bucket: e, direction: "down" })
              )
          );
        }
        (u.propTypes = {
          bucket: r.default.object.isRequired,
          onSelectAnnotations: r.default.func.isRequired,
        }),
          (h.propTypes = {
            bucket: r.default.object.isRequired,
            direction: r.default.string,
          }),
          (d.propTypes = {
            above: r.default.object.isRequired,
            below: r.default.object.isRequired,
            buckets: r.default.array.isRequired,
            onSelectAnnotations: r.default.func.isRequired,
          });
      },
      {
        "../highlighter": 34,
        "../util/buckets": 50,
        classnames: 2,
        preact: 6,
        "prop-types": 9,
        "scroll-into-view": 11,
      },
    ],
    24: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }), (n.default = l);
        var o = s(t("prop-types")),
          i = t("preact"),
          r = s(t("../../shared/components/svg-icon"));
        function s(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function a({
          buttonRef: t,
          expanded: e,
          className: n = "annotator-toolbar-button",
          label: o,
          icon: s,
          onClick: a,
          selected: l = !1,
        }) {
          return (0, i.createElement)(
            "button",
            {
              className: n,
              "aria-label": o,
              "aria-expanded": e,
              "aria-pressed": l,
              onClick: (t) => {
                t.stopPropagation(), a();
              },
              ref: t,
              title: o,
            },
            (0, i.createElement)(r.default, { name: s })
          );
        }
        function l({
          closeSidebar: t,
          createAnnotation: e,
          isSidebarOpen: n,
          newAnnotationType: o,
          showHighlights: r,
          toggleHighlights: s,
          toggleSidebar: l,
          toggleSidebarRef: c,
          useMinimalControls: u = !1,
        }) {
          return (0, i.createElement)(
            "div",
            null,
            u &&
              n &&
              (0, i.createElement)(a, {
                className: "annotator-toolbar__sidebar-close",
                label: "Close annotation sidebar",
                icon: "cancel",
                onClick: t,
              }),
            !u &&
              (0, i.createElement)(a, {
                className: "annotator-toolbar__sidebar-toggle",
                buttonRef: c,
                label: "Annotation sidebar",
                icon: n ? "caret-right" : "caret-left",
                expanded: n,
                onClick: l,
              }),
            !u &&
              (0, i.createElement)(
                "div",
                { className: "annotator-toolbar-buttonbar" },
                (0, i.createElement)(a, {
                  label: "Show highlights",
                  icon: r ? "show" : "hide",
                  selected: r,
                  onClick: s,
                }),
                (0, i.createElement)(a, {
                  label: "note" === o ? "New page note" : "New annotation",
                  icon: "note" === o ? "note" : "annotate",
                  onClick: e,
                })
              )
          );
        }
        (a.propTypes = {
          buttonRef: o.default.any,
          expanded: o.default.bool,
          className: o.default.string,
          label: o.default.string.isRequired,
          icon: o.default.string.isRequired,
          onClick: o.default.func.isRequired,
          selected: o.default.bool,
        }),
          (l.propTypes = {
            closeSidebar: o.default.func.isRequired,
            createAnnotation: o.default.func.isRequired,
            isSidebarOpen: o.default.bool.isRequired,
            newAnnotationType: o.default.oneOf(["annotation", "note"])
              .isRequired,
            showHighlights: o.default.bool.isRequired,
            toggleHighlights: o.default.func.isRequired,
            toggleSidebar: o.default.func.isRequired,
            toggleSidebarRef: o.default.any,
            useMinimalControls: o.default.bool,
          });
      },
      { "../../shared/components/svg-icon": 68, preact: 6, "prop-types": 9 },
    ],
    25: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (t) {
            if (!t.hasOwnProperty("hypothesisConfig")) return {};
            if ("function" != typeof t.hypothesisConfig) {
              const t =
                "https://h.readthedocs.io/projects/client/en/latest/publishers/config/#window.hypothesisConfig";
              return (
                console.warn("hypothesisConfig must be a function, see: " + t),
                {}
              );
            }
            return t.hypothesisConfig();
          });
      },
      {},
    ],
    26: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (t) {
            const e = (0, i.default)(t);
            return {
              annotations: e.annotations,
              assetRoot: e.hostPageSetting("assetRoot", {
                allowInBrowserExt: !0,
              }),
              branding: e.hostPageSetting("branding"),
              clientUrl: e.clientUrl,
              enableExperimentalNewNoteButton: e.hostPageSetting(
                "enableExperimentalNewNoteButton"
              ),
              experimental: e.hostPageSetting("experimental", {
                defaultValue: {},
              }),
              group: e.group,
              focus: e.hostPageSetting("focus"),
              theme: e.hostPageSetting("theme"),
              usernameUrl: e.hostPageSetting("usernameUrl"),
              onLayoutChange: e.hostPageSetting("onLayoutChange"),
              openSidebar: e.hostPageSetting("openSidebar", {
                allowInBrowserExt: !0,
                coerce: r.toBoolean,
              }),
              query: e.query,
              requestConfigFromFrame: e.hostPageSetting(
                "requestConfigFromFrame"
              ),
              services: e.hostPageSetting("services"),
              showHighlights: e.showHighlights,
              notebookAppUrl: e.notebookAppUrl,
              sidebarAppUrl: e.sidebarAppUrl,
              subFrameIdentifier: e.hostPageSetting("subFrameIdentifier", {
                allowInBrowserExt: !0,
              }),
              externalContainerSelector: e.hostPageSetting(
                "externalContainerSelector"
              ),
            };
          });
        var o,
          i = (o = t("./settings")) && o.__esModule ? o : { default: o },
          r = t("../../shared/type-coercions");
      },
      { "../../shared/type-coercions": 72, "./settings": 28 },
    ],
    27: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (t) {
            return !(t.startsWith("http://") || t.startsWith("https://"));
          });
      },
      {},
    ],
    28: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (t) {
            const e = (0, o.parseJsonConfig)(t.document),
              n = (0, i.default)(t);
            function s(e) {
              const n = t.document.querySelector(
                `link[type="application/annotator+html"][rel="${e}"]`
              );
              if (!n)
                throw new Error(
                  `No application/annotator+html (rel="${e}") link in the document`
                );
              if (!n.href)
                throw new Error(
                  `application/annotator+html (rel="${e}") link has no href`
                );
              return n.href;
            }
            function a(t, o = {}) {
              const i = o.allowInBrowserExt || !1,
                a = void 0 !== o.defaultValue,
                l = "function" == typeof o.coerce ? o.coerce : (t) => t;
              return !i && (0, r.default)(s("sidebar"))
                ? a
                  ? o.defaultValue
                  : null
                : n.hasOwnProperty(t)
                ? l(n[t])
                : e.hasOwnProperty(t)
                ? l(e[t])
                : a
                ? o.defaultValue
                : null;
            }
            return {
              get annotations() {
                return (
                  e.annotations ||
                  (function () {
                    const e = t.location.href.match(
                      /#annotations:([A-Za-z0-9_-]+)$/
                    );
                    return e ? e[1] : null;
                  })()
                );
              },
              get clientUrl() {
                return (function () {
                  const e = t.document.querySelector(
                    'link[type="application/annotator+javascript"][rel="hypothesis-client"]'
                  );
                  if (!e)
                    throw new Error(
                      'No application/annotator+javascript (rel="hypothesis-client") link in the document'
                    );
                  if (!e.href)
                    throw new Error(
                      'application/annotator+javascript (rel="hypothesis-client") link has no href'
                    );
                  return e.href;
                })();
              },
              get group() {
                return (
                  e.group ||
                  (function () {
                    const e = t.location.href.match(
                      /#annotations:group:([A-Za-z0-9_-]+)$/
                    );
                    return e ? e[1] : null;
                  })()
                );
              },
              get notebookAppUrl() {
                return s("notebook");
              },
              get showHighlights() {
                return (function () {
                  let t = a("showHighlights");
                  return (
                    null === t && (t = "always"),
                    "boolean" == typeof t ? (t ? "always" : "never") : t
                  );
                })();
              },
              get sidebarAppUrl() {
                return s("sidebar");
              },
              get query() {
                return (
                  e.query ||
                  (function () {
                    const e = t.location.href.match(
                      /#annotations:(query|q):(.+)$/i
                    );
                    if (e)
                      try {
                        return decodeURIComponent(e[2]);
                      } catch (n) {}
                    return null;
                  })()
                );
              },
              hostPageSetting: a,
            };
          });
        var o = t("../../boot/parse-json-config"),
          i = s(t("./config-func-settings-from")),
          r = s(t("./is-browser-extension"));
        function s(t) {
          return t && t.__esModule ? t : { default: t };
        }
      },
      {
        "../../boot/parse-json-config": 54,
        "./config-func-settings-from": 25,
        "./is-browser-extension": 27,
      },
    ],
    29: [
      function (t, e, n) {
        "use strict";
        function o(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function i(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.createSidebarConfig = function (t) {
            var e;
            const n = (function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2
                  ? o(Object(n), !0).forEach(function (e) {
                      i(t, e, n[e]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      t,
                      Object.getOwnPropertyDescriptors(n)
                    )
                  : o(Object(n)).forEach(function (e) {
                      Object.defineProperty(
                        t,
                        e,
                        Object.getOwnPropertyDescriptor(n, e)
                      );
                    });
              }
              return t;
            })({}, t);
            if (
              (null === (e = n.services) || void 0 === e ? void 0 : e.length) >
              0
            ) {
              const t = n.services[0];
              t.onLoginRequest && (t.onLoginRequestProvided = !0),
                t.onLogoutRequest && (t.onLogoutRequestProvided = !0),
                t.onSignupRequest && (t.onSignupRequestProvided = !0),
                t.onProfileRequest && (t.onProfileRequestProvided = !0),
                t.onHelpRequest && (t.onHelpRequestProvided = !0);
            }
            return (
              ["notebookAppUrl", "sidebarAppUrl", "pluginClasses"].forEach(
                (t) => delete n[t]
              ),
              n
            );
          });
      },
      {},
    ],
    30: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = t("tiny-emitter");
        function i(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function r(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        n.default = class {
          constructor(t, e) {
            (this.options = (function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2
                  ? i(Object(n), !0).forEach(function (e) {
                      r(t, e, n[e]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      t,
                      Object.getOwnPropertyDescriptors(n)
                    )
                  : i(Object(n)).forEach(function (e) {
                      Object.defineProperty(
                        t,
                        e,
                        Object.getOwnPropertyDescriptor(n, e)
                      );
                    });
              }
              return t;
            })({}, e)),
              (this.element = t);
            const n = t;
            let s = n._hypothesisEventBus;
            s || ((s = new o.TinyEmitter()), (n._hypothesisEventBus = s)),
              (this._eventBus = s),
              (this._subscriptions = []);
          }
          destroy() {
            for (let [t, e] of this._subscriptions) this._eventBus.off(t, e);
          }
          publish(t, e = []) {
            this._eventBus.emit(t, ...e);
          }
          subscribe(t, e) {
            this._eventBus.on(t, e), this._subscriptions.push([t, e]);
          }
          unsubscribe(t, e) {
            this._eventBus.off(t, e),
              (this._subscriptions = this._subscriptions.filter(
                ([n, o]) => n !== t || o !== e
              ));
          }
        };
      },
      { "tiny-emitter": 12 },
    ],
    31: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = r(t("../shared/bridge-events")),
          i = r(t("../shared/warn-once"));
        function r(t) {
          return t && t.__esModule ? t : { default: t };
        }
        let s = {};
        const a = (t) => {
          s = t || {};
        };
        var l = {
          init: function (t) {
            t.on(o.default.FEATURE_FLAGS_UPDATED, a);
          },
          reset: function () {
            a({});
          },
          flagEnabled: function (t) {
            return t in s
              ? s[t]
              : ((0, i.default)("looked up unknown feature", t), !1);
          },
        };
        n.default = l;
      },
      { "../shared/bridge-events": 65, "../shared/warn-once": 73 },
    ],
    32: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = n.DEBOUNCE_WAIT = void 0);
        var o,
          i = (o = t("lodash.debounce")) && o.__esModule ? o : { default: o },
          r = (function (t) {
            if (t && t.__esModule) return t;
            if (null === t || ("object" != typeof t && "function" != typeof t))
              return { default: t };
            var e = s();
            if (e && e.has(t)) return e.get(t);
            var n = {},
              o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var i in t)
              if (Object.prototype.hasOwnProperty.call(t, i)) {
                var r = o ? Object.getOwnPropertyDescriptor(t, i) : null;
                r && (r.get || r.set)
                  ? Object.defineProperty(n, i, r)
                  : (n[i] = t[i]);
              }
            return (n.default = t), e && e.set(t, n), n;
          })(t("./util/frame-util"));
        function s() {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap();
          return (
            (s = function () {
              return t;
            }),
            t
          );
        }
        n.DEBOUNCE_WAIT = 40;
        n.default = class {
          constructor(t) {
            (this._target = t),
              (this._handledFrames = []),
              (this._mutationObserver = new MutationObserver(
                (0, i.default)(() => {
                  this._discoverFrames();
                }, 40)
              ));
          }
          observe(t, e) {
            (this._onFrameAdded = t),
              (this._onFrameRemoved = e),
              this._discoverFrames(),
              this._mutationObserver.observe(this._target, {
                childList: !0,
                subtree: !0,
              });
          }
          disconnect() {
            this._mutationObserver.disconnect();
          }
          _addFrame(t) {
            r.isAccessible(t) &&
              r.isDocumentReady(t, () => {
                t.contentWindow.addEventListener("unload", () => {
                  this._removeFrame(t);
                }),
                  this._handledFrames.push(t),
                  this._onFrameAdded(t);
              });
          }
          _removeFrame(t) {
            this._onFrameRemoved(t),
              (this._handledFrames = this._handledFrames.filter(
                (e) => e !== t
              ));
          }
          _discoverFrames() {
            let t = r.findFrames(this._target);
            for (let e of t)
              this._handledFrames.includes(e) || this._addFrame(e);
            for (let e of ((t, e) => t.filter((t) => !e.includes(t)))(
              this._handledFrames,
              t
            ))
              this._removeFrame(e);
          }
        };
      },
      { "./util/frame-util": 51, "lodash.debounce": 5 },
    ],
    33: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = p(t("scroll-into-view")),
          i = p(t("./delegator")),
          r = t("./adder"),
          s = f(t("./anchoring/html")),
          a = t("./anchoring/text-range"),
          l = t("./highlighter"),
          c = f(t("./range-util")),
          u = t("./selection-observer"),
          h = t("./util/url");
        function d() {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap();
          return (
            (d = function () {
              return t;
            }),
            t
          );
        }
        function f(t) {
          if (t && t.__esModule) return t;
          if (null === t || ("object" != typeof t && "function" != typeof t))
            return { default: t };
          var e = d();
          if (e && e.has(t)) return e.get(t);
          var n = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in t)
            if (Object.prototype.hasOwnProperty.call(t, i)) {
              var r = o ? Object.getOwnPropertyDescriptor(t, i) : null;
              r && (r.get || r.set)
                ? Object.defineProperty(n, i, r)
                : (n[i] = t[i]);
            }
          return (n.default = t), e && e.set(t, n), n;
        }
        function p(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function g(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function m(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? g(Object(n), !0).forEach(function (e) {
                  _(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : g(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function _(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        function v(t) {
          return (0, l.getHighlightsContainingNode)(t)
            .map((t) => t._annotation)
            .filter((t) => void 0 !== t);
        }
        function y(t) {
          if (!t.range) return null;
          try {
            return t.range.toRange();
          } catch (e) {
            return null;
          }
        }
        class b extends i.default {
          constructor(t, e, n = s) {
            super(t, m(m({}, { Document: {} }), e)),
              (this.visibleHighlights = !1),
              (this.toolbar = null),
              (this.adderToolbar = document.createElement("hypothesis-adder")),
              (this.adderToolbar.style.display = "none"),
              this.element.appendChild(this.adderToolbar),
              (this.adderCtrl = new r.Adder(this.adderToolbar, {
                onAnnotate: () => {
                  this.createAnnotation(),
                    document.getSelection().removeAllRanges();
                },
                onHighlight: () => {
                  this.setVisibleHighlights(!0),
                    this.createHighlight(),
                    document.getSelection().removeAllRanges();
                },
                onShowAnnotations: (t) => {
                  this.selectAnnotations(t);
                },
              })),
              (this.selectionObserver = new u.SelectionObserver((t) => {
                t ? this._onSelection(t) : this._onClearSelection();
              })),
              (this.plugins = {}),
              (this.anchors = []),
              (this.frameIdentifier = e.subFrameIdentifier || null),
              (this.anchoring = n);
            const o = {
              config: e,
              on: (t, e) => {
                this.subscribe(t, e);
              },
              emit: (t, ...e) => {
                this.publish(t, e);
              },
            };
            this.addPlugin("CrossFrame", o),
              (this.crossframe = this.plugins.CrossFrame),
              this.crossframe.onConnect(() => this._setupInitialState(e)),
              (this.closeSidebarOnDocumentClick = !0),
              this._connectAnnotationSync(),
              this._connectAnnotationUISync(this.crossframe);
            for (let i of Object.keys(this.options)) {
              const t = this.options[i];
              !this.plugins[i] &&
                this.options.pluginClasses[i] &&
                this.addPlugin(i, t);
            }
            (this._elementEventListeners = []), this._setupElementEvents();
          }
          _setupElementEvents() {
            const t = (t, e) => {
                this.element.addEventListener(t, e),
                  this._elementEventListeners.push({ event: t, callback: e });
              },
              e = (t) => {
                var e;
                this.closeSidebarOnDocumentClick &&
                  !this.isEventInAnnotator(t) &&
                  (null === (e = this.crossframe) ||
                    void 0 === e ||
                    e.call("hideSidebar"));
              };
            t("click", (t) => {
              const n = v(t.target);
              if (n.length && this.visibleHighlights) {
                const e = t.metaKey || t.ctrlKey;
                this.selectAnnotations(n, e);
              } else e(t);
            }),
              t("touchstart", (t) => {
                v(t.target).length || e(t);
              }),
              t("mouseover", (t) => {
                const e = v(t.target);
                e.length && this.visibleHighlights && this.focusAnnotations(e);
              }),
              t("mouseout", () => {
                this.visibleHighlights && this.focusAnnotations([]);
              });
          }
          _removeElementEvents() {
            this._elementEventListeners.forEach(({ event: t, callback: e }) => {
              this.element.removeEventListener(t, e);
            });
          }
          addPlugin(t, e) {
            const n = this.options.pluginClasses[t];
            this.plugins[t] = new n(this.element, e, this);
          }
          getDocumentInfo() {
            let t, e;
            return (
              this.plugins.PDF
                ? ((t = Promise.resolve(this.plugins.PDF.getMetadata())),
                  (e = Promise.resolve(this.plugins.PDF.uri())))
                : this.plugins.Document
                ? ((e = Promise.resolve(this.plugins.Document.uri())),
                  (t = Promise.resolve(this.plugins.Document.metadata)))
                : ((e = Promise.reject()), (t = Promise.reject())),
              (e = e.catch(() => decodeURIComponent(window.location.href))),
              (t = t.catch(() => ({
                title: document.title,
                link: [{ href: decodeURIComponent(window.location.href) }],
              }))),
              Promise.all([t, e]).then(([t, e]) => ({
                uri: (0, h.normalizeURI)(e),
                metadata: t,
                frameIdentifier: this.frameIdentifier,
              }))
            );
          }
          _setupInitialState(t) {
            this.publish("panelReady"),
              this.setVisibleHighlights("always" === t.showHighlights);
          }
          _connectAnnotationSync() {
            this.subscribe("annotationDeleted", (t) => {
              this.detach(t);
            }),
              this.subscribe("annotationsLoaded", (t) => {
                t.map((t) => this.anchor(t));
              });
          }
          _connectAnnotationUISync(t) {
            t.on("focusAnnotations", (t = []) => {
              for (let e of this.anchors)
                if (e.highlights) {
                  const n = t.includes(e.annotation.$tag);
                  (0, l.setHighlightsFocused)(e.highlights, n);
                }
            }),
              t.on("scrollToAnnotation", (t) => {
                for (let e of this.anchors)
                  if (e.highlights && e.annotation.$tag === t) {
                    const t = y(e);
                    if (!t) continue;
                    const n = new CustomEvent("scrolltorange", {
                      bubbles: !0,
                      cancelable: !0,
                      detail: t,
                    });
                    this.element.dispatchEvent(n) &&
                      (0, o.default)(e.highlights[0]);
                  }
              }),
              t.on("getDocumentInfo", (t) => {
                this.getDocumentInfo()
                  .then((e) => t(null, e))
                  .catch((e) => t(e));
              }),
              t.on("setVisibleHighlights", (t) => {
                this.setVisibleHighlights(t);
              });
          }
          destroy() {
            this._removeElementEvents(),
              this.selectionObserver.disconnect(),
              this.adderToolbar.remove(),
              (0, l.removeAllHighlights)(this.element);
            for (let t of Object.keys(this.plugins)) this.plugins[t].destroy();
            super.destroy();
          }
          anchor(t) {
            let e;
            const n = this.element,
              o = [],
              i = [];
            let r = [];
            t.target || (t.target = []);
            const s = (e) =>
                e.selector &&
                e.selector.some((t) => "TextQuoteSelector" === t.type)
                  ? this.anchoring
                      .anchor(n, e.selector)
                      .then((n) => ({
                        annotation: t,
                        target: e,
                        range: a.TextRange.fromRange(n),
                      }))
                      .catch(() => ({ annotation: t, target: e }))
                  : Promise.resolve({ annotation: t, target: e }),
              c = (t) => {
                const e = y(t);
                if (!e) return t;
                const n = (0, l.highlightRange)(e);
                return (
                  n.forEach((e) => {
                    e._annotation = t.annotation;
                  }),
                  (t.highlights = n),
                  t
                );
              };
            for (e of this.anchors.splice(0, this.anchors.length))
              e.annotation === t
                ? e.range && t.target.includes(e.target)
                  ? (o.push(e), i.push(e.target))
                  : e.highlights &&
                    ((r = r.concat(e.highlights)),
                    delete e.highlights,
                    delete e.range)
                : this.anchors.push(e);
            (0, l.removeHighlights)(r);
            for (let a of t.target)
              i.includes(a) || ((e = s(a).then(c)), o.push(e));
            return Promise.all(o).then((e) => {
              var n, o;
              let i = !1,
                r = !1;
              for (let t of e)
                if (t.target.selector && ((i = !0), t.range)) {
                  r = !0;
                  break;
                }
              return (
                (t.$orphan = i && !r),
                (this.anchors = this.anchors.concat(e)),
                null === (n = this.plugins.BucketBar) ||
                  void 0 === n ||
                  n.update(),
                null === (o = this.plugins.CrossFrame) ||
                  void 0 === o ||
                  o.sync([t]),
                e
              );
            });
          }
          detach(t) {
            var e;
            const n = [];
            let o = [];
            for (let r of this.anchors) {
              var i;
              r.annotation === t
                ? o.push(
                    ...(null !== (i = r.highlights) && void 0 !== i ? i : [])
                  )
                : n.push(r);
            }
            (this.anchors = n),
              (0, l.removeHighlights)(o),
              null === (e = this.plugins.BucketBar) ||
                void 0 === e ||
                e.update();
          }
          createAnnotation(t = {}) {
            var e;
            const n = this.element,
              o = null !== (e = this.selectedRanges) && void 0 !== e ? e : [];
            this.selectedRanges = null;
            const i = this.getDocumentInfo();
            i.then((e) => {
              (t.document = e.metadata), (t.uri = e.uri);
            });
            const r = Promise.all(o.map((t) => this.anchoring.describe(n, t))),
              s = Promise.all([i, r]).then(([e, n]) => {
                const o = e.uri;
                t.target = n.map((t) => ({ source: o, selector: t }));
              });
            var a;
            return (
              s.then(() => this.publish("beforeAnnotationCreated", [t])),
              s.then(() => this.anchor(t)),
              t.$highlight ||
                null === (a = this.crossframe) ||
                void 0 === a ||
                a.call("showSidebar"),
              t
            );
          }
          createHighlight() {
            return this.createAnnotation({ $highlight: !0 });
          }
          showAnnotations(t) {
            var e, n;
            const o = t.map((t) => t.$tag);
            null === (e = this.crossframe) ||
              void 0 === e ||
              e.call("showAnnotations", o),
              null === (n = this.crossframe) ||
                void 0 === n ||
                n.call("showSidebar");
          }
          toggleAnnotationSelection(t) {
            var e;
            const n = t.map((t) => t.$tag);
            null === (e = this.crossframe) ||
              void 0 === e ||
              e.call("toggleAnnotationSelection", n);
          }
          focusAnnotations(t) {
            var e;
            const n = t.map((t) => t.$tag);
            null === (e = this.crossframe) ||
              void 0 === e ||
              e.call("focusAnnotations", n);
          }
          _onSelection(t) {
            const e = document.getSelection(),
              n = c.isSelectionBackwards(e),
              o = c.selectionFocusRect(e);
            o
              ? ((this.selectedRanges = [t]),
                this.toolbar && (this.toolbar.newAnnotationType = "annotation"),
                (this.adderCtrl.annotationsForSelection = (function () {
                  const t = window.getSelection().getRangeAt(0);
                  return c.itemsForRange(t, (t) => t._annotation);
                })()),
                this.adderCtrl.show(o, n))
              : this._onClearSelection();
          }
          _onClearSelection() {
            this.adderCtrl.hide(),
              (this.selectedRanges = []),
              this.toolbar && (this.toolbar.newAnnotationType = "note");
          }
          selectAnnotations(t, e = !1) {
            e ? this.toggleAnnotationSelection(t) : this.showAnnotations(t);
          }
          isEventInAnnotator(t) {
            return null !== t.target.closest(".annotator-frame");
          }
          setVisibleHighlights(t) {
            (0, l.setHighlightsVisible)(this.element, t),
              (this.visibleHighlights = t),
              this.toolbar && (this.toolbar.highlightsVisible = t);
          }
        }
        n.default = b;
      },
      {
        "./adder": 13,
        "./anchoring/html": 14,
        "./anchoring/text-range": 17,
        "./delegator": 30,
        "./highlighter": 34,
        "./range-util": 45,
        "./selection-observer": 46,
        "./util/url": 53,
        "scroll-into-view": 11,
      },
    ],
    34: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.highlightRange = function (t, e = "hypothesis-highlight") {
            const n = (function (t) {
                if (t.collapsed) return [];
                let e = t.commonAncestorContainer;
                if (
                  (e.nodeType !== Node.ELEMENT_NODE && (e = e.parentElement),
                  !e)
                )
                  return [];
                const n = [],
                  i = e.ownerDocument.createNodeIterator(
                    e,
                    NodeFilter.SHOW_TEXT
                  );
                let r;
                for (; (r = i.nextNode()); ) {
                  if (!(0, o.isNodeInRange)(t, r)) continue;
                  let e = r;
                  e === t.startContainer && t.startOffset > 0
                    ? e.splitText(t.startOffset)
                    : (e === t.endContainer &&
                        t.endOffset < e.data.length &&
                        e.splitText(t.endOffset),
                      n.push(e));
                }
                return n;
              })(t),
              r =
                n.length > 0 &&
                null !== n[0].parentNode.closest(".annotator-placeholder");
            let s = [],
              a = null,
              l = null;
            n.forEach((t) => {
              a && a.nextSibling === t ? l.push(t) : ((l = [t]), s.push(l)),
                (a = t);
            });
            const c = /^\s*$/;
            s = s.filter((t) => t.some((t) => !c.test(t.nodeValue)));
            const u = [];
            return (
              s.forEach((t) => {
                const n = document.createElement("hypothesis-highlight");
                if (
                  ((n.className = e),
                  t[0].parentNode.replaceChild(n, t[0]),
                  t.forEach((t) => n.appendChild(t)),
                  !r)
                ) {
                  const t = (function (t) {
                    const e = (function (t) {
                      const e = t.closest(".page");
                      if (!e) return null;
                      return e.querySelector(".canvasWrapper > canvas") || null;
                    })(t);
                    if (!e || !e.parentElement) return null;
                    let n = e.parentElement.querySelector(
                      ".hypothesis-highlight-layer"
                    );
                    const o = (function (t, e) {
                      return (
                        "function" == typeof CSS &&
                        "function" == typeof CSS.supports &&
                        CSS.supports(t, e)
                      );
                    })("mix-blend-mode", "multiply");
                    if (!n) {
                      (n = document.createElementNS(i, "svg")),
                        n.setAttribute("class", "hypothesis-highlight-layer"),
                        e.parentElement.appendChild(n),
                        (e.parentElement.style.position = "relative");
                      const t = n.style;
                      (t.position = "absolute"),
                        (t.left = "0"),
                        (t.top = "0"),
                        (t.width = "100%"),
                        (t.height = "100%"),
                        o ? (t.mixBlendMode = "multiply") : (t.opacity = "0.3");
                    }
                    const r = e.getBoundingClientRect(),
                      s = t.getBoundingClientRect(),
                      a = document.createElementNS(i, "rect");
                    return (
                      a.setAttribute("x", (s.left - r.left).toString()),
                      a.setAttribute("y", (s.top - r.top).toString()),
                      a.setAttribute("width", s.width.toString()),
                      a.setAttribute("height", s.height.toString()),
                      o
                        ? a.setAttribute("class", "hypothesis-svg-highlight")
                        : a.setAttribute(
                            "class",
                            "hypothesis-svg-highlight is-opaque"
                          ),
                      n.appendChild(a),
                      a
                    );
                  })(n);
                  t &&
                    ((n.className += " is-transparent"), (n.svgHighlight = t));
                }
                u.push(n);
              }),
              u
            );
          }),
          (n.removeAllHighlights = function (t) {
            s(Array.from(t.querySelectorAll("hypothesis-highlight")));
          }),
          (n.removeHighlights = s),
          (n.setHighlightsFocused = function (t, e) {
            t.forEach((t) =>
              t.classList.toggle("hypothesis-highlight-focused", e)
            );
          }),
          (n.setHighlightsVisible = function (t, e) {
            t.classList.toggle("hypothesis-highlights-always-on", e);
          }),
          (n.getHighlightsContainingNode = function (t) {
            let e = t.nodeType === Node.ELEMENT_NODE ? t : t.parentElement;
            const n = [];
            for (; e; )
              e.classList.contains("hypothesis-highlight") && n.push(e),
                (e = e.parentElement);
            return n;
          }),
          (n.getBoundingClientRect = function (t) {
            return t
              .map((t) => t.getBoundingClientRect())
              .reduce((t, e) => ({
                top: Math.min(t.top, e.top),
                left: Math.min(t.left, e.left),
                bottom: Math.max(t.bottom, e.bottom),
                right: Math.max(t.right, e.right),
              }));
          });
        var o = t("./range-util");
        const i = "http://www.w3.org/2000/svg";
        function r(t, e) {
          const n = t.parentNode;
          e.forEach((e) => n.insertBefore(e, t)), t.remove();
        }
        function s(t) {
          for (let e of t)
            e.parentNode && r(e, Array.from(e.childNodes)),
              e.svgHighlight && e.svgHighlight.remove();
        }
      },
      { "./range-util": 45 },
    ],
    35: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = {
          annotate: t("../images/icons/annotate.svg"),
          cancel: t("../images/icons/cancel.svg"),
          caution: t("../images/icons/caution.svg"),
          "caret-left": t("../images/icons/caret-left.svg"),
          "caret-right": t("../images/icons/caret-right.svg"),
          hide: t("../images/icons/hide.svg"),
          highlight: t("../images/icons/highlight.svg"),
          note: t("../images/icons/note.svg"),
          pointer: t("../images/icons/pointer.svg"),
          show: t("../images/icons/show.svg"),
        };
        n.default = o;
      },
      {
        "../images/icons/annotate.svg": 55,
        "../images/icons/cancel.svg": 56,
        "../images/icons/caret-left.svg": 57,
        "../images/icons/caret-right.svg": 58,
        "../images/icons/caution.svg": 59,
        "../images/icons/hide.svg": 60,
        "../images/icons/highlight.svg": 61,
        "../images/icons/note.svg": 62,
        "../images/icons/pointer.svg": 63,
        "../images/icons/show.svg": 64,
      },
    ],
    36: [
      function (t, e, n) {
        "use strict";
        t("focus-visible");
        var o = t("../shared/components/svg-icon"),
          i = p(t("./icons")),
          r = p(t("./config/index")),
          s = p(t("./plugin/bucket-bar")),
          a = p(t("./plugin/cross-frame")),
          l = p(t("./plugin/document")),
          c = p(t("./guest")),
          u = p(t("./notebook")),
          h = p(t("./plugin/pdf")),
          d = p(t("./pdf-sidebar")),
          f = p(t("./sidebar"));
        function p(t) {
          return t && t.__esModule ? t : { default: t };
        }
        (0, o.registerIcons)(i.default);
        const g = {
            BucketBar: s.default,
            PDF: h.default,
            Document: l.default,
            CrossFrame: a.default,
          },
          m = window,
          _ = document.querySelector(
            'link[type="application/annotator+html"][rel="sidebar"]'
          ),
          v = (0, r.default)(window);
        new Promise((t) => {
          "loading" !== document.readyState && t(),
            document.addEventListener("readystatechange", () => t());
        }).then(function () {
          const t = void 0 !== m.PDFViewerApplication;
          let e = t ? d.default : f.default;
          v.subFrameIdentifier &&
            (t && (v.PDF = {}), (e = c.default), (m.__hypothesis_frame = !0)),
            (v.pluginClasses = g);
          const n = new e(document.body, v),
            o = new u.default(document.body, v);
          _.addEventListener("destroy", function () {
            n.destroy(),
              o.destroy(),
              document
                .querySelectorAll("[data-hypothesis-asset]")
                .forEach((t) => t.remove());
          });
        });
      },
      {
        "../shared/components/svg-icon": 68,
        "./config/index": 26,
        "./guest": 33,
        "./icons": 35,
        "./notebook": 37,
        "./pdf-sidebar": 38,
        "./plugin/bucket-bar": 40,
        "./plugin/cross-frame": 41,
        "./plugin/document": 42,
        "./plugin/pdf": 44,
        "./sidebar": 48,
        "focus-visible": 3,
      },
    ],
    37: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o,
          i = (o = t("./delegator")) && o.__esModule ? o : { default: o },
          r = t("./config/sidebar");
        class s extends i.default {
          constructor(t, e) {
            super(t, e),
              (this.frame = null),
              (this._groupId = null),
              (this._prevGroupId = null),
              (this.container = document.createElement("hypothesis-notebook")),
              (this.container.style.display = "none"),
              (this.container.className = "notebook-outer"),
              this.subscribe("showNotebook", (t) => {
                (this._groupId = t), this.show();
              }),
              this.subscribe("hideNotebook", () => this.hide()),
              this.subscribe("sidebarOpened", () => this.hide());
          }
          _update() {
            const t =
              !this.frame ||
              !this._prevGroupId ||
              this._prevGroupId !== this._groupId;
            var e;
            (this._prevGroupId = this._groupId),
              t &&
                (null === (e = this.frame) || void 0 === e || e.remove(),
                (this.frame = (function (t, e) {
                  const n = (0, r.createSidebarConfig)(t);
                  n.group = e;
                  const o = "config=" + encodeURIComponent(JSON.stringify(n)),
                    i = t.notebookAppUrl + "#" + o,
                    s = document.createElement("iframe");
                  return (
                    s.setAttribute("allowfullscreen", ""),
                    (s.src = i),
                    (s.title = "Hypothesis annotation notebook"),
                    (s.className = "notebook-inner"),
                    s
                  );
                })(this.options, this._groupId)),
                this.container.appendChild(this.frame),
                this.element.appendChild(this.container));
          }
          show() {
            this._update(),
              this.container.classList.add("is-open"),
              (this.container.style.display = "");
          }
          hide() {
            this.container.classList.remove("is-open"),
              (this.container.style.display = "none");
          }
          destroy() {
            var t;
            null === (t = this.frame) || void 0 === t || t.remove();
          }
        }
        n.default = s;
      },
      { "./config/sidebar": 29, "./delegator": 30 },
    ],
    38: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o,
          i = (o = t("./sidebar")) && o.__esModule ? o : { default: o };
        function r(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function s(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? r(Object(n), !0).forEach(function (e) {
                  a(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : r(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function a(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        const l = {
          PDF: {},
          BucketBar: {
            container: ".annotator-frame",
            scrollables: ["#viewerContainer"],
          },
        };
        class c extends i.default {
          constructor(t, e) {
            var n, o, i;
            super(t, s(s({}, l), e)),
              (this._lastSidebarLayoutState = {
                expanded: !1,
                width: 0,
                height: 0,
              }),
              (this.window = window),
              (this.pdfViewer =
                null === (n = this.window.PDFViewerApplication) || void 0 === n
                  ? void 0
                  : n.pdfViewer),
              (this.pdfContainer =
                null === (o = this.window.PDFViewerApplication) ||
                void 0 === o ||
                null === (i = o.appConfig) ||
                void 0 === i
                  ? void 0
                  : i.appContainer),
              (this.sideBySideActive = !1),
              this.subscribe("sidebarLayoutChanged", (t) =>
                this.fitSideBySide(t)
              ),
              this.window.addEventListener("resize", () =>
                this.fitSideBySide()
              );
          }
          activateSideBySide(t) {
            (this.sideBySideActive = !0),
              (this.closeSidebarOnDocumentClick = !1),
              (this.pdfContainer.style.width = t + "px"),
              this.pdfContainer.classList.add("hypothesis-side-by-side");
          }
          deactivateSideBySide() {
            (this.sideBySideActive = !1),
              (this.closeSidebarOnDocumentClick = !0),
              (this.pdfContainer.style.width = "auto"),
              this.pdfContainer.classList.remove("hypothesis-side-by-side");
          }
          fitSideBySide(t) {
            t || (t = this._lastSidebarLayoutState);
            const e = this.window.innerWidth - t.width;
            t.expanded && e >= 680
              ? this.activateSideBySide(e)
              : this.deactivateSideBySide();
            const n = this.pdfViewer.currentScaleValue;
            ("auto" !== n && "page-fit" !== n && "page-width" !== n) ||
              (this.pdfViewer.currentScaleValue = n),
              this.pdfViewer.update(),
              (this._lastSidebarLayoutState = t);
          }
        }
        n.default = c;
      },
      { "./sidebar": 48 },
    ],
    39: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = { INITIAL: 0, RUNNING: 1, PAUSED: 2, FINISHED: 3 };
        n.default = o;
      },
      {},
    ],
    40: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = a(t("../delegator")),
          i = t("preact"),
          r = a(t("../components/buckets")),
          s = t("../util/buckets");
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function l(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function c(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? l(Object(n), !0).forEach(function (e) {
                  u(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : l(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function u(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        class h extends o.default {
          constructor(t, e, n) {
            const o = c(c({}, { scrollables: [] }), e),
              i = document.createElement("div");
            (i.className = "annotator-bucket-bar"),
              super(i, o),
              (this.annotator = n);
            let r = t;
            if (this.options.container) {
              const t = document.querySelector(this.options.container);
              t
                ? (r = t)
                : console.warn(
                    `Unable to find container element for selector '${this.options.container}'`
                  );
            }
            r.appendChild(this.element),
              (this.updateFunc = () => this.update()),
              window.addEventListener("resize", this.updateFunc),
              window.addEventListener("scroll", this.updateFunc),
              this.options.scrollables.forEach((t) => {
                const e = document.querySelector(t);
                null == e || e.addEventListener("scroll", this.updateFunc);
              });
          }
          destroy() {
            window.removeEventListener("resize", this.updateFunc),
              window.removeEventListener("scroll", this.updateFunc),
              this.options.scrollables.forEach((t) => {
                const e = document.querySelector(t);
                null == e || e.removeEventListener("scroll", this.updateFunc);
              });
          }
          update() {
            this._updatePending ||
              ((this._updatePending = !0),
              requestAnimationFrame(() => {
                this._update(), (this._updatePending = !1);
              }));
          }
          _update() {
            const t = (0, s.anchorBuckets)(this.annotator.anchors);
            (0, i.render)(
              (0, i.createElement)(r.default, {
                above: t.above,
                below: t.below,
                buckets: t.buckets,
                onSelectAnnotations: (t, e) =>
                  this.annotator.selectAnnotations(t, e),
              }),
              this.element
            );
          }
        }
        n.default = h;
      },
      {
        "../components/buckets": 23,
        "../delegator": 30,
        "../util/buckets": 50,
        preact: 6,
      },
    ],
    41: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = u(t("../annotation-sync")),
          i = u(t("../../shared/bridge")),
          r = u(t("../delegator")),
          s = u(t("../../shared/discovery")),
          a = (function (t) {
            if (t && t.__esModule) return t;
            if (null === t || ("object" != typeof t && "function" != typeof t))
              return { default: t };
            var e = c();
            if (e && e.has(t)) return e.get(t);
            var n = {},
              o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var i in t)
              if (Object.prototype.hasOwnProperty.call(t, i)) {
                var r = o ? Object.getOwnPropertyDescriptor(t, i) : null;
                r && (r.get || r.set)
                  ? Object.defineProperty(n, i, r)
                  : (n[i] = t[i]);
              }
            return (n.default = t), e && e.set(t, n), n;
          })(t("../util/frame-util")),
          l = u(t("../frame-observer"));
        function c() {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap();
          return (
            (c = function () {
              return t;
            }),
            t
          );
        }
        function u(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function h(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function d(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? h(Object(n), !0).forEach(function (e) {
                  f(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : h(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function f(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        class p extends r.default {
          constructor(t, e) {
            super(t, e);
            const { config: n, server: r, on: c, emit: u } = e,
              h = new s.default(window, { server: r }),
              f = new i.default(),
              p = new o.default(f, { on: c, emit: u }),
              g = new l.default(t),
              m = new Map();
            h.startDiscovery((t, e, n) => f.createChannel(t, e, n)),
              g.observe(
                (t) => {
                  if (a.hasHypothesis(t)) return;
                  const { clientUrl: e } = n;
                  a.isLoaded(t, () => {
                    const o = h.generateToken();
                    m.set(t, o);
                    const i = d(d({}, n), {}, { subFrameIdentifier: o });
                    a.injectHypothesis(t, e, i);
                  });
                },
                (t) => {
                  f.call("destroyFrame", m.get(t)), m.delete(t);
                }
              ),
              (this.destroy = () => {
                f.destroy(), h.stopDiscovery(), g.disconnect(), super.destroy();
              }),
              (this.sync = (t) => p.sync(t)),
              (this.on = (t, e) => f.on(t, e)),
              (this.call = (t, ...e) => f.call(t, ...e)),
              (this.onConnect = (t) => f.onConnect(t));
          }
        }
        n.default = p;
      },
      {
        "../../shared/bridge": 66,
        "../../shared/discovery": 69,
        "../annotation-sync": 21,
        "../delegator": 30,
        "../frame-observer": 32,
        "../util/frame-util": 51,
      },
    ],
    42: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o,
          i = (o = t("../delegator")) && o.__esModule ? o : { default: o },
          r = t("../util/url");
        function s() {
          return {
            title: document.title,
            link: [],
            dc: {},
            eprints: {},
            facebook: {},
            highwire: {},
            prism: {},
            twitter: {},
          };
        }
        class a extends i.default {
          constructor(t, e) {
            super(t, e),
              (this.metadata = s()),
              (this.baseURI = e.baseURI || document.baseURI),
              (this.document = e.document || document),
              (this.normalizeURI = e.normalizeURI || r.normalizeURI),
              (this.beforeAnnotationCreated = (t) => {
                t.document = this.metadata;
              }),
              this.subscribe(
                "beforeAnnotationCreated",
                this.beforeAnnotationCreated
              ),
              this.getDocumentMetadata();
          }
          destroy() {
            this.unsubscribe(
              "beforeAnnotationCreated",
              this.beforeAnnotationCreated
            );
          }
          uri() {
            let t = decodeURIComponent(this._getDocumentHref());
            for (let e of this.metadata.link)
              "canonical" === e.rel && (t = e.href);
            return t;
          }
          uris() {
            const t = {};
            for (let e of this.metadata.link) e.href && (t[e.href] = !0);
            return Object.keys(t);
          }
          getDocumentMetadata() {
            return (
              (this.metadata = s()),
              this._getHighwire(),
              this._getDublinCore(),
              this._getFacebook(),
              this._getEprints(),
              this._getPrism(),
              this._getTwitter(),
              this._getFavicon(),
              this._getTitle(),
              this._getLinks(),
              this.metadata
            );
          }
          _getHighwire() {
            this.metadata.highwire = this._getMetaTags("citation", "name", "_");
          }
          _getFacebook() {
            this.metadata.facebook = this._getMetaTags("og", "property", ":");
          }
          _getTwitter() {
            this.metadata.twitter = this._getMetaTags("twitter", "name", ":");
          }
          _getDublinCore() {
            this.metadata.dc = this._getMetaTags("dc", "name", ".");
          }
          _getPrism() {
            this.metadata.prism = this._getMetaTags("prism", "name", ".");
          }
          _getEprints() {
            this.metadata.eprints = this._getMetaTags("eprints", "name", ".");
          }
          _getMetaTags(t, e, n) {
            const o = {};
            for (let i of Array.from(this.document.querySelectorAll("meta"))) {
              const r = i.getAttribute(e),
                { content: s } = i;
              if (r) {
                const e = r.match(RegExp(`^${t}${n}(.+)$`, "i"));
                if (e) {
                  const t = e[1];
                  o[t] ? o[t].push(s) : (o[t] = [s]);
                }
              }
            }
            return o;
          }
          _getTitle() {
            this.metadata.highwire.title
              ? (this.metadata.title = this.metadata.highwire.title[0])
              : this.metadata.eprints.title
              ? (this.metadata.title = this.metadata.eprints.title[0])
              : this.metadata.prism.title
              ? (this.metadata.title = this.metadata.prism.title[0])
              : this.metadata.facebook.title
              ? (this.metadata.title = this.metadata.facebook.title[0])
              : this.metadata.twitter.title
              ? (this.metadata.title = this.metadata.twitter.title[0])
              : this.metadata.dc.title
              ? (this.metadata.title = this.metadata.dc.title[0])
              : (this.metadata.title = this.document.title);
          }
          _getLinks() {
            this.metadata.link = [{ href: this._getDocumentHref() }];
            const t = Array.from(this.document.querySelectorAll("link"));
            for (let i of t)
              if (
                ["alternate", "canonical", "bookmark", "shortlink"].includes(
                  i.rel
                )
              ) {
                if ("alternate" === i.rel) {
                  if (i.type && i.type.match(/^application\/(rss|atom)\+xml/))
                    continue;
                  if (i.hreflang) continue;
                }
                try {
                  const t = this._absoluteUrl(i.href);
                  this.metadata.link.push({
                    href: t,
                    rel: i.rel,
                    type: i.type,
                  });
                } catch (o) {}
              }
            for (let i of Object.keys(this.metadata.highwire)) {
              const t = this.metadata.highwire[i];
              if ("pdf_url" === i)
                for (let e of t)
                  try {
                    this.metadata.link.push({
                      href: this._absoluteUrl(e),
                      type: "application/pdf",
                    });
                  } catch (o) {}
              if ("doi" === i)
                for (let e of t)
                  "doi:" !== e.slice(0, 4) && (e = `doi:${e}`),
                    this.metadata.link.push({ href: e });
            }
            for (let i of Object.keys(this.metadata.dc)) {
              const t = this.metadata.dc[i];
              if ("identifier" === i)
                for (let e of t)
                  "doi:" === e.slice(0, 4) &&
                    this.metadata.link.push({ href: e });
            }
            const e = this.metadata.dc["relation.ispartof"],
              n = this.metadata.dc.identifier;
            if (e && n) {
              const t = e[e.length - 1],
                o = n[n.length - 1],
                i =
                  "urn:x-dc:" +
                  encodeURIComponent(t) +
                  "/" +
                  encodeURIComponent(o);
              this.metadata.link.push({ href: i }),
                (this.metadata.documentFingerprint = i);
            }
          }
          _getFavicon() {
            for (let t of Array.from(this.document.querySelectorAll("link")))
              if (["shortcut icon", "icon"].includes(t.rel))
                try {
                  this.metadata.favicon = this._absoluteUrl(t.href);
                } catch (o) {}
          }
          _absoluteUrl(t) {
            return this.normalizeURI(t, this.baseURI);
          }
          _getDocumentHref() {
            const { href: t } = this.document.location,
              e = ["http:", "https:", "file:"],
              n = new URL(t).protocol;
            return e.includes(n)
              ? t
              : this.baseURI && e.includes(new URL(this.baseURI).protocol)
              ? this.baseURI
              : t;
          }
        }
        n.default = a;
      },
      { "../delegator": 30, "../util/url": 53 },
    ],
    43: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = t("../util/url");
        function i(t) {
          return "urn:x-pdf:" + String(t);
        }
        function r(t) {
          const e = (0, o.normalizeURI)(t.url);
          return 0 !== e.indexOf("file://") ? e : null;
        }
        n.default = class {
          constructor(t) {
            this._loaded = (function (t) {
              return t.initializedPromise
                ? t.initializedPromise
                : t.initialized
                ? Promise.resolve()
                : new Promise((e) => {
                    const n = setInterval(() => {
                      t.initialized && (clearTimeout(n), e());
                    }, 5);
                  });
            })(t).then(() =>
              t.downloadComplete
                ? t
                : new Promise((e) => {
                    const n = () => {
                      t.eventBus
                        ? (t.eventBus.off("documentload", n),
                          t.eventBus.off("documentloaded", n))
                        : window.removeEventListener("documentload", n),
                        e(t);
                    };
                    t.eventBus
                      ? (t.eventBus.on("documentloaded", n),
                        t.eventBus.on("documentload", n))
                      : window.addEventListener("documentload", n);
                  })
            );
          }
          getUri() {
            return this._loaded.then((t) => {
              let e = r(t);
              return e || (e = i(t.pdfDocument.fingerprint)), e;
            });
          }
          getMetadata() {
            return this._loaded.then((t) => {
              let e = document.title;
              t.metadata &&
              t.metadata.has("dc:title") &&
              "Untitled" !== t.metadata.get("dc:title")
                ? (e = t.metadata.get("dc:title"))
                : t.documentInfo &&
                  t.documentInfo.Title &&
                  (e = t.documentInfo.Title);
              const n = [{ href: i(t.pdfDocument.fingerprint) }],
                o = r(t);
              return (
                o && n.push({ href: o }),
                {
                  title: e,
                  link: n,
                  documentFingerprint: t.pdfDocument.fingerprint,
                }
              );
            });
          }
        };
      },
      { "../util/url": 53 },
    ],
    44: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = h(t("lodash.debounce")),
          i = t("preact"),
          r = (function (t) {
            if (t && t.__esModule) return t;
            if (null === t || ("object" != typeof t && "function" != typeof t))
              return { default: t };
            var e = u();
            if (e && e.has(t)) return e.get(t);
            var n = {},
              o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var i in t)
              if (Object.prototype.hasOwnProperty.call(t, i)) {
                var r = o ? Object.getOwnPropertyDescriptor(t, i) : null;
                r && (r.get || r.set)
                  ? Object.defineProperty(n, i, r)
                  : (n[i] = t[i]);
              }
            return (n.default = t), e && e.set(t, n), n;
          })(t("../anchoring/pdf")),
          s = h(t("../delegator")),
          a = h(t("../pdfjs-rendering-states")),
          l = h(t("./pdf-metadata")),
          c = h(t("../../shared/components/svg-icon"));
        function u() {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap();
          return (
            (u = function () {
              return t;
            }),
            t
          );
        }
        function h(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function d() {
          return (0, i.createElement)(
            i.Fragment,
            null,
            (0, i.createElement)(
              "div",
              { className: "annotator-pdf-warning-banner__type" },
              (0, i.createElement)(c.default, {
                name: "caution",
                className: "annotator-pdf-warning-banner__icon",
              })
            ),
            (0, i.createElement)(
              "div",
              { className: "annotator-pdf-warning-banner__message" },
              (0, i.createElement)(
                "strong",
                null,
                "This PDF does not contain selectable text:"
              ),
              " ",
              (0, i.createElement)(
                "a",
                {
                  target: "_blank",
                  rel: "noreferrer",
                  href:
                    "https://web.hypothes.is/help/how-to-ocr-optimize-pdfs/",
                },
                "Learn how to fix this"
              ),
              " ",
              "in order to annotate with Hypothesis."
            )
          );
        }
        class f extends s.default {
          constructor(t, e, n) {
            super(t, e), (this.annotator = n), (n.anchoring = r);
            const i = window;
            (this.pdfViewer = i.PDFViewerApplication.pdfViewer),
              this.pdfViewer.viewer.classList.add("has-transparent-text-layer"),
              (this.pdfMetadata = new l.default(i.PDFViewerApplication)),
              (this.observer = new MutationObserver(
                (0, o.default)(() => this._update(), 100)
              )),
              this.observer.observe(this.pdfViewer.viewer, {
                attributes: !0,
                attributeFilter: ["data-loaded"],
                childList: !0,
                subtree: !0,
              }),
              (this._warningBanner = null),
              this._checkForSelectableText(),
              (this._updateAnnotationLayerVisibility = () => {
                const t = i.getSelection();
                this.pdfViewer.viewer.classList.toggle(
                  "is-selecting",
                  !t.isCollapsed
                );
              }),
              document.addEventListener(
                "selectionchange",
                this._updateAnnotationLayerVisibility
              );
          }
          destroy() {
            document.removeEventListener(
              "selectionchange",
              this._updateAnnotationLayerVisibility
            ),
              this.pdfViewer.viewer.classList.remove(
                "has-transparent-text-layer"
              ),
              this.observer.disconnect();
          }
          uri() {
            return this.pdfMetadata.getUri();
          }
          getMetadata() {
            return this.pdfMetadata.getMetadata();
          }
          async _checkForSelectableText() {
            try {
              await this.uri();
            } catch (t) {
              return;
            }
            try {
              const t = await r.documentHasText();
              this._showNoSelectableTextWarning(!t);
            } catch (e) {
              console.warn("Unable to check for text in PDF:", e);
            }
          }
          _showNoSelectableTextWarning(t) {
            var e;
            if (!t)
              return (
                null === (e = this._warningBanner) ||
                  void 0 === e ||
                  e.remove(),
                void (this._warningBanner = null)
              );
            const n = document.querySelector("#mainContainer"),
              o = () => {
                if (!this._warningBanner) return;
                const t = this._warningBanner.getBoundingClientRect();
                (n.style.top = t.height + "px"),
                  (this._warningBanner.style.top = -t.height + "px");
              };
            (this._warningBanner = document.createElement("div")),
              (this._warningBanner.className =
                "annotator-pdf-warning-banner annotator-pdf-warning-banner--notice"),
              n.appendChild(this._warningBanner),
              (0, i.render)((0, i.createElement)(d, null), this._warningBanner),
              "undefined" != typeof ResizeObserver &&
                new ResizeObserver(o).observe(this._warningBanner),
              o();
          }
          _update() {
            const t = [],
              e = this.pdfViewer.pagesCount;
            for (let o = 0; o < e; o++) {
              var n;
              const t = this.pdfViewer.getPageView(o);
              if (null !== (n = t.textLayer) && void 0 !== n && n.renderingDone)
                switch (t.renderingState) {
                  case a.default.INITIAL:
                    t.textLayer = null;
                    break;
                  case a.default.FINISHED: {
                    const e = t.div.querySelector(".annotator-placeholder");
                    null == e || e.parentNode.removeChild(e);
                  }
                }
            }
            for (let o of this.annotator.anchors)
              if (o.highlights) {
                if (t.includes(o.annotation)) continue;
                for (let e = 0; e < o.highlights.length; e++) {
                  const n = o.highlights[e];
                  if (!document.body.contains(n)) {
                    o.highlights.splice(e, 1),
                      delete o.range,
                      t.push(o.annotation);
                    break;
                  }
                }
              }
            t.map((t) => this.annotator.anchor(t));
          }
        }
        n.default = f;
      },
      {
        "../../shared/components/svg-icon": 68,
        "../anchoring/pdf": 16,
        "../delegator": 30,
        "../pdfjs-rendering-states": 39,
        "./pdf-metadata": 43,
        "lodash.debounce": 5,
        preact: 6,
      },
    ],
    45: [
      function (t, e, n) {
        "use strict";
        function o(t) {
          return t.focusNode === t.anchorNode
            ? t.focusOffset < t.anchorOffset
            : t.getRangeAt(0).startContainer === t.focusNode;
        }
        function i(t, e) {
          try {
            var n, o;
            const i =
              null !==
                (n =
                  null === (o = e.nodeValue) || void 0 === o
                    ? void 0
                    : o.length) && void 0 !== n
                ? n
                : e.childNodes.length;
            return t.comparePoint(e, 0) <= 0 && t.comparePoint(e, i) >= 0;
          } catch (i) {
            return !1;
          }
        }
        function r(t, e) {
          const n = t.commonAncestorContainer,
            o = n.ownerDocument.createNodeIterator(n, NodeFilter.SHOW_ALL);
          let r;
          for (; (r = o.nextNode()); ) i(t, r) && e(r);
        }
        function s(t) {
          const e = /^\s*$/,
            n = [];
          r(t, function (t) {
            t.nodeType !== Node.TEXT_NODE ||
              t.textContent.match(e) ||
              n.push(t);
          });
          let o = [];
          return (
            n.forEach(function (e) {
              const n = e.ownerDocument.createRange();
              if (
                (n.selectNodeContents(e),
                e === t.startContainer && n.setStart(e, t.startOffset),
                e === t.endContainer && n.setEnd(e, t.endOffset),
                n.collapsed)
              )
                return;
              const i = Array.from(n.getClientRects());
              n.detach(), (o = o.concat(i));
            }),
            o
          );
        }
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.isSelectionBackwards = o),
          (n.isNodeInRange = i),
          (n.forEachNodeInRange = r),
          (n.getTextBoundingBoxes = s),
          (n.selectionFocusRect = function (t) {
            if (t.isCollapsed) return null;
            const e = s(t.getRangeAt(0));
            return 0 === e.length ? null : o(t) ? e[0] : e[e.length - 1];
          }),
          (n.itemsForRange = function (t, e) {
            const n = new Set(),
              o = new Set();
            return (
              r(t, (t) => {
                let i = t;
                for (; i && !n.has(i); ) {
                  n.add(i);
                  const t = e(i);
                  t && o.add(t), (i = i.parentNode);
                }
              }),
              [...o]
            );
          });
      },
      {},
    ],
    46: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.SelectionObserver = void 0);
        n.SelectionObserver = class {
          constructor(t, e = document) {
            let n = !1;
            this._pendingCallback = null;
            const o = (n = 10) => {
              this._pendingCallback = setTimeout(() => {
                t(
                  (function (t) {
                    const e = t.getSelection();
                    if (!e || 0 === e.rangeCount) return null;
                    const n = e.getRangeAt(0);
                    return n.collapsed ? null : n;
                  })(e)
                );
              }, n);
            };
            (this._eventHandler = (t) => {
              if (
                ("mousedown" === t.type && (n = !0),
                "mouseup" === t.type && (n = !1),
                n)
              )
                return;
              this._cancelPendingCallback();
              const e = "mouseup" === t.type ? 10 : 100;
              o(e);
            }),
              (this._document = e),
              (this._events = ["mousedown", "mouseup", "selectionchange"]);
            for (let i of this._events)
              e.addEventListener(i, this._eventHandler);
            o(1);
          }
          disconnect() {
            for (let t of this._events)
              this._document.removeEventListener(t, this._eventHandler);
            this._cancelPendingCallback();
          }
          _cancelPendingCallback() {
            this._pendingCallback &&
              (clearTimeout(this._pendingCallback),
              (this._pendingCallback = null));
          }
        };
      },
      {},
    ],
    47: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = function (t, e) {
            const n = t.querySelectorAll("[data-hypothesis-trigger]");
            function o(t) {
              e(), t.stopPropagation();
            }
            Array.from(n).forEach(function (t) {
              t.addEventListener("click", o);
            });
          });
      },
      {},
    ],
    48: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o = h(t("hammerjs")),
          i = h(t("./annotation-counts")),
          r = h(t("./sidebar-trigger")),
          s = t("./config/sidebar"),
          a = h(t("../shared/bridge-events")),
          l = h(t("./features")),
          c = h(t("./guest")),
          u = t("./toolbar");
        function h(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function d(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function f(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? d(Object(n), !0).forEach(function (e) {
                  p(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : d(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function p(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        const g = { BucketBar: { container: ".annotator-frame" } };
        class m extends c.default {
          constructor(t, e) {
            ("clean" === e.theme || e.externalContainerSelector) &&
              delete e.pluginClasses.BucketBar;
            let n,
              o,
              i = null;
            e.externalContainerSelector &&
              (i = document.querySelector(e.externalContainerSelector)),
              i
                ? (n = i)
                : ((o = document.createElement("div")),
                  (o.style.display = "none"),
                  (o.className = "annotator-frame annotator-outer"),
                  "clean" === e.theme &&
                    o.classList.add("annotator-frame--theme-clean"),
                  t.appendChild(o));
            const r = (function (t) {
              const e = (0, s.createSidebarConfig)(t),
                n = "config=" + encodeURIComponent(JSON.stringify(e)),
                o = t.sidebarAppUrl + "#" + n,
                i = document.createElement("iframe");
              return (
                i.setAttribute("allowfullscreen", ""),
                (i.src = o),
                (i.title = "Hypothesis annotation viewer"),
                (i.className = "h-sidebar-iframe"),
                i
              );
            })(e);
            super(t, f(f({}, g), e)),
              (this.externalFrame = n),
              (this.frame = o),
              (o || n).appendChild(r),
              this.subscribe("panelReady", () => {
                this.frame && (this.frame.style.display = "");
              }),
              this.subscribe("beforeAnnotationCreated", (t) => {
                t.$highlight || r.contentWindow.focus();
              }),
              (e.openSidebar || e.annotations || e.query || e.group) &&
                this.subscribe("panelReady", () => this.show()),
              this.plugins.BucketBar &&
                this.plugins.BucketBar.element.addEventListener("click", () =>
                  this.show()
                );
            const a = document.createElement("div");
            (this.toolbar = new u.ToolbarController(a, {
              createAnnotation: () => this.createAnnotation(),
              setSidebarOpen: (t) => (t ? this.show() : this.hide()),
              setHighlightsVisible: (t) => this.setAllVisibleHighlights(t),
            })),
              (this.toolbar.useMinimalControls = "clean" === e.theme),
              this.frame
                ? (this.frame.prepend(a),
                  (this.toolbarWidth = this.toolbar.getWidth()))
                : (this.toolbarWidth = 0),
              (this._gestureState = { initial: null, final: null }),
              this._setupGestures(),
              this.hide();
            const [l] = e.services || [];
            l &&
              ((this.onLoginRequest = l.onLoginRequest),
              (this.onLogoutRequest = l.onLogoutRequest),
              (this.onSignupRequest = l.onSignupRequest),
              (this.onProfileRequest = l.onProfileRequest),
              (this.onHelpRequest = l.onHelpRequest)),
              (this.onLayoutChange = e.onLayoutChange),
              this._notifyOfLayoutChange(!1),
              this._setupSidebarEvents();
          }
          destroy() {
            var t, e;
            null === (t = this._hammerManager) || void 0 === t || t.destroy(),
              null === (e = this.frame) || void 0 === e || e.remove(),
              super.destroy();
          }
          _setupSidebarEvents() {
            (0, i.default)(document.body, this.crossframe),
              (0, r.default)(document.body, () => this.show()),
              l.default.init(this.crossframe),
              this.crossframe.on("showSidebar", () => this.show()),
              this.crossframe.on("hideSidebar", () => this.hide()),
              this.crossframe.on("showNotebook", (t) => {
                this.hide(), this.publish("showNotebook", [t]);
              }),
              this.crossframe.on("hideNotebook", () => {
                this.show(), this.publish("hideNotebook");
              }),
              [
                [a.default.LOGIN_REQUESTED, this.onLoginRequest],
                [a.default.LOGOUT_REQUESTED, this.onLogoutRequest],
                [a.default.SIGNUP_REQUESTED, this.onSignupRequest],
                [a.default.PROFILE_REQUESTED, this.onProfileRequest],
                [a.default.HELP_REQUESTED, this.onHelpRequest],
              ].forEach(([t, e]) => {
                e && this.crossframe.on(t, () => e());
              });
          }
          _resetGestureState() {
            this._gestureState = { initial: null, final: null };
          }
          _setupGestures() {
            const t = this.toolbar.sidebarToggleButton;
            t &&
              (t.addEventListener("touchmove", (t) => t.preventDefault()),
              (this._hammerManager = new o.default.Manager(t).on(
                "panstart panend panleft panright",
                this._onPan.bind(this)
              )),
              this._hammerManager.add(
                new o.default.Pan({ direction: o.default.DIRECTION_HORIZONTAL })
              ));
          }
          _updateLayout() {
            this.renderFrame ||
              (this.renderFrame = requestAnimationFrame(() => {
                if (
                  ((this.renderFrame = null),
                  this._gestureState.final !== this._gestureState.initial &&
                    this.frame)
                ) {
                  const t = this._gestureState.final,
                    e = -t;
                  (this.frame.style.marginLeft = `${t}px`),
                    e >= 280 && (this.frame.style.width = `${e}px`),
                    this._notifyOfLayoutChange();
                }
              }));
          }
          _notifyOfLayoutChange(t) {
            const e = (this.frame && this.toolbar.getWidth()) || 0,
              n = this.frame || this.externalFrame,
              o = n.getBoundingClientRect(),
              i = window.getComputedStyle(n),
              r = parseInt(i.width),
              s = parseInt(i.marginLeft);
            let a = e;
            "boolean" == typeof t
              ? t && (a += r)
              : (s < 280 ? (a -= s) : (a += r), (t = a > e));
            const l = { expanded: t, width: t ? a : e, height: o.height };
            this.onLayoutChange && this.onLayoutChange(l),
              this.publish("sidebarLayoutChanged", [l]);
          }
          _onPan(t) {
            const e = this.frame;
            if (e)
              switch (t.type) {
                case "panstart":
                  this._resetGestureState(),
                    e.classList.add("annotator-no-transition"),
                    (e.style.pointerEvents = "none"),
                    (this._gestureState.initial = parseInt(
                      getComputedStyle(e).marginLeft
                    ));
                  break;
                case "panend":
                  e.classList.remove("annotator-no-transition"),
                    (e.style.pointerEvents = ""),
                    null === this._gestureState.final ||
                    this._gestureState.final <= -280
                      ? this.show()
                      : this.hide(),
                    this._resetGestureState();
                  break;
                case "panleft":
                case "panright": {
                  if ("number" != typeof this._gestureState.initial) return;
                  const e = this._gestureState.initial,
                    n = t.deltaX;
                  (this._gestureState.final = Math.min(Math.round(e + n), 0)),
                    this._updateLayout();
                  break;
                }
              }
          }
          show() {
            if (
              (this.crossframe.call("sidebarOpened"),
              this.publish("sidebarOpened"),
              this.frame)
            ) {
              const t = this.frame.getBoundingClientRect().width;
              (this.frame.style.marginLeft = -1 * t + "px"),
                this.frame.classList.remove("annotator-collapsed");
            }
            (this.toolbar.sidebarOpen = !0),
              "whenSidebarOpen" === this.options.showHighlights &&
                this.setVisibleHighlights(!0),
              this._notifyOfLayoutChange(!0);
          }
          hide() {
            this.frame &&
              ((this.frame.style.marginLeft = ""),
              this.frame.classList.add("annotator-collapsed")),
              (this.toolbar.sidebarOpen = !1),
              "whenSidebarOpen" === this.options.showHighlights &&
                this.setVisibleHighlights(!1),
              this._notifyOfLayoutChange(!1);
          }
          setAllVisibleHighlights(t) {
            this.crossframe.call("setVisibleHighlights", t);
          }
        }
        n.default = m;
      },
      {
        "../shared/bridge-events": 65,
        "./annotation-counts": 20,
        "./config/sidebar": 29,
        "./features": 31,
        "./guest": 33,
        "./sidebar-trigger": 47,
        "./toolbar": 49,
        hammerjs: 4,
      },
    ],
    49: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.ToolbarController = void 0);
        var o,
          i = t("preact"),
          r =
            (o = t("./components/toolbar")) && o.__esModule
              ? o
              : { default: o };
        n.ToolbarController = class {
          constructor(t, e) {
            const {
              createAnnotation: n,
              setSidebarOpen: o,
              setHighlightsVisible: r,
            } = e;
            (this._container = t),
              (this._container.className = "annotator-toolbar"),
              (this._useMinimalControls = !1),
              (this._newAnnotationType = "note"),
              (this._highlightsVisible = !1),
              (this._sidebarOpen = !1),
              (this._closeSidebar = () => o(!1)),
              (this._toggleSidebar = () => o(!this._sidebarOpen)),
              (this._toggleHighlights = () => r(!this._highlightsVisible)),
              (this._createAnnotation = () => {
                n(), o(!0);
              }),
              (this._sidebarToggleButton = (0, i.createRef)()),
              this.render();
          }
          getWidth() {
            return this._container.getBoundingClientRect().width;
          }
          set useMinimalControls(t) {
            (this._useMinimalControls = t), this.render();
          }
          get useMinimalControls() {
            return this._useMinimalControls;
          }
          set sidebarOpen(t) {
            (this._sidebarOpen = t), this.render();
          }
          get sidebarOpen() {
            return this._sidebarOpen;
          }
          set newAnnotationType(t) {
            (this._newAnnotationType = t), this.render();
          }
          get newAnnotationType() {
            return this._newAnnotationType;
          }
          set highlightsVisible(t) {
            (this._highlightsVisible = t), this.render();
          }
          get highlightsVisible() {
            return this._highlightsVisible;
          }
          get sidebarToggleButton() {
            return this._sidebarToggleButton.current;
          }
          render() {
            (0, i.render)(
              (0, i.createElement)(r.default, {
                closeSidebar: this._closeSidebar,
                createAnnotation: this._createAnnotation,
                newAnnotationType: this._newAnnotationType,
                isSidebarOpen: this._sidebarOpen,
                showHighlights: this._highlightsVisible,
                toggleHighlights: this._toggleHighlights,
                toggleSidebar: this._toggleSidebar,
                toggleSidebarRef: this._sidebarToggleButton,
                useMinimalControls: this.useMinimalControls,
              }),
              this._container
            );
          }
        };
      },
      { "./components/toolbar": 24, preact: 6 },
    ],
    50: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.findClosestOffscreenAnchor = function (t, e) {
            let n = null,
              i = 0;
            for (let s of t) {
              var r;
              if (null === (r = s.highlights) || void 0 === r || !r.length)
                continue;
              const t = (0, o.getBoundingClientRect)(s.highlights).top;
              ("up" === e && t >= 137) ||
                ("down" === e && t <= window.innerHeight - 22) ||
                ((!n || ("up" === e && t > i) || ("down" === e && t < i)) &&
                  ((n = s), (i = t)));
            }
            return n;
          }),
          (n.anchorBuckets = function (t) {
            const e = (function (t) {
                const e = [];
                return (
                  t.forEach((t) => {
                    var n;
                    if (
                      null === (n = t.highlights) ||
                      void 0 === n ||
                      !n.length
                    )
                      return;
                    const i = (0, o.getBoundingClientRect)(t.highlights);
                    e.push({ top: i.top, bottom: i.bottom, anchor: t });
                  }),
                  e.sort((t, e) => (t.top < e.top ? -1 : 1)),
                  e
                );
              })(t),
              n = new Set(),
              i = new Set(),
              r = [];
            let s = null;
            function a(t) {
              const e = t.bottom - t.top,
                n = t.top + e / 2;
              return {
                anchors: [t.anchor],
                top: t.top,
                bottom: t.bottom,
                position: n,
              };
            }
            return (
              e.forEach((t) => {
                if (t.top < 137) return void n.add(t.anchor);
                if (t.top > window.innerHeight - 22)
                  return void i.add(t.anchor);
                if (!s) return void (s = a(t));
                const e = t.top > s.top && t.bottom < s.bottom;
                if (t.top - s.bottom > 60 && !e) r.push(s), (s = a(t));
                else {
                  const e = t.bottom > s.bottom ? t.bottom : s.bottom,
                    n = e - s.top;
                  s.anchors.push(t.anchor),
                    (s.bottom = e),
                    (s.position = s.top + n / 2);
                }
              }),
              s && r.push(s),
              {
                above: { anchors: Array.from(n), position: 137 },
                below: {
                  anchors: Array.from(i),
                  position: window.innerHeight - 22,
                },
                buckets: r,
              }
            );
          });
        var o = t("../highlighter");
      },
      { "../highlighter": 34 },
    ],
    51: [
      function (t, e, n) {
        "use strict";
        function o(t) {
          const e = !t.classList.contains("h-sidebar-iframe"),
            n = t.hasAttribute("enable-annotation");
          return e && n;
        }
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.findFrames = function (t) {
            return Array.from(t.getElementsByTagName("iframe")).filter(o);
          }),
          (n.hasHypothesis = function (t) {
            return !0 === t.contentWindow.__hypothesis_frame;
          }),
          (n.injectHypothesis = function (t, e, n) {
            const o = document.createElement("script");
            (o.className = "js-hypothesis-config"),
              (o.type = "application/json"),
              (o.innerText = JSON.stringify(n));
            const i = e,
              r = document.createElement("script");
            (r.className = "js-hypothesis-embed"),
              (r.async = !0),
              (r.src = i),
              t.contentDocument.body.appendChild(o),
              t.contentDocument.body.appendChild(r);
          }),
          (n.isAccessible = function (t) {
            try {
              return !!t.contentDocument;
            } catch (e) {
              return !1;
            }
          }),
          (n.isDocumentReady = function (t, e) {
            "loading" === t.contentDocument.readyState
              ? t.contentDocument.addEventListener(
                  "DOMContentLoaded",
                  function () {
                    e();
                  }
                )
              : e();
          }),
          (n.isLoaded = function (t, e) {
            "complete" !== t.contentDocument.readyState
              ? t.addEventListener("load", function () {
                  e();
                })
              : e();
          });
      },
      {},
    ],
    52: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.createShadowRoot = function (t) {
            if (!t.attachShadow) return t;
            const e = t.attachShadow({ mode: "open" });
            return (
              (function (t) {
                var e;
                const n =
                  null ===
                    (e = document.querySelector(
                      'link[rel="stylesheet"][href*="/build/styles/annotator.css"]'
                    )) || void 0 === e
                    ? void 0
                    : e.href;
                if (!n) return;
                const o = document.createElement("style");
                (o.textContent = `@import "${n}";`), t.appendChild(o);
              })(e),
              e
            );
          });
      },
      {},
    ],
    53: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.normalizeURI = function (t, e = document.baseURI) {
            return new URL(t, e).href.toString().replace(/#.*/, "");
          });
      },
      {},
    ],
    54: [
      function (t, e, n) {
        "use strict";
        function o(t, e) {
          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
          return t;
        }
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.parseJsonConfig = function (t) {
            for (
              var e = {},
                n = t.querySelectorAll("script.js-hypothesis-config"),
                i = 0;
              i < n.length;
              i++
            ) {
              var r = void 0;
              try {
                r = JSON.parse(n[i].textContent || "");
              } catch (s) {
                console.warn(
                  "Could not parse settings from js-hypothesis-config tags",
                  s
                ),
                  (r = {});
              }
              o(e, r);
            }
            return e;
          });
      },
      {},
    ],
    55: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">\n  <path fill="currentColor" fill-rule="nonzero" d="M15 0c.27 0 .505.099.703.297A.961.961 0 0116 1v15l-4-3H1a.974.974 0 01-.703-.29A.953.953 0 010 12V1C0 .719.096.482.29.29A.966.966 0 011 0h14zM7 3l-.469.063c-.312.041-.656.187-1.031.437-.375.25-.719.646-1.031 1.188C4.156 5.229 4 6 4 7l.002.063.006.062a.896.896 0 01.008.11l-.002.074-.006.066a1.447 1.447 0 00.43 1.188C4.729 8.854 5.082 9 5.5 9c.417 0 .77-.146 1.063-.438C6.854 8.271 7 7.918 7 7.5c0-.417-.146-.77-.438-1.063A1.447 1.447 0 005.5 6c-.073 0-.146.005-.219.016-.073.01-.14.026-.203.046.177-1.03.542-1.632 1.094-1.804L7 4V3zm5 0l-.469.063c-.312.041-.656.187-1.031.437-.375.25-.719.646-1.031 1.188C9.156 5.229 9 6 9 7l.002.063.006.062a.896.896 0 01.008.11l-.002.074-.006.066a1.447 1.447 0 00.43 1.188c.291.291.645.437 1.062.437.417 0 .77-.146 1.063-.438.291-.291.437-.645.437-1.062 0-.417-.146-.77-.438-1.063A1.447 1.447 0 0010.5 6c-.073 0-.146.005-.219.016-.073.01-.14.026-.203.046.177-1.03.542-1.632 1.094-1.804L12 4V3z"/>\n</svg>\n';
      },
      {},
    ],
    56: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="Icon Icon--cancel"><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 8l3.536-3.536L8 8 4.464 4.464 8 8zm0 0l-3.536 3.536L8 8l3.536 3.536L8 8z"></path></g></svg>\n';
      },
      {},
    ],
    57: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12L6 8l4-4"></path></g></svg>\n';
      },
      {},
    ],
    58: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="Icon Icon--caret-right"><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4l4 4-4 4"></path></g></svg>\n';
      },
      {},
    ],
    59: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
      },
      {},
    ],
    60: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.73 12.973A9.89 9.89 0 0 1 8 13c-3.866 0-7-2.239-7-5 0-.753.233-1.467.65-2.107m5.62-2.866A9.89 9.89 0 0 1 8 3c3.866 0 7 2.239 7 5 0 .753-.233 1.467-.65 2.107M1 1l14 14L1 1z"></path></g></svg>\n';
      },
      {},
    ],
    61: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15H1h11zm-.5-6v2l-1 1v-2l1-1zm.5-7v6h-2V2h2zm0-1h-2 2zm0 8h-2 2z"></path></g></svg>\n';
      },
      {},
    ],
    62: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 15h6l8-6V1H1v14zm6-1V9h7"></path></g></svg>\n';
      },
      {},
    ],
    63: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" aria-hidden="true" focusable="false"><path d="M0 8 L7 0 L15 8" stroke="currentColor" strokeWidth="2" /></svg>\n';
      },
      {},
    ],
    64: [
      function (t, e, n) {
        e.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill-rule="evenodd"><rect fill="none" stroke="none" x="0" y="0" width="16" height="16"></rect><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13c3.866 0 7-2.239 7-5s-3.134-5-7-5-7 2.239-7 5 3.134 5 7 5zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></g></svg>\n';
      },
      {},
    ],
    65: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        n.default = {
          FEATURE_FLAGS_UPDATED: "featureFlagsUpdated",
          HELP_REQUESTED: "helpRequested",
          LOGIN_REQUESTED: "loginRequested",
          LOGOUT_REQUESTED: "logoutRequested",
          PROFILE_REQUESTED: "profileRequested",
          PUBLIC_ANNOTATION_COUNT_CHANGED: "publicAnnotationCountChanged",
          SIGNUP_REQUESTED: "signupRequested",
        };
      },
      {},
    ],
    66: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        var o,
          i = (o = t("./frame-rpc")) && o.__esModule ? o : { default: o };
        function r(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(t);
            e &&
              (o = o.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, o);
          }
          return n;
        }
        function s(t, e, n) {
          return (
            e in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        n.default = class {
          constructor() {
            (this.links = []),
              (this.channelListeners = {}),
              (this.onConnectListeners = []);
          }
          destroy() {
            Array.from(this.links).map((t) => t.channel.destroy());
          }
          createChannel(t, e, n) {
            let o = null,
              a = !1;
            const l = () => {
                a ||
                  ((a = !0),
                  Array.from(this.onConnectListeners).forEach((e) =>
                    e.call(null, o, t)
                  ));
              },
              c = (function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var n = null != arguments[e] ? arguments[e] : {};
                  e % 2
                    ? r(Object(n), !0).forEach(function (e) {
                        s(t, e, n[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        t,
                        Object.getOwnPropertyDescriptors(n)
                      )
                    : r(Object(n)).forEach(function (e) {
                        Object.defineProperty(
                          t,
                          e,
                          Object.getOwnPropertyDescriptor(n, e)
                        );
                      });
                }
                return t;
              })(
                {
                  connect: (t, e) => {
                    t === n && (e(), l());
                  },
                },
                this.channelListeners
              );
            return (
              (o = new i.default(window, t, e, c)),
              o.call("connect", n, l),
              this.links.push({ channel: o, window: t }),
              o
            );
          }
          call(t, ...e) {
            let n;
            "function" == typeof e[e.length - 1] &&
              ((n = e[e.length - 1]), (e = e.slice(0, -1)));
            const o = (t) => (e) => {
                throw (
                  (t.destroy(),
                  (this.links = Array.from(this.links)
                    .filter((e) => e.channel !== t)
                    .map((t) => t)),
                  e)
                );
              },
              i = this.links.map(function (n) {
                return new Promise(function (o, i) {
                  const r = setTimeout(() => o(null), 1e3);
                  try {
                    return n.channel.call(t, ...Array.from(e), function (t, e) {
                      return clearTimeout(r), t ? i(t) : o(e);
                    });
                  } catch (s) {
                    return i(s);
                  }
                }).catch(o(n.channel));
              });
            let r = Promise.all(i);
            return n && (r = r.then((t) => n(null, t)).catch((t) => n(t))), r;
          }
          on(t, e) {
            if (this.channelListeners[t])
              throw new Error(`Listener '${t}' already bound in Bridge`);
            return (this.channelListeners[t] = e), this;
          }
          off(t) {
            return delete this.channelListeners[t], this;
          }
          onConnect(t) {
            return this.onConnectListeners.push(t), this;
          }
        };
      },
      { "./frame-rpc": 70 },
    ],
    67: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.normalizeKeyName = function (t) {
            const e = {
              Left: "ArrowLeft",
              Up: "ArrowUp",
              Down: "ArrowDown",
              Right: "ArrowRight",
              Spacebar: " ",
              Del: "Delete",
            };
            return e[t] ? e[t] : t;
          });
      },
      {},
    ],
    68: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = u),
          (n.registerIcons = function (t, { reset: e = !1 } = {}) {
            e && (c = {}), Object.assign(c, t);
          }),
          (n.availableIcons = function () {
            return c;
          });
        var o = a(t("classnames")),
          i = t("preact"),
          r = t("preact/hooks"),
          s = a(t("prop-types"));
        function a(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function l() {
          return (l =
            Object.assign ||
            function (t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n)
                  Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
              }
              return t;
            }).apply(this, arguments);
        }
        let c = {};
        function u({
          name: t,
          className: e = "",
          inline: n = !1,
          title: s = "",
        }) {
          if (!c[t]) throw new Error(`Icon name "${t}" is not registered`);
          const a = c[t],
            u = (0, r.useRef)();
          (0, r.useLayoutEffect)(() => {
            const t = u.current.querySelector("svg");
            t && t.setAttribute("class", e);
          }, [e, a]);
          const h = {};
          return (
            s && (h.title = s),
            (0, i.createElement)(
              "span",
              l(
                {
                  className: (0, o.default)("svg-icon", {
                    "svg-icon--inline": n,
                  }),
                  dangerouslySetInnerHTML: { __html: a },
                  ref: u,
                },
                h
              )
            )
          );
        }
        u.propTypes = {
          name: s.default.string.isRequired,
          className: s.default.string,
          inline: s.default.bool,
          title: s.default.string,
        };
      },
      { classnames: 2, preact: 6, "preact/hooks": 7, "prop-types": 9 },
    ],
    69: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.default = void 0);
        n.default = class {
          constructor(t, e = {}) {
            (this.target = t),
              (this.server = !1),
              (this.origin = "*"),
              (this.requestInProgress = !1),
              (this.onDiscovery = null),
              void 0 !== e.server && (this.server = e.server),
              void 0 !== e.origin && (this.origin = e.origin),
              (this._onMessage = this._onMessage.bind(this));
          }
          startDiscovery(t) {
            if (this.onDiscovery)
              throw new Error(
                "Discovery is already in progress. Call stopDiscovery() first"
              );
            (this.onDiscovery = t),
              this.target.addEventListener("message", this._onMessage, !1),
              this._beacon();
          }
          stopDiscovery() {
            (this.onDiscovery = null),
              this.target.removeEventListener("message", this._onMessage);
          }
          _beacon() {
            let t;
            t = this.server
              ? "__cross_frame_dhcp_offer"
              : "__cross_frame_dhcp_discovery";
            const e = [this.target.top];
            for (; e.length > 0; ) {
              const n = e.shift();
              n !== this.target && n.postMessage(t, this.origin);
              for (let t = 0; t < n.frames.length; t++) e.push(n.frames[t]);
            }
          }
          _onMessage(t) {
            const { source: e, data: n } = t;
            let o = t.origin;
            ("null" === o ||
              o.match("moz-extension:") ||
              "moz-extension:" === window.location.protocol) &&
              (o = "*");
            const i =
              "string" == typeof n &&
              n.match(
                /^__cross_frame_dhcp_(discovery|offer|request|ack)(?::(\d+))?$/
              );
            if (!i) return;
            let [, r, s] = i;
            const { reply: a, discovered: l, token: c } = this._processMessage(
              r,
              s,
              o
            );
            a && e.postMessage("__cross_frame_dhcp_" + a, o),
              l && this.onDiscovery && this.onDiscovery.call(null, e, o, c);
          }
          _processMessage(t, e, n) {
            let o = null,
              i = !1;
            if (this.server) {
              if ("discovery" === t) o = "offer";
              else if ("request" === t)
                (o = `ack:${(e = this.generateToken())}`), (i = !0);
              else if ("offer" === t || "ack" === t)
                throw new Error(
                  `A second Discovery server has been detected at ${n}.\n This is unsupported and will cause unexpected behaviour.`
                );
            } else
              "offer" === t
                ? this.requestInProgress ||
                  ((this.requestInProgress = !0), (o = "request"))
                : "ack" === t && ((this.requestInProgress = !1), (i = !0));
            return { reply: o, discovered: i, token: e };
          }
          generateToken() {
            return Math.random().toString().replace(/\D/g, "");
          }
        };
      },
      {},
    ],
    70: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }), (n.default = o);
        function o(t, e, n, o) {
          const i = this;
          if (((this.src = t), (this.dst = e), "*" === n)) this.origin = "*";
          else {
            const t = new URL(n);
            this.origin = t.protocol + "//" + t.host;
          }
          (this._sequence = 0),
            (this._callbacks = {}),
            (this._onmessage = function (t) {
              i._destroyed ||
                (i.dst === t.source &&
                  (("*" !== i.origin && t.origin !== i.origin) ||
                    (t.data &&
                      "object" == typeof t.data &&
                      "frame-rpc" === t.data.protocol &&
                      Array.isArray(t.data.arguments) &&
                      i._handle(t.data))));
            }),
            this.src.addEventListener("message", this._onmessage),
            (this._methods = ("function" == typeof o ? o(this) : o) || {});
        }
        (o.prototype.destroy = function () {
          (this._destroyed = !0),
            this.src.removeEventListener("message", this._onmessage);
        }),
          (o.prototype.call = function (t) {
            const e = [].slice.call(arguments, 1);
            return this.apply(t, e);
          }),
          (o.prototype.apply = function (t, e) {
            if (this._destroyed) return;
            const n = this._sequence++;
            "function" == typeof e[e.length - 1] &&
              ((this._callbacks[n] = e[e.length - 1]), (e = e.slice(0, -1))),
              this.dst.postMessage(
                {
                  protocol: "frame-rpc",
                  version: "1.0.0",
                  sequence: n,
                  method: t,
                  arguments: e,
                },
                this.origin
              );
          }),
          (o.prototype._handle = function (t) {
            const e = this;
            if (!e._destroyed)
              if (t.hasOwnProperty("method")) {
                if (!this._methods.hasOwnProperty(t.method)) return;
                const n = t.arguments.concat(function () {
                  e.dst.postMessage(
                    {
                      protocol: "frame-rpc",
                      version: "1.0.0",
                      response: t.sequence,
                      arguments: [].slice.call(arguments),
                    },
                    e.origin
                  );
                });
                this._methods[t.method].apply(this._methods, n);
              } else if (t.hasOwnProperty("response")) {
                const e = this._callbacks[t.response];
                delete this._callbacks[t.response],
                  e && e.apply(null, t.arguments);
              }
          });
      },
      {},
    ],
    71: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.matchShortcut = s),
          (n.installShortcut = a),
          (n.useShortcut = function (
            t,
            e,
            { rootElement: n = document.body } = {}
          ) {
            (0, o.useEffect)(() => {
              if (t) return a(t, e, { rootElement: n });
            }, [t, e, n]);
          });
        var o = t("preact/hooks"),
          i = t("./browser-compatibility-utils.js");
        const r = { alt: 1, ctrl: 2, meta: 4, shift: 8 };
        function s(t, e) {
          const n = e.split("+").map((t) => t.toLowerCase());
          let o = 0,
            s = null;
          for (let i of n) {
            const t = r[i];
            if (t) o |= t;
            else {
              if (null !== s)
                throw new Error("Multiple non-modifier keys specified");
              s = i;
            }
          }
          if (!s) throw new Error(`Invalid shortcut: ${e}`);
          return (
            ((t.ctrlKey ? r.ctrl : 0) |
              (t.metaKey ? r.meta : 0) |
              (t.altKey ? r.alt : 0) |
              (t.shiftKey ? r.shift : 0)) ===
              o && (0, i.normalizeKeyName)(t.key).toLowerCase() === s
          );
        }
        function a(t, e, { rootElement: n = document.body } = {}) {
          const o = (n) => {
            s(n, t) && e(n);
          };
          return (
            n.addEventListener("keydown", o),
            () => n.removeEventListener("keydown", o)
          );
        }
      },
      { "./browser-compatibility-utils.js": 67, "preact/hooks": 7 },
    ],
    72: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }),
          (n.toBoolean = function (t) {
            if (
              "string" == typeof t &&
              "false" === t.trim().toLocaleLowerCase()
            )
              return !1;
            const e = Number(t);
            return isNaN(e) ? "string" == typeof t : Boolean(e);
          }),
          (n.toInteger = function (t) {
            return parseInt(t);
          }),
          (n.toObject = function (t) {
            return "object" == typeof t && null !== t ? t : {};
          }),
          (n.toString = function (t) {
            return t && "function" == typeof t.toString ? t.toString() : "";
          });
      },
      {},
    ],
    73: [
      function (t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 }), (n.default = i);
        let o = {};
        function i(...t) {
          const e = t.join();
          e in o || (console.warn(...t), (o[e] = !0));
        }
        i.reset = () => {
          o = {};
        };
      },
      {},
    ],
  },
  {},
  [36]
);
//# sourceMappingURL=annotator.bundle.js.map

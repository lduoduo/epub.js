!(function e(t, r, n) {
  var o = "function" == typeof hypothesisRequire && hypothesisRequire;
  function s(i, a) {
    if (!r[i]) {
      if (!t[i]) {
        var u = "function" == typeof hypothesisRequire && hypothesisRequire;
        if (!a && u) return u(i, !0);
        if (o) return o(i, !0);
        var c = new Error("Cannot find module '" + i + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      var l = (r[i] = { exports: {} });
      t[i][0].call(
        l.exports,
        function (e) {
          var r = t[i][1][e];
          return s(r || e);
        },
        l,
        l.exports,
        e,
        t,
        r,
        n
      );
    }
    return r[i].exports;
  }
  for (var i = 0; i < n.length; i++) s(n[i]);
  return s;
})(
  {
    1: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.bootHypothesisClient = function (e, t) {
            if (!e.querySelector('link[type="application/annotator+html"]')) {
              u(e, "sidebar", "html", t.sidebarAppUrl),
                u(e, "notebook", "html", t.notebookAppUrl),
                u(
                  e,
                  "hypothesis-client",
                  "javascript",
                  t.assetRoot + "build/boot.js"
                );
              var r = p(i);
              l(
                e,
                t,
                [].concat(o(r), [
                  "scripts/annotator.bundle.js",
                  "styles/annotator.css",
                  "styles/pdfjs-overrides.css",
                ])
              );
            }
          }),
          (r.bootSidebarApp = function (e, t) {
            c(e, "fetch", t.apiUrl), c(e, "fetch", t.apiUrl + "links");
            var r = p(i);
            l(
              e,
              t,
              [].concat(o(r), [
                "scripts/sentry.bundle.js",
                "scripts/katex.bundle.js",
                "scripts/showdown.bundle.js",
                "scripts/sidebar.bundle.js",
                "styles/katex.min.css",
                "styles/sidebar.css",
              ])
            );
          });
        var n = e("./polyfills");
        function o(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return s(e);
            })(e) ||
            (function (e) {
              if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                return Array.from(e);
            })(e) ||
            (function (e, t) {
              if (e) {
                if ("string" == typeof e) return s(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return (
                  "Object" === r && e.constructor && (r = e.constructor.name),
                  "Map" === r || "Set" === r
                    ? Array.from(e)
                    : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? s(e, t)
                    : void 0
                );
              }
            })(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function s(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        var i = ["es2017", "es2018"];
        function a(e) {
          e.setAttribute("data-hypothesis-asset", "");
        }
        function u(e, t, r, n) {
          var o = e.createElement("link");
          (o.rel = t),
            (o.href = n),
            (o.type = "application/annotator+".concat(r)),
            a(o),
            e.head.appendChild(o);
        }
        function c(e, t, r) {
          var n = e.createElement("link");
          (n.rel = "preload"),
            (n.as = t),
            (n.crossOrigin = "anonymous"),
            (n.href = r),
            a(n),
            e.head.appendChild(n);
        }
        function l(e, t, r) {
          r.forEach(function (r) {
            var n = t.assetRoot + "build/" + t.manifest[r];
            n.match(/\.css/)
              ? (function (e, t) {
                  var r = e.createElement("link");
                  (r.rel = "stylesheet"),
                    (r.type = "text/css"),
                    (r.href = t),
                    a(r),
                    e.head.appendChild(r);
                })(e, n)
              : (function (e, t) {
                  var r = e.createElement("script");
                  (r.type = "text/javascript"),
                    (r.src = t),
                    (r.async = !1),
                    a(r),
                    e.head.appendChild(r);
                })(e, n);
          });
        }
        function p(e) {
          return (0, n.requiredPolyfillSets)(e).map(function (e) {
            return "scripts/polyfills-".concat(e, ".bundle.js");
          });
        }
      },
      { "./polyfills": 5 },
    ],
    2: [
      function (e, t, r) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.isBrowserSupported = function () {
            var e = [
              function () {
                return Promise.resolve();
              },
              function () {
                return new Map();
              },
              function () {
                return new URL(document.location.href);
              },
              function () {
                return new Request("https://hypothes.is");
              },
              function () {
                return Element.prototype.prepend.name;
              },
              function () {
                document.evaluate(
                  "/html/body",
                  document,
                  null,
                  XPathResult.ANY_TYPE,
                  null
                );
              },
            ];
            try {
              return (
                e.forEach(function (e) {
                  return e();
                }),
                !0
              );
            } catch (t) {
              return !1;
            }
          });
      },
      {},
    ],
    3: [
      function (e, t, r) {
        "use strict";
        var n,
          o = e("./parse-json-config"),
          s = e("./boot"),
          i = (n = e("./url-template")) && n.__esModule ? n : { default: n };
        if ((0, e("./browser-check").isBrowserSupported)()) {
          var a = (0, o.parseJsonConfig)(document),
            u = (0, i.default)(
              a.assetRoot || "https://cdn.hypothes.is/hypothesis/1.637.0/"
            ),
            c = {
              "fonts/KaTeX_AMS-Regular.woff":
                "fonts/KaTeX_AMS-Regular.woff?9cc18f",
              "fonts/KaTeX_Caligraphic-Bold.woff":
                "fonts/KaTeX_Caligraphic-Bold.woff?f08955",
              "fonts/KaTeX_Caligraphic-Regular.woff":
                "fonts/KaTeX_Caligraphic-Regular.woff?da9c92",
              "fonts/KaTeX_Fraktur-Bold.woff":
                "fonts/KaTeX_Fraktur-Bold.woff?a9e17c",
              "fonts/KaTeX_Fraktur-Regular.woff":
                "fonts/KaTeX_Fraktur-Regular.woff?e03ea1",
              "fonts/KaTeX_Main-Bold.woff": "fonts/KaTeX_Main-Bold.woff?c314df",
              "fonts/KaTeX_Main-BoldItalic.woff":
                "fonts/KaTeX_Main-BoldItalic.woff?e3a4e7",
              "fonts/KaTeX_Main-Italic.woff":
                "fonts/KaTeX_Main-Italic.woff?c7142d",
              "fonts/KaTeX_Main-Regular.woff":
                "fonts/KaTeX_Main-Regular.woff?80fd30",
              "fonts/KaTeX_Math-BoldItalic.woff":
                "fonts/KaTeX_Math-BoldItalic.woff?79e29d",
              "fonts/KaTeX_Math-Italic.woff":
                "fonts/KaTeX_Math-Italic.woff?93825a",
              "fonts/KaTeX_SansSerif-Bold.woff":
                "fonts/KaTeX_SansSerif-Bold.woff?46698f",
              "fonts/KaTeX_SansSerif-Italic.woff":
                "fonts/KaTeX_SansSerif-Italic.woff?9f328c",
              "fonts/KaTeX_SansSerif-Regular.woff":
                "fonts/KaTeX_SansSerif-Regular.woff?ada62e",
              "fonts/KaTeX_Script-Regular.woff":
                "fonts/KaTeX_Script-Regular.woff?948ea8",
              "fonts/KaTeX_Size1-Regular.woff":
                "fonts/KaTeX_Size1-Regular.woff?aab170",
              "fonts/KaTeX_Size2-Regular.woff":
                "fonts/KaTeX_Size2-Regular.woff?93ffda",
              "fonts/KaTeX_Size3-Regular.woff":
                "fonts/KaTeX_Size3-Regular.woff?964f5e",
              "fonts/KaTeX_Size4-Regular.woff":
                "fonts/KaTeX_Size4-Regular.woff?e9e52f",
              "fonts/KaTeX_Typewriter-Regular.woff":
                "fonts/KaTeX_Typewriter-Regular.woff?dd9726",
              "scripts/annotator.bundle.js":
                "scripts/annotator.bundle.js?2cf30b",
              "scripts/boot.bundle.js": "scripts/boot.bundle.js?65e75c",
              "scripts/katex.bundle.js": "scripts/katex.bundle.js?315cef",
              "scripts/polyfills-es2017.bundle.js":
                "scripts/polyfills-es2017.bundle.js?a80a0d",
              "scripts/polyfills-es2018.bundle.js":
                "scripts/polyfills-es2018.bundle.js?55430f",
              "scripts/sentry.bundle.js": "scripts/sentry.bundle.js?d8560d",
              "scripts/showdown.bundle.js": "scripts/showdown.bundle.js?3a22fe",
              "scripts/sidebar.bundle.js": "scripts/sidebar.bundle.js?a2e26f",
              "styles/annotator.css": "styles/annotator.css?cb3c56",
              "styles/katex.min.css": "styles/katex.min.css?273d8b",
              "styles/pdfjs-overrides.css": "styles/pdfjs-overrides.css?e2e01b",
              "styles/sidebar.css": "styles/sidebar.css?6e60cc",
            };
          if (document.querySelector("hypothesis-app"))
            (0, s.bootSidebarApp)(document, {
              assetRoot: u,
              manifest: c,
              apiUrl: a.apiUrl,
            });
          else {
            var l = (0, i.default)(
                a.notebookAppUrl || "https://hypothes.is/notebook"
              ),
              p = (0, i.default)(
                a.sidebarAppUrl || "https://hypothes.is/app.html"
              );
            (0, s.bootHypothesisClient)(document, {
              assetRoot: u,
              manifest: c,
              notebookAppUrl: l,
              sidebarAppUrl: p,
            });
          }
        } else
          console.warn(
            "The Hypothesis annotation tool is not supported in this browser. See https://web.hypothes.is/help/which-browsers-are-supported-by-hypothesis/."
          );
      },
      {
        "./boot": 1,
        "./browser-check": 2,
        "./parse-json-config": 4,
        "./url-template": 6,
      },
    ],
    4: [
      function (e, t, r) {
        "use strict";
        function n(e, t) {
          for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
          return e;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.parseJsonConfig = function (e) {
            for (
              var t = {},
                r = e.querySelectorAll("script.js-hypothesis-config"),
                o = 0;
              o < r.length;
              o++
            ) {
              var s = void 0;
              try {
                s = JSON.parse(r[o].textContent || "");
              } catch (i) {
                console.warn(
                  "Could not parse settings from js-hypothesis-config tags",
                  i
                ),
                  (s = {});
              }
              n(t, s);
            }
            return t;
          });
      },
      {},
    ],
    5: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          for (
            var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
            n < t;
            n++
          )
            r[n - 1] = arguments[n];
          return r.every(function (t) {
            return "function" == typeof e[t];
          });
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.requiredPolyfillSets = function (e) {
            return e.filter(function (e) {
              var t = o[e];
              if (!t) throw new Error('Unknown polyfill set "'.concat(e, '"'));
              return t();
            });
          });
        var o = {
          es2017: function () {
            return !n(Object, "entries", "values");
          },
          es2018: function () {
            return (
              "function" != typeof Promise || !n(Promise.prototype, "finally")
            );
          },
        };
      },
      {},
    ],
    6: [
      function (e, t, r) {
        "use strict";
        function n(e) {
          var t = e.match(/(https?):\/\/([^:/]+)/);
          return t ? { protocol: t[1], hostname: t[2] } : null;
        }
        function o() {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : document,
            t = e.currentScript;
          return t ? n(t.src) : null;
        }
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.default = function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : document;
            if (-1 === e.indexOf("{")) return e;
            var r = o(t);
            if (!r)
              throw new Error(
                "Could not process URL template because script origin is unknown"
              );
            return (e = e.replace("{current_host}", r.hostname)).replace(
              "{current_scheme}",
              r.protocol
            );
          });
      },
      {},
    ],
  },
  {},
  [3]
);

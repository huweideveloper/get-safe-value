!(function (n) {
  "function" == typeof define && define.amd ? define(n) : n();
})(function () {
  "use strict";
  var n = require("validate-data-type"),
    t = n.isString,
    r = n.isNumber,
    e = n.isBoolean,
    u = n.isObject,
    i = n.isArray,
    o = n.isFunction,
    f = function (n) {
      return n;
    },
    c = /[^.\[\]]+/g;
  function a(n, t) {
    if (u(n) || i(n)) return n[t];
  }
  function s(n, r, e, u, o) {
    if ((void 0 === o && (o = f), i(r)))
      return r.map(function (t) {
        return s(n, t, e, u, o);
      });
    var g = (function (n) {
      return t(n) && /[\.\[\]]+/g.test(n);
    })(r)
      ? (function (n, t) {
          for (var r = t.match(c) || [], e = n; r.length; ) e = a(e, r.shift());
          return e;
        })(n, r)
      : a(n, r);
    return u(g) ? o(g) : e;
  }
  module.exports = {
    getAny: function (n, t) {
      return s(n, t, void 0, function () {
        return !0;
      });
    },
    getString: function (n, u) {
      return s(
        n,
        u,
        "",
        function (n) {
          return t(n) || r(n) || e(n);
        },
        function (n) {
          return String(n);
        }
      );
    },
    getNumber: function (n, t) {
      return s(
        n,
        t,
        0,
        function (n) {
          return isFinite(Number(n));
        },
        function (n) {
          return Number(n);
        }
      );
    },
    getBoolean: function (n, r) {
      return s(
        n,
        r,
        !1,
        function (n) {
          return (
            t(n) && (n = n.toLowerCase()),
            e(n) || 0 === n || 1 === n || "false" === n || "true" === n
          );
        },
        function (n) {
          return Boolean(n);
        }
      );
    },
    getObject: function (n, t) {
      return s(n, t, {}, u);
    },
    getArray: function (n, t) {
      return s(n, t, [], i);
    },
    getFunction: function (n, t) {
      return s(n, t, function () {}, o);
    },
  };
});

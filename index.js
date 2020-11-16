(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['get-safe-value'] = {}));
}(this, (function (exports) { 'use strict';

  var ref = require("validate-data-type");
  var isString = ref.isString;
  var isNumber = ref.isNumber;
  var isBoolean = ref.isBoolean;
  var isObject = ref.isObject;
  var isArray = ref.isArray;
  var isFunction = ref.isFunction;

  var defaultUndefined = undefined;
  var defaultString = "";
  var defaultNumber = 0;
  var defaultBoolean = false;
  var defaultObject = {};
  var defaultArray = [];
  var defaultFunction = function () { };
  var defaultGetVal = function (value) { return value; };
  var matchPropName = /[^.\[\]]+/g;
  var isDeepKey = function (key) { return isString(key) && /[\.\[\]]+/g.test(key); };


  function getDeepValue(obj, key) {
    var keys = key.match(matchPropName) || [];
    var value = obj;
    while (keys.length) {
      value = getSingleValue(value, keys.shift());
    }
    return value;
  }

  function getSingleValue(obj, key) {
    if( isObject(obj) || isArray(obj) ) { return obj[key]; }
  }

  function getValue(obj, key, defaultValue, isType, getVal) {
    if ( getVal === void 0 ) getVal = defaultGetVal;

    if (isArray(key)) { return key.map(function (k){ return getValue(obj, k, defaultValue, isType, getVal); }); }
    var value = isDeepKey(key) ? getDeepValue(obj, key) : getSingleValue(obj, key);
    return isType(value) ? getVal(value) : defaultValue;
  }

  function getString(obj, key, defaultValue) {
    if ( defaultValue === void 0 ) defaultValue = defaultString;

    var _isString = function (value) { return isString(value) || isNumber(value) || isBoolean(value); };
    return getValue(obj, key, defaultValue, _isString, function (value) { return String(value); });
  }

  function getNumber(obj, key, defaultValue) {
    if ( defaultValue === void 0 ) defaultValue = defaultNumber;

    var _isNumber = function (value) { return isFinite(Number(value)); };
    return getValue(obj, key, defaultValue, _isNumber, function (value) { return Number(value); });
  }

  function getBoolean(obj, key, defaultValue) {
    if ( defaultValue === void 0 ) defaultValue = defaultBoolean;

    var _isBoolean = function (value) {
      if (isString(value)) { value = value.toLowerCase(); }
      return (
        isBoolean(value) ||
        value === 0 ||
        value === 1 ||
        value === "false" ||
        value === "true"
      );
    };
    return getValue(obj, key, defaultValue, _isBoolean, function (value) { return Boolean(value); });
  }

  function getObject(obj, key, defaultValue) {
    if ( defaultValue === void 0 ) defaultValue = defaultObject;

    return getValue(obj, key, defaultValue, isObject);
  }

  function getArray(obj, key, defaultValue) {
    if ( defaultValue === void 0 ) defaultValue = defaultArray;

    return getValue(obj, key, defaultValue, isArray);
  }

  function getFunction(obj, key, defaultValue) {
    if ( defaultValue === void 0 ) defaultValue = defaultFunction;

    return getValue(obj, key, defaultValue, isFunction);
  }

  function getAny(obj, key) {
    return getValue(obj, key, defaultUndefined, function () { return true; });
  }

  exports.getAny = getAny;
  exports.getArray = getArray;
  exports.getBoolean = getBoolean;
  exports.getFunction = getFunction;
  exports.getNumber = getNumber;
  exports.getObject = getObject;
  exports.getString = getString;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

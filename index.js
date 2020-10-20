
const {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
  isNull,
  isUndefined,
} = require("validate-data-type");

const defaultUndefined = undefined;
const defaultString = "";
const defaultNumber = 0;
const defaultBoolean = false;
const defaultObject = {};
const defaultArray = [];
const defaultFunction = function () { };
const defaultGetVal = value => value;
const maxNumber = Math.pow(2, 53) - 1;
const reEscapeChar = /\\(\\)?/g;
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const isDeepKey = key => isString(key) && /[\.|\[]+/g.test(key);

// Key is a string of words (" array[0].name "), into the array keys ([" array ", "0", "name"])
function getKeys(key) {
  const keys = [];
  if (isString(key)) {
    key.replace(rePropName, (match, number, quote, subString) => {
      const value = quote
        ? subString.replace(reEscapeChar, "$1")
        : number || match;
      keys.push(value);
    });
  }
  return keys;
}

// Gets the value of multiple nested objects
function getDeepValue(obj, key) {
  const keys = getKeys(key);
  let value = obj;
  while (keys.length > 0) {
    value = getSingleValue(value, keys.shift());
  }
  return value;
}

function getSingleValue(obj, key) {
  return (isObject(obj) || isArray(obj)) && !isNull(key) && !isUndefined(key) ? obj[key] : obj;
}

function getValue(obj, key, defaultValue, isType, getVal = defaultGetVal) {
  if (isArray(key)) return key.map(k=> getValue(obj, k, defaultValue, isType, getVal));
  const value = isDeepKey(key) ? getDeepValue(obj, key) : getSingleValue(obj, key);
  return isType(value) ? getVal(value) : defaultValue;
}

function getString(obj, key, defaultValue = defaultString) {
  const _isString = (value) => isString(value) || isNumber(value) || isBoolean(value); //The basic data type can be converted to a String by calling the String constructor
  return getValue(obj, key, defaultValue, _isString, value => String(value));
}

function getNumber(obj, key, defaultValue = defaultNumber) {
  const _isNumber = (value) => {
    value = Number(value);
    return (
      isFinite(value) &&
      value < maxNumber &&
      value > -maxNumber
    );
  };
  return getValue(obj, key, defaultValue, _isNumber, value => Number(value));
}

function getBoolean(obj, key, defaultValue = defaultBoolean) {
  const _isBoolean = (value) => {
    if (isString(value)) value = value.toLowerCase();
    return (
      isBoolean(value) ||
      value === 0 ||
      value === 1 ||
      value === "false" ||
      value === "true"
    );
  };
  return getValue(obj, key, defaultValue, _isBoolean, value => Boolean(value));
}

function getObject(obj, key, defaultValue = defaultObject) {
  return getValue(obj, key, defaultValue, isObject);
}

function getArray(obj, key, defaultValue = defaultArray) {
  return getValue(obj, key, defaultValue, isArray);
}

function getFunction(obj, key, defaultValue = defaultFunction) {
  return getValue(obj, key, defaultValue, isFunction);
}

function getAny(obj, key) {
  return getValue(obj, key, defaultUndefined, () => true);
}


module.exports = {
  getAny,
  getString,
  getNumber,
  getBoolean,
  getObject,
  getArray,
  getFunction,
}
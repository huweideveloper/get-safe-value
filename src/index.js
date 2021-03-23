const {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
} = require("validate-data-type");

const defaultString = "";
const defaultNumber = 0;
const defaultBoolean = false;
const defaultObject = {};
const defaultArray = [];
const defaultFunction = ()=>{};
const defaultGetVal = value => value;
const propName = /[^.\[\]]+/g;
const isDeepKey = key => isString(key) && /[\.\[\]]+/g.test(key);

function getDeepValue(obj, key) {
  const keys = key.match(propName) || [];
  let value = obj;
  while (keys.length) {
    value = getSingleValue(value, keys.shift());
  }
  return value;
}

function getSingleValue(obj, key) {
  if( typeof obj === 'object' && obj != null ) return obj[key];
}

function getValue(obj, key, defaultValue, isType, getVal = defaultGetVal) {
  if (isArray(key)) return key.map(k=> getValue(obj, k, defaultValue, isType, getVal));
  const value = isDeepKey(key) ? getDeepValue(obj, key) : getSingleValue(obj, key);
  return isType(value) ? getVal(value) : defaultValue;
}

function getString(obj, key) {
  const _isString = value => isString(value) || isNumber(value) || isBoolean(value);
  return getValue(obj, key, defaultString, _isString, value => String(value));
}

function getNumber(obj, key) {
  const _isNumber = value => isFinite(Number(value));
  return getValue(obj, key, defaultNumber, _isNumber, value => Number(value));
}

function getBoolean(obj, key) {
  const _isBoolean = value => {
    if (isString(value)) value = value.toLowerCase();
    return (
      isBoolean(value) ||
      value === 0 ||
      value === 1 ||
      value === "false" ||
      value === "true"
    );
  };
  return getValue(obj, key, defaultBoolean, _isBoolean, value => Boolean(value));
}

function getObject(obj, key) {
  return getValue(obj, key, defaultObject, isObject);
}

function getArray(obj, key) {
  return getValue(obj, key, defaultArray, isArray);
}

function getFunction(obj, key) {
  return getValue(obj, key, defaultFunction, isFunction);
}

function getAny(obj, key) {
  return getValue(obj, key, undefined, ()=>true);
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
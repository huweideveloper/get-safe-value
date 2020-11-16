
const {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
} = require("validate-data-type");

const defaultUndefined = undefined;
const defaultString = "";
const defaultNumber = 0;
const defaultBoolean = false;
const defaultObject = {};
const defaultArray = [];
const defaultFunction = function () { };
const defaultGetVal = value => value;
const matchPropName = /[^.\[\]]+/g;
const isDeepKey = key => isString(key) && /[\.\[\]]+/g.test(key);


function getDeepValue(obj, key) {
  const keys = key.match(matchPropName) || [];
  let value = obj;
  while (keys.length) {
    value = getSingleValue(value, keys.shift());
  }
  return value;
}

function getSingleValue(obj, key) {
  if( isObject(obj) || isArray(obj) ) return obj[key];
}

function getValue(obj: any, key: string|any[], defaultValue, isType, getVal = defaultGetVal) {
  if (isArray(key)) return key.map(k=> getValue(obj, k, defaultValue, isType, getVal));
  const value = isDeepKey(key) ? getDeepValue(obj, key) : getSingleValue(obj, key);
  return isType(value) ? getVal(value) : defaultValue;
}

function getString(obj: any, key: string | any[], defaultValue = defaultString) {
  const _isString: Function = (value: any): boolean => isString(value) || isNumber(value) || isBoolean(value);
  return getValue(obj, key, "", _isString, value => String(value));
}

function getNumber(obj, key, defaultValue = defaultNumber) {
  const _isNumber = value => isFinite(Number(value));
  return getValue(obj, key, defaultValue, _isNumber, value => Number(value));
}

function getBoolean(obj, key, defaultValue = defaultBoolean) {
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


export {
  getAny,
  getString,
  getNumber,
  getBoolean,
  getObject,
  getArray,
  getFunction,
}
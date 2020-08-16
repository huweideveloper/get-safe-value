
const {
  isNull,
  isUndefined,
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
const defaultFunction = function() {};
const defaultGetVal = (value) => value;
const maxNumber = Math.pow(2, 53) - 1;
const reEscapeChar = /\\(\\)?/g;
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const isCanToArray =  key =>  isString(key) && /[\.|\[]+/g.test(key);
function getProcessObject(object, k){
  if( isNull(k) || isUndefined(k) ){
    k = "randomKey";
    return {
      obj:{
        [k]: object,
      },
      key: k,
    }
  }
  return {
    obj: object,
    key: k
  }
}

// Gets the value of multiple nested objects
function getDeepValue(obj, keys) {
  keys = getKeys(keys);
  let value = obj;
  while ((isObject(value) || isArray(value)) && keys.length > 0) {
    value = value[keys.shift()];
  }
  return value;
}

// Key is a string of words (" array[0].name "), into the array keys ([" array ", "0", "name"])
function getKeys(key) {
  if( isArray(key) ) return key;
  let keys = [];
  key.replace(rePropName, (match, number, quote, subString) => {
    const value = quote
      ? subString.replace(reEscapeChar, "$1")
      : number || match;
    keys.push(value);
  });
  return keys;
}
function getSingleValue(obj, key){
  return isObject(obj) || isArray(obj) ? obj[key] : obj;
}

function getValue(object, k, defaultValue, isType, getVal = defaultGetVal) {
  const { obj, key } = getProcessObject(object, k);
  const value = isArray(key) || isCanToArray(key) ? getDeepValue(obj, key) : getSingleValue(obj, key);
  return isType(value) ? getVal(value) : defaultValue;
}


function getString(obj, key, defaultValue = defaultString) {
  const _isString = (value) => isString(value) || isNumber(value) || isBoolean(value); //The basic data type can be converted to a String by calling the String constructor
  return getValue(obj, key, defaultValue, _isString, (value) => String(value));
}

function getNumber(obj, key, defaultValue = defaultNumber) {
  const _isNumber = (value) => {
    value = Number(value);
    return (
      isNumber(value) &&
      isFinite(value) &&
      value < maxNumber &&
      value > -maxNumber
    );
  };
  return getValue(obj, key, defaultValue, _isNumber, (value) => Number(value));
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
  return getValue(obj, key, defaultValue, _isBoolean, (value) => Boolean(value) );
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
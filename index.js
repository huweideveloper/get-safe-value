
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
function getProcessObject(obj, key){
  if( isNull(key) || isUndefined(key) ){
    key = "key"+parseInt(Math.random()* 100000000);
    return {
      _obj:{
        [key]: obj,
      },
      _key: key,
    }
  }
  return {
    _obj: obj,
    _key: key
  }
}

// Gets the value of multiple nested objects
function getDeepValue(obj, keys) {
  let value = obj;
  while ((isObject(value) || isArray(value)) && keys.length > 0) {
    value = value[keys.shift()];
  }
  return value;
}

// Key is a string of words (" array [0]. The name "), into the array keys ([" array ", "0", "name"])
function getKeys(key) {
  if( !isString(key) ) return key;
  if( isString(key) && !(/[\.|[]+/g.test(key)) ) return key;
  let keys = [];
  key.replace(rePropName, (match, number, quote, subString) => {
    const value = quote
      ? subString.replace(reEscapeChar, "$1")
      : number || match;
    keys.push(value);
  });
  return keys;
}

function getDefaultValue(key, defaultValue, isType) {
  let value = defaultValue;
  if (isString(defaultValue)) value = "''";
  if (isArray(defaultValue)) value = "[]";
  if (isObject(defaultValue)) value = "{}";
  const name = isType.name.replace(/(_is|is)/i, "get");
  console.warn(
    "Call " +
      name +
      " function returns the default:" +
      value +
      ", Please check that the data is correct. " + "key is: '" + key +"'"
  );
  return defaultValue;
}

function getValue(obj, key, defaultValue, isType, getVal = defaultGetVal) {
  const { _obj, _key } = getProcessObject(obj, key);
  if (!isObject(_obj) && !isArray(_obj)) return getDefaultValue(_key, defaultValue, isType);
  const keys = getKeys(_key);
  const value = isArray(keys) ? getDeepValue(_obj, keys) : _obj[keys];
  return isType(value) ? getVal(value) : getDefaultValue(_key, defaultValue, isType);
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
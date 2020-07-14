
const {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  isFunction,
  isAsyncFunction,
} = require("./type");

const defaultUndefined = undefined;
const defaultString = "";
const defaultNumber = 0;
const defaultBoolean = false;
const defaultObject = {};
const defaultArray = [];
const defaultFunction = function() {};
const defaultAsyncFunction = async function() {};
const defaultGetVal = (value) => value;
const maxNumber = Math.pow(2, 53) - 1;
const minNumber = -(Math.pow(2, 53) - 1);
const reEscapeChar = /\\(\\)?/g;
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

// 获取多次嵌套对象的值
function getDeepValue(obj, keys) {
  let value = obj;
  const _keys = JSON.parse(JSON.stringify(keys));
  while ((isObject(value) || isArray(value)) && _keys.length > 0) {
    value = value[_keys[0]];
    _keys.shift();
  }
  return value;
}

// key是字符串的话 ( "array[0].name" )，转成数组keys (["array","0","name"])
function getKeys(key) {
  if( !isString(key) ) return key;
  if( isString(key) && !(/\.+/g.test(key)) ) return key;
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

// 所有的取值都交给getValue来处理
function getValue(obj, key, defaultValue, isType, getVal = defaultGetVal) {
  if (!isObject(obj) && !isArray(obj)) return getDefaultValue(key, defaultValue, isType);
  const keys = getKeys(key);
  const value = isArray(keys) ? getDeepValue(obj, keys) : obj[keys];
  return isType(value) ? getVal(value) : getDefaultValue(key, defaultValue, isType);
}

/**
 *
 * @param {Object} obj
 * @param {String||Array} key
 * @param {*} [defaultValue=defaultString]
 * @returns
 * 例子：
 *  const obj = {
 *    str: "a",
 *    number: 10,
 *    child:{ str: "aa" },
 *    array:[
 *     {
 *       str: "b",
 *        number: 20
 *      },
 *      {
 *       str: "c",
 *       list:[1,2,3]
 *      }
 *    ]
 *  }
 *  getString(obj,"str");                         //"a"
 *  getString(obj,"number");                      //"10"
 *  getString(obj,"array[0].str");                //"b"
 *  getString(obj,"array[1].list[0]");            // "1"
 *  getString(obj,"child.str");                  //"aa"
 *  getString(obj,["child","str"]);               //"aa"
 */
function getString(obj, key, defaultValue = defaultString) {
  const _isString = (value) => isString(value) || isNumber(value) || isBoolean(value); //基本数据类型能转成字符串的，调用toString转成字符串
  return getValue(obj, key, defaultValue, _isString, (value) => String(value));
}

function getNumber(obj, key, defaultValue = defaultNumber) {
  const _isNumber = (value) => {
    value = Number(value);
    return (
      isNumber(value) &&
      isFinite(value) &&
      value < maxNumber &&
      value > minNumber
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
  const _isFunction = (value) => isFunction(value) || isAsyncFunction(value);
  return getValue(obj, key, defaultValue, _isFunction);
}

function getAsyncFunction(obj, key, defaultValue = defaultAsyncFunction) {
  return getValue(obj, key, defaultValue, isAsyncFunction);
}

function getAny(obj, key) {
  return getValue(obj, key, defaultUndefined, () => true);
}

function getFn(type) {
  type = isString(type) ? type.toLowerCase() : "";
  const config = {
    string: getString,
    number: getNumber,
    boolean: getBoolean,
    object: getObject,
    array: getArray,
    function: getFunction,
  };
  return config.hasOwnProperty(type) ? config[type] : getString;
}

/**
 *批量处理object对象
  * 例：入参 obj = { name: 'zhangsan', age: 30, height: '' },
  *         keys = [
  *            ['name','string'],
  *            ['age','number'],
  *            ['height', 'number'],
  *          ]
  *    出参 { name: 'zhangsan', age: 30, height: 0 }
  * @param {Object} obj
  * @param {Array} keys
  * @param {any} [defaultValue=defaultObject]
  * @returns {Object }
  * @memberof MapUtils
  */
function getObjectBatch(obj, keys, defaultValue = defaultObject) {
  if (!isObject(obj)) return defaultValue;
  if (!isArray(keys)) return obj;
  keys.forEach((item) => {
    const [key, type, defaultValue] = [getString(item, 0), getString(item,1), getAny(item,2)];
    if (obj.hasOwnProperty(key)) {
      const fn = getFn(type);
      obj[key] = fn(obj, key, defaultValue);
    }
  });
  return obj;
}

function getArrayBatch(array, keys, defaultValue = defaultArray) {
  if (!isArray(array)) return defaultValue;
  if (!isArray(keys)) return array;
  array.forEach((item, i) => {
    array[i] = getObjectBatch(item, keys);
  });
  return array;
}


module.exports = {
  getAny,
  getString,
  getNumber,
  getBoolean,
  getObject,
  getArray,
  getFunction,
  getAsyncFunction,
  getObjectBatch,
  getArrayBatch,
}
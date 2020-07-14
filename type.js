const isType = (obj, type) => Object.prototype.toString.call(obj) === '[object '+type+']';
const isUndefined = (obj) => isType(obj, 'Undefined');
const isNull = (obj) => isType(obj, 'Null');
const isString = (obj) => isType(obj, 'String');
const isBoolean = (obj) => isType(obj, 'Boolean');
const isNumber = (obj) => isType(obj, 'Number');
const isFunction = (obj) => isType(obj, 'Function');
const isAsyncFunction = (obj) => isType(obj, 'AsyncFunction');
const isArray = (obj) => isType(obj, 'Array');
const isObject = (obj) => isType(obj, 'Object');
const isMap = (obj) => isType(obj, 'Map');
const isSet = (obj) => isType(obj, 'Set');
const isSymbol = (obj) => isType(obj, 'Symbol');


module.exports = {
    isUndefined,
    isNull,
    isString,
    isBoolean,
    isNumber,
    isFunction,
    isAsyncFunction,
    isArray,
    isObject,
    isMap,
    isSet,
    isSymbol
}
'use strict';
const _toString = Object.prototype.toString;
const isType = (obj, type) => _toString.call(obj) === '[object '+type+']';
const isNull = (obj) => isType(obj, 'Null');
const isUndefined = (obj) => isType(obj, 'Undefined');
const isString = (obj) => isType(obj, 'String');
const isBoolean = (obj) => isType(obj, 'Boolean');
const isNumber = (obj) => isType(obj, 'Number');
const isFunction = (obj) => isType(obj, 'Function');
const isAsyncFunction = (obj) => isType(obj, 'AsyncFunction');
const isArray = (obj) => isType(obj, 'Array');
const isObject = (obj) => isType(obj, 'Object');


module.exports = {
    isNull,
    isUndefined,
    isString,
    isBoolean,
    isNumber,
    isFunction,
    isAsyncFunction,
    isArray,
    isObject,
}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        const isType = (obj, type) => Object.prototype.toString.call(obj) === '[object ' + type + ']';
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

        // Gets the value of multiple nested objects
        function getDeepValue(obj, keys) {
            let value = obj;
            const _keys = JSON.parse(JSON.stringify(keys));
            while ((isObject(value) || isArray(value)) && _keys.length > 0) {
                value = value[_keys[0]];
                _keys.shift();
            }
            return value;
        }

        // Key is a string of words (" array [0]. The name "), into the array keys ([" array ", "0", "name"])
        function getKeys(key) {
            if (!isString(key)) return key;
            if (isString(key) && !(/[\.|[]+/g.test(key))) return key;
            let keys = [];
            key.replace(rePropName, (match, number, quote, subString) => {
                const value = quote ?
                    subString.replace(reEscapeChar, "$1") :
                    number || match;
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
                ", Please check that the data is correct. " + "key is: '" + key + "'"
            );
            return defaultValue;
        }

        function getValue(obj, key, defaultValue, isType, getVal = defaultGetVal) {
            if (!isObject(obj) && !isArray(obj)) return getDefaultValue(key, defaultValue, isType);
            const keys = getKeys(key);
            const value = isArray(keys) ? getDeepValue(obj, keys) : obj[keys];
            return isType(value) ? getVal(value) : getDefaultValue(key, defaultValue, isType);
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
            return getValue(obj, key, defaultValue, _isBoolean, (value) => Boolean(value));
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

        function getObjectBatch(obj, keys, defaultValue = defaultObject) {
            if (!isObject(obj)) return defaultValue;
            if (!isArray(keys)) return obj;
            keys.forEach((item) => {
                const [key, type, defaultValue] = [getString(item, 0), getString(item, 1), getAny(item, 2)];
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

        const obj = {
                str: "a",
                number: 10,
                bool: true,
                array: ["1", 1, true, [1, 2]],
                child: {
                    str: "b",
                    number: "20",
                    array: [{
                        str: "c",
                        number: 30
                    }, {
                        str: "d",
                        number: 40
                    }],
                    n: NaN,
                    maxNumber: Math.pow(2, 60),
                },
                fn: function(age) {
                    return age
                }
            }
            // getString
            // console.log(getString(obj, "str")); //'a'
            // console.log(getString(obj, "number")); //'10' 字符串 数组 和布尔值，都会调用String构造函数转成String类型
            // console.log(getString(obj, "array")); //''
            //console.log(getString(obj, "child", "hello")); // 'hello' 
            // console.log(getString(obj, "array")); //''
            // console.log(getString(obj, "child")); //''
            // console.log(getString(obj, "child.str")); //'b'
            // console.log(getString(obj, ["child", "str"])); //'b'
            // console.log(getString(obj, "child.array[0].str")); //'c'
            // console.log(getString(obj, ["child", "array", 0, "str"])); //'c'

        //getNumber
        // console.log(getNumber(obj, "number")); //10
        // console.log(getNumber(obj, "str")); //0 类型不匹配默认返回Number:0
        // console.log(getNumber(obj, "child.number")); //20, 字符串会调用Number构造函数转成Number类型
        // console.log(getNumber(obj, "child.n")); //0 NaN不是有效数组
        // console.log(getNumber(obj, "child.maxNumber")); //0 超过了最大安全的number值: Math.pow(2, 53) - 1

        //getBoolean
        // console.log(getBoolean(obj, "bool")) // true
        // console.log(getBoolean(obj, "number")) // false

        //getObject
        // console.log(getObject(obj, "str")) // {}
        // console.log(getObject(obj, "child")) // {str: "b", number: "20",……}

        //getArray
        // console.log(getArray(obj, "array")) // ["1", 1, true, [1, 2]]
        // console.log(getArray(obj, "array[3]")) // [1, 2]

        //getFunction
        // console.log(getFunction(obj, "fn")) // function(age) { return age }
        // console.log(getFunction(obj, "number")) // function(){}

        //getAny
        // console.log(getAny(obj, "str")) // 'a'
        // console.log(getAny(obj, "number")) // 10,
        // console.log(getAny(obj, "hello")) // undefined
    </script>
</body>

</html>
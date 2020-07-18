
[中文文档](https://github.com/huweicool/get-safe-value/blob/master/README-Chinese.md)

# get-safe-value
A utility library that safely retrieves a value from an object.
In the actual development process, the front-end and the back-end use APIS to exchange data and often encounter errors caused by data type mismatch. For example, if the API should return an Array, but returns a NULL type, we would call Array's method function directly (or make a judgment, but this would be tedious), and the code would report an error and cause the program to break, which is a serious problem on the client side and greatly affects the user experience. So we need a utility function method to make sure we get the right data type.


## Install

Install with [npm](https://www.npmjs.com/package/get-safe-value)

```sh
  npm install --save get-safe-value
```


## Usage

```js
const { getString, getNumber, getBoolean, getObject, getArray, getFunction, getAny } =  require('get-safe-value');
// or
// import { getString, getNumber, getBoolean, getObject, getArray, getFunction, getAny } from 'get-safe-value';
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
console.log(getString(obj, "str")); //'a'
console.log(getString(obj, "number")); //'10'  String array and Boolean, both call String constructor to String type
console.log(getString(obj, "array")); //''
console.log(getString(obj, "child", "hello")); // 'hello' 
console.log(getString(obj, "array")); //''
console.log(getString(obj, "child")); //''
console.log(getString(obj, "child.str")); //'b'
console.log(getString(obj, ["child", "str"])); //'b'
console.log(getString(obj, "child.array[0].str")); //'c'
console.log(getString(obj, ["child", "array", 0, "str"])); //'c'

//getNumber
console.log(getNumber(obj, "number")); //10
console.log(getNumber(obj, "str")); //0 Type mismatch default return Number：0 Number：0
console.log(getNumber(obj, "child.number")); //20, The string calls Number constructor to Number type
console.log(getNumber(obj, "child.n")); //0 NaN are not valid figures
console.log(getNumber(obj, "child.maxNumber")); //0 Over the maximum safe number value: Math.pow(2,53)-1.

//getBoolean
console.log(getBoolean(obj, "bool")) // true
console.log(getBoolean(obj, "number")) // false

//getObject
console.log(getObject(obj, "str")) // {}
console.log(getObject(obj, "child")) // {str: "b", number: "20",……}

//getArray
console.log(getArray(obj, "array")) // ["1", 1, true, [1, 2]]
console.log(getArray(obj, "array[3]")) // [1, 2]

//getFunction
console.log(getFunction(obj, "fn")) // function(age) { return age }
console.log(getFunction(obj, "number")) // function(){}

//getAny
console.log(getAny(obj, "str")) // 'a'
console.log(getAny(obj, "number")) // 10,
console.log(getAny(obj, "hello")) // undefined
```



## Test

```sh
  npm test
```
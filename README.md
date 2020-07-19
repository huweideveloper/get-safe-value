
[中文文档](https://github.com/huweicool/get-safe-value/blob/master/README-Chinese.md)

# get-safe-value

 In a secure way, a library of function tools for obtaining values of a particular data type.

#  Why is it important to secure a particular data type value

we have all encountered problems in the actual development process caused by data format or data type errors when using API for data exchange before and after, which is very common in JavaScript this weak type programming language. One type of data, for example, should be Array, the result is obtained null, calling a Array method will report an error. or multi-layer nesting of data, to get a particular value requires a lot of judgment to avoid errors. Data type errors often lead to program interruptions, which is a serious problem that greatly affects the user experience.

Examples that cause program errors:

```js
const a = {
  child:{
    child:{
      arr:null
    }
  }
}
const arr = a.child.child.arr;
arr.forEach(item=>{}) //Error, arr is not an array
// or
if( Array.isArray(arr) ){		// Not recommended, need to make additional judgment
   // Do something
}

console.log(a.b.child); //Error, object a no property b
//or
if( a && a.b && a.b.child  ){	// Not recommended, also need to make additional judgment
   //Do something
}
```

#  why use get-safe-value in the project

 By using get-safe-value in a project, you can avoid the error example above, and when you get a data, make sure that the type of data is what we expect, so that you can safely call methods or display them on the user interface, avoiding the catastrophic consequences of program interruptions.

Consider using get-safe-value to handle the above error examples

```js
// Install "get-safe-value" first( npm install --save get-safe-value )
import { getArray, getObject } from 'get-safe-value';
const a = {
  child:{
    child:{
      arr:null
    }
  }
}
const arr = getArray(a,'child.child.arr');
console.log(arr); // [] Get the empty array
arr.forEach(item=>{}) //arr is our expected array object, no error

const child = getObject(a, 'b.child');
console.log(child); // {}  Get empty object
console.log(child.hasOwnProperty("key")) // child we expect Object, will not report errors

```


## Install

Install with [npm](https://www.npmjs.com/package/get-safe-value)

```sh
  npm install --save get-safe-value
```


## Usage

```js
import { getString, getNumber, getBoolean, getObject, getArray, getFunction, getAny } from 'get-safe-value';
// or
// const { getString, getNumber, getBoolean, getObject, getArray, getFunction, getAny } =  require('get-safe-value');
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
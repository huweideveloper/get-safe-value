[英文文档](https://github.com/huweicool/get-safe-value#readme)

# get-safe-value

用一种安全的方式，获取某种特定数据类型的值的函数工具库。



## 安装

Install with [npm](https://www.npmjs.com/package/get-safe-value)

```sh
  npm install --save get-safe-value
```



## 使用


```js
import { getString, getNumber, getBoolean, getObject, getArray, getFunction, getValues, getAny } from 'get-safe-value';
// or
// const { getString, getNumber, getBoolean, getObject, getArray, getFunction, getValues, getAny } =  require('get-safe-value');
const obj = {
	name: 'lucas',
	age: 30,
	brother: [
		{ 
			name: 'jack',
			age: 25,
		}
	],
	getName: ()=>{
		return this.name;
	},
}
// getString
console.log(getString(obj, "name")); // 'lucas'
console.log(getString(obj, "age")); // '30'  字符串 数组 和布尔值，都会调用String构造函数转成String类型
console.log(getString(obj, "helloWorld")); // ''
console.log(getString(obj, "helloWorld", "hello")); // "hello"为默认值，当helloWorld属性不是字符串时返回默认值
console.log(getString(obj, "brother[0].name")); // 'jack'
console.log(getString(obj, ["name", "brother[0].name"])); // ["lucas", "jack"]

//getNumber
console.log(getNumber(obj, "age")); //30
console.log(getNumber(obj, "name")); //0

//getBoolean
console.log(getBoolean({is: true}, "is")) // true
console.log(getBoolean({is: false}, "is")) // false
console.log(getBoolean({is: false}, "hello")) // false

//getObject
console.log(getObject(obj, "brother[0]")) // { name:'jack', age: 25 }
console.log(getObject(obj, "hello")) // {}

//getArray
console.log(getArray(obj, "brother")) // [{ name:'jack', age: 25 }]
console.log(getArray(obj, "name")) // []

//getFunction
console.log(getFunction(obj, "name")) // function(){}
console.log(getFunction(obj, "getName")) // function getName(){}

//getAny
console.log(getAny(obj, "name")) // 'lucas'
console.log(getAny(obj, "age")) // 30,
console.log(getAny(obj, "hello")) // undefined

//getValues
console.log(getValues(obj, ["name", "age"], ["string", "number"])) // ['lucas', 30]
console.log(getValues(obj, ["name", "age"], "string")) // ['lucas', '30']
console.log(getValues(obj, ["name", "age"], ["string"])) // ['lucas', '30']
console.log(getValues(obj, ["name", "age"])) // ['lucas', 30]
console.log(getValues(obj, ["brother", "getName"], ["array", "function"])) // [[{ name:'jack', age: 25 }], function getName(){}]
console.log(getValues(obj, ["brother[0].age", "getName"], ["number", "object"])) // [25, {}]
```


## 方法

| method | Return type |
| ------ | ------ |
| getString | String |
| getNumber | Number |
| getBoolean | Boolean |
| getObject | Object |
| getArray | Array |
| getFunction | Function || asyncFunction |
| getValues | Array |
| getAny | Any |



## 测试
更多例子查看测试
```sh
  npm test
```
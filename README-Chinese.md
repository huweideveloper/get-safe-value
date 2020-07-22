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
console.log(getString(obj, "number")); //'10' 字符串 数组 和布尔值，都会调用String构造函数转成String类型
console.log(getString(obj, "array")); //''
console.log(getString(obj, "child", "hello")); // 'hello' 
console.log(getString(obj, "array")); //''
console.log(getString(obj, "child")); //''
console.log(getString(obj, "child.str")); //'b'
console.log(getString(obj, "child.array[0].str")); //'c'
console.log(getString(obj, ["child", "str"])); //'b'
console.log(getString(obj, ["child", "array", 0, "str"])); //'c'
console.log(getString("hello")); //'hello'
console.log(getString(null)); //''
console.log(getString({})); //''
console.log(getString([])); //''

//getNumber
console.log(getNumber(obj, "number")); //10
console.log(getNumber(obj, "str")); //0 类型不匹配默认返回Number:0
console.log(getNumber(obj, "child.number")); //20, 字符串会调用Number构造函数转成Number类型
console.log(getNumber(obj, "child.n")); //0 NaN不是有效数字
console.log(getNumber(obj, "child.maxNumber")); //0 超过了最大安全的number值: Math.pow(2, 53) - 1
console.log(getNumber("hello")); //0
console.log(getNumber("123")); //123
console.log(getNumber(null)); //0
console.log(getNumber({})); //0
console.log(getNumber([])); //0

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



## 测试
更多例子查看测试
```sh
  npm test
```
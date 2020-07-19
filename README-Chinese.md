[英文文档](https://github.com/huweicool/get-safe-value#readme)

# get-safe-value

用一种安全的方式，获取某种特定数据类型的值的函数工具库。

# 为什么安全获取某种特定数据类型值很重要

在实际开发过程中，我们都遇到过前后端使用API进行数据交换时，数据格式或数据类型错误导致的问题，在JavaScript这种弱类型编程语言中非常常见。比如某个数据类型应该是Array，结果得到了null，调用Array的某个方法就会报错。或者数据多层嵌套，想要获取到某个特定的值需要做很多判断来避免错误。数据类型错误往往会导致程序中断，这是一个很严重的问题，非常影响用户体验。

会导致程序错误的例子：

```js
const a = {
  child:{
    child:{
      arr:null
    }
  }
}
const arr = a.child.child.arr;
arr.forEach(item=>{}) //错误，arr不是数组
// 或者
if( Array.isArray(arr) ){		//不推荐，需要做额外的判断
   // Do something
}

console.log(a.b.child); //错误，对象a没有属性b
//或者
if( a && a.b && a.b.child  ){	//不推荐，同样需要做额外的判断
   //Do something
}
```

# 为什么要在项目中使用 get-safe-value

在项目中使用 get-safe-value能避免上面的错误例子，在获取某个数据时，确保数据的类型是我们所预期的，从而可以放心的调用方法或显示在用户界面上，避免产生程序中断这种灾难性的后果。

看看使用get-safe-value来处理上面错误例子

```js
// 请先安装 "get-safe-value"  npm install --save get-safe-value
import { getArray, getObject } from 'get-safe-value';
const a = {
  child:{
    child:{
      arr:null
    }
  }
}
const arr = getArray(a,'child.child.arr');
console.log(arr); // [] 得到空数组
arr.forEach(item=>{}) //arr是我们预期的数组对象，不会报错

const child = getObject(a, 'b.child');
console.log(child); // {}, 得到空对象Object
console.log(child.hasOwnProperty("key")) // child是我们预期的Object，不会报错

```



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

//getNumber
console.log(getNumber(obj, "number")); //10
console.log(getNumber(obj, "str")); //0 类型不匹配默认返回Number:0
console.log(getNumber(obj, "child.number")); //20, 字符串会调用Number构造函数转成Number类型
console.log(getNumber(obj, "child.n")); //0 NaN不是有效数字
console.log(getNumber(obj, "child.maxNumber")); //0 超过了最大安全的number值: Math.pow(2, 53) - 1

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

```sh
  npm test
```
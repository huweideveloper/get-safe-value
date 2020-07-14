# get-safe-value
可以安全获取对象某个值的实用函数库。
在实际开发过程中，前端和后台使用API进行数据的传递，经常会遇到数据类型不匹配导致的报错。比如API应该返回一个Array，结果确返回了一个null类型，这时候我们去直接调用Array的方法函数(或者做一层判断，但这又会显得繁琐)，代码会报错导致程序中断，这在客户端是一个严重的问题，严重印象用户体验。所以这时候需要一个工具函数方法，确保我们想要Array，就一定能获取到Array这个正确数据类型。

## Usage
注：测试用例稍后补上。
```js
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
console.log(getString(obj, ["child", "str"])); //'b'
console.log(getString(obj, "child.array[0].str")); //'c'
console.log(getString(obj, ["child", "array", 0, "str"])); //'c'

//getNumber
console.log(getNumber(obj, "number")); //10
console.log(getNumber(obj, "str")); //0 类型不匹配默认返回Number:0
console.log(getNumber(obj, "child.number")); //20, 字符串会调用Number构造函数转成Number类型
console.log(getNumber(obj, "child.n")); //0 NaN不是有效数组
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
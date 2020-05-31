### ES6
### let、const
两者为变量提供了一个块级作用域的概念，且不可重新声明，太基础，不给你写了。let 声明的变量可以被修改，而const不可以。
```
const obj = {};
obj.a = 1;   // right
obj = {a:1}  // wrong
```  

|         | var | let | const |
| ------- | ----|-----|------ |
| 变量提升 |  √  |  x  |  x  |
| 全局变量 |  √  |  x  |  x  |
| 重复声明 |  √  |  x  |  x  |
| 重新赋值 |  √  |  √  |  x  |
| 暂时死区 |  x  |  √  |  √  |
| 块级作用域 |  x  |  √  |  √  |
| 只声明不初始化 |  √  |  √  |  x  |


### Class
在es6之前：
```
function Person(name,age){
  this.name = name;
  this.age = age;
}
Person.prototype.infor = func(){
  return 'My name is' + name + ',I am' + this.age;
}
```
在es6：
```
class Person {
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
  infor () {
    return 'My name is' + name + ',I am' + this.age;
  }
}
```
### 继承
```
class Kid extands Person{
  constructor(name, age){
    super(name, age)
  }
  cray() {
    return '😭'
  }
}
```
[继承传送门](/JavaScript/继承.md)
### 箭头函数
箭头函数没有自己的this，arguments, super或者new.target。不能用作构造函数。
```
let fn = () => {
  console.log(this) 
}
```
### 函数参数默认值
```
func fn(params = {}){
  return params;
}
fn(); // {}
```
### 模板字符串
```
let str = `我全宇宙最屌~`
```
### 解构赋值
```
// 交换两变量的值
let a = 10;
let b = 11;
[a, b] = [b, a]; // a 11,b 10

let {m, n} = {n:1,m:2}; // m 2,n 1
```
### 模块化
```
//CommonJs（匿名函数自调用、同步加载）
a.js
exports.name = 'XZ';
modules.exports = {
  name: 1
};
b.js
console.log(require('a.js').name); // XZ

// AMD（异步加载，依赖require.js模块管理工具，世界上为啥会有这种东西）
a.js
define(func(){
  var add = func(x,y){
    return x+y
  }
  return {
    add: add
  }
});
b.js
define(['a'], function(a) {
  console.log(a.add(1,2))
})

// CMD
...
```
ES6
- 模块化规范输出的是值的拷贝，而ES6输出的是值得引用
- 模块化规范是运行时加载，ES6模块是编译时输出接口

```
a.js
export const name = 1;

b.js
import a from 'a.js';
console.log(a); // {name: 1}
```
### 扩展符（我最喜欢的东西）
当此符放于方法的参数中时为合并剩余参数为一个arg数组，当用于其他位置的时候为展开，Array和Object都可以食用。
```
func fn (...arg) {
  console.log(...arg) // 1 2 3 4 5 6
}
fn(1,2,3,4,5,6);
```
### 对象属性简写
```
const a = 1;
const b = 1;
const c = 1;

const obj = {
  a,b,c
}
obj; // {a: 1, b: 1, c: 1}
```
### Promise
一种异步解决方案，来处理回调地狱问题的。有三种状态pending、resolved、rejected。
```
new Promise((res,rej)=>{
  console.log(1)
  setTimeout(()=>{
    res('ok')
  }, 1000)
}).then(res=>{
  console.log(res)  // ok
  return 123
}).then(res=>{
  console.log(res)  // 123
}).then(res=>{
  console.log(res)  // undefined
}).then(res=>{
  throw new Error(123)
}).catch(err=>{
  console.log(err) // Error: 123
})

setTimeout(()=>{
  console.log(2)
},1000)
```
上述结果：1 ok 123 undefined Error 2  
[Promise详解](/JavaScript/promise.md) [Event Loop](/面试题合集/EventLoop.md)
### for…of
for...of语句在可迭代对象（包括 `Array，Map，Set，String，TypedArray，arguments` 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。  
### Synbol
一种新的基本数据类型，产生的作用：每个从Symbol()返回的symbol值都是唯一的，能作为对象属性的标识符。  
### Iterator(迭代器)/Generator(生成器)
迭代器对象可以通过重复调用next()显示地迭代，从而获取该对象每一级的值，直到迭代完成，返回`{valus: undefined, done: true}`;
生成器函数使用`function*`语法编写。最初调用时，生成器函数不执行任何代码，而是返回一种称为Generator的迭代器。通过调用生成器的下一个方法消耗值时，Generator函数将执行，直到遇到yield关键字。  
可以根据需要多次调用该函数，并且每次都返回一个新的Generator，但每个Generator只能迭代一次。
```
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}
var a = makeRangeIterator(1,10,2)
a.next() // {value: 1, done: false}
a.next() // {value: 3, done: false}
a.next() // {value: 5, done: false}
a.next() // {value: 7, done: false}
a.next() // {value: 9, done: false}
a.next() // {value: undefined, done: true}
```
### Set
Set对象允许储存任何类型的唯一值，参数为数组。此对象可被扩展符降维打击。
```
let a = new Set([1,,5,5]) // Set(3)(1,undefined,5)
[...a]                    // [1, undefined, 5]
```
### Map
拥有get、set、delete、has方法，Map对象的键可以是任意数据类型的。
```
var myMap = new Map();
myMap.set(NaN, "not a number");

myMap.get(NaN); // "not a number"

var otherNaN = Number("foo");
myMap.get(otherNaN); // "not a number"
```
### Proxy
代理，用于定义基本操作的自定义行为（属性查找，赋值，枚举，函数调用等），也是Vue3.0中最重要的东西。  
`Reflect`是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与 `Proxy` 的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。  
`Proxy`跟`Reflect`是非常完美的配合，例子如下：
```
const observe = (data, callback) => {
      return new Proxy(data, {
            get(target, key) {
                return Reflect.get(target, key)
            },
            set(target, key, value, proxy) {
                  callback(key, value);
                  target[key] = value;
                    return Reflect.set(target, key, value, proxy)
            }
      })
}

const FooBar = { open: false };
const FooBarObserver = observe(FooBar, (property, value) => {
  property === 'open' && value 
          ? console.log('FooBar is open!!!') 
          : console.log('keep waiting');
});
console.log(FooBarObserver.open) // false
FooBarObserver.open = true // FooBar is open!!!
```
如果对象带有`configurable(是否可删除): false` 跟`writable(是否可修改): false` 属性，则代理失效。 const的实现由此而来。
### Regex对象的扩展
- i 忽略大小写
```
/[a-z]/i.test('A') // true
```
- u unicode模式
- y lastIndex

### Math对象的扩展
- 二进制表示法 : 0b或0B开头表示二进制(0bXX或0BXX)

- 二进制表示法 : 0b或0B开头表示二进制(0bXX或0BXX)

- 八进制表示法 : 0o或0O开头表示二进制(0oXX或0OXX)

- Number.EPSILON : 数值最小精度

- Number.MIN_SAFE_INTEGER : 最小安全数值(-2^53)

- Number.MAX_SAFE_INTEGER : 最大安全数值(2^53)

- Number.parseInt() : 返回转换值的整数部分

- Number.parseFloat() : 返回转换值的浮点数部分

- Number.isFinite() : 是否为有限数值

- Number.isNaN() : 是否为NaN

- Number.isInteger() : 是否为整数

- Number.isSafeInteger() : 是否在数值安全范围内

- Math.trunc() : 返回数值整数部分

- Math.sign() : 返回数值类型(正数1、负数-1、零0)

- Math.cbrt() : 返回数值立方根

- Math.clz32() : 返回数值的32位无符号整数形式

- Math.imul() : 返回两个数值相乘

- Math.fround() : 返回数值的32位单精度浮点数形式

- Math.hypot() : 返回所有数值平方和的平方根

- Math.expm1() : 返回e^n - 1

- Math.log1p() : 返回1 + n的自然对数(Math.log(1 + n))

- Math.log10() : 返回以10为底的n的对数

- Math.log2() : 返回以2为底的n的对数

- Math.sinh() : 返回n的双曲正弦

- Math.cosh() : 返回n的双曲余弦

- Math.tanh() : 返回n的双曲正切

- Math.asinh() : 返回n的反双曲正弦

- Math.acosh() : 返回n的反双曲余弦

- Math.atanh() : 返回n的反双曲正切

### Array对象的扩展
- Array.from: 转换具有Iterator接口的数据结构为真正数组，返回新数组。
- Array.of: Array.of(1,2,3) => [1,2,3]
- Array.prototype.find: 返回第一个符合条件的成员
- Array.prototype.findIndex: 返回第一个符合条件的成员索引
- Array.prototype.fill(value, start, end): 填充数组
- Array.some: 判断元素中是否至少有一个符合条件的
- Array.every: 判断所有元素是否全部符合条件
- Array.prototype.keys()：返回以索引值为遍历器的对象
- Array.prototype.values()：返回以属性值为遍历器的对象

### ES7
### Array.prototype.includes()
用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。
### 幂运算符**
幂运算符**，具有与Math.pow()一样的功能。

### ES8
### async/await
```
async function myFetch() {
      let response = await fetch('coffee.jpg')
      let myBlob = await response.blob()

      let objectURL = URL.createObjectURL(myBlob)
      let image = document.createElement('img')
      image.src = objectURL
      document.body.appendChild(image)
}
myFetch()
```
### Object.values()
返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

### ES9
### for await...of
`for await...of` 语句会在异步或者同步可迭代对象上创建一个迭代循环，包括 `String，Array，Array-like` 对象（比如`arguments` 或者`NodeList`)，`TypedArray，Map， Set`和自定义的异步或者同步可迭代对象。其会调用自定义迭代钩子，并为每个不同属性的值执行语句。
```
async function* asyncGenerator() {
      var i = 0
      while (i < 3) {
            yield i++
      }
}

(async function() {
      for await (num of asyncGenerator()) {
            console.log(num)
      }
})()
// 0
// 1
// 2
```
### 对象扩展操作符
```
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// 克隆后的对象: { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// 合并后的对象: { foo: "baz", x: 42, y: 13 }
```
### Promise.prototype.finally()
顾名思义...

### ES10
- 私有元素与方法
```
  class Person {
    ...
    #DNA = '123123';
    set #x(dna) { 
      this.#DNA = dna
    }
  }
```
...实在是学不动了，别打了，别打了。

ES6
===
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

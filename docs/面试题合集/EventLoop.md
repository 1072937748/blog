### EventLoop
现在基本被面烂了的题目了，直接code test吧。  
首先这是一个执行模型，在不同地方有不同实现。不是某个对象、属性、方法之类的东西。
- 浏览器的Event Loop是在html5的规范中明确定义。
- NodeJS的Event Loop是基于libuv实现的。可以参考Node的官方文档以及libuv的官方文档。
- libuv已经对Event Loop做出了实现，而HTML5规范中只是定义了浏览器中Event Loop的模型，具体的实现留给了浏览器厂商。

!> 浏览器中和NodeJs中的EventLoop是不一样的。
```
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);
// 1
// 4
// 7
// 5
// 2
// 3
// 6
```
*解析：三个概念：`堆栈队列、宏队列、微队列`。每轮执行顺序为`堆栈队列` > `微队列` > `宏队列`。*

微队列：
- Promise
- process.nextTick
- MutationObserver

宏队列：
- setTimeout
- setInterval
- requestAnimationFrame
- setImmediate

#### 任务优先级
宏队列: 主代码块 > setImmediate > MessageChannel > setTimeout / setInterval  
微队列: process.nextTick > Promise=MutationObserver
#### NodeJs中的EventLoop
欲言又止mmp...
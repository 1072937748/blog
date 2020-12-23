# Vue性能优化
- vue代码层面优化
- webpack配置层面优化
- 基础web技术层面优化

#### v-if和v-show
v-if真正的条件渲染，因为他会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；而v-show不管初始条件是什么都会被渲染，并且只是简单地基于css变换；所以v-if更适用于切换不频繁的场景中。
#### computed和watch
computed：计算属性，依赖其他响应式数据，并且computed有缓存的特性，只有他依赖的属性值发生改变，下一次获取值时才会重新计算；  
watch: 更多的是监听作用，当被监听数据发生变化时才会执行；  

#### v-for遍历必须为item添加key，且避免同时使用v-if
1. 添加key值方便vue内部机制精准找到该条列表数据，state更新是，能更快定位到diff。
2. v-for比v-if优先级要高，同时使用会造成不必要的性能浪费，推荐使用computed;

#### 长列表性能优化
针对那些只提供渲染，不会有任何改变的值（即不需要数据劫持做响应式的），建议使用Object.freeze的方法来冻结一个对象；
!> 例如`this.list = Object.freeze(res.data.list)`;vue只是不再做list内部属性的劫持，而非不对list做劫持，list后期的修改还是能够渲染的。

!> 这里梳理的时候发现一个问题。Object.freeze需要在变量赋值到data之前做冻结操作。
 ```JavaScript
  // vue
  data(){
    return {
      obj: {
        id: 0, // this only a Number,not Object
      }
    }
  },
  mounted(){
    this.obj.id++;
    Object.freeze(this.obj);
    this.obj.id++;
    console.log(this.obj.id);

    setInterval(() => {
      this.obj.id++;
      if (this.obj.id > 2) {
        Object.freeze(this.obj);
        // console.log(Object.isFrozen(this.obj)); 
      }
      console.log(this.obj.id)
    }, 1000);
  }

  // Console result
  // 2
  // 3
  // 4
  // 5
  // 6
  // ...
  ```

#### 事件销毁
Vue组件销毁的时候记得将组件内的定时器、延时器、绑定事件等巴拉巴拉的东西统统销毁。以免造成内存泄露。
#### 图片懒加载
vue-lazyload一把梭~ 扩展v-指令 v-lazy储存图片地址实现图片懒加载
#### SSR(抽卡有风险，重构需谨慎)
缺点：
- 服务端渲染只支持beforCreate和created两个钩子函数，这会导致一些外部扩展库需要特殊处理。
- 服务端渲染，顾名思义，你还得额外搞个server运行环境，资金得跟上。

#### Webpack
[Off u go](https://juejin.im/post/5c1fa158f265da613c09cb36)
#### 开启 gzip 压缩
查看Content-Encoding是否为gzip
#### 浏览器缓存
[详见](HTTP权威指南?id=浏览器缓存)
#### CDN
CDN 可以通过不同的域名来加载文件，从而使下载文件的并发连接数大大增加，且CDN 具有更好的可用性，更低的网络延迟和丢包率 。
#### 使用 Chrome Performance 查看性能
[懒得写](https://www.cnblogs.com/xiaohuochai/p/9182710.html)
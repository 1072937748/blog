### 指令
- v-model: :value和@input的语法糖;
- v-bind: 简写`:`,例如`v-bind="{value: <props>}"`等同于`:value="<props>"`;<br>`<input v-bind="$attr" />`可以实现父组件中直接设置子组件中该input的属性;
- v-on: 简写`@`，例如`v-on="{click: fn}"`等同于`@click="fn"`;

### API
#### provide/inject:
父组件和子子孙孙的广播通信📢。  

!> 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

```JavaScript
  provide(){
    return {
      name: '123'
    }
  }
  inject: ['name']
```
#### keep-alive
相关的两个生命周期`activated`和`deactivated`

> 在 2.2.0 及其更高版本中，activated 和 deactivated 将会在 <keep-alive> 树内的所有嵌套组件中触发。
```html
  <!-- 基本 -->
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>

  <!-- 和 `<transition>` 一起使用 -->
  <transition>
    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
  </transition>
```
如果有上述的多个条件性的子元素，`<keep-alive>` 要求同时只有一个子元素被渲染。
#### install
```JavaScript
// main.js
  Vue.use(plugin);

  // plugin.js
  plugin.install(_vue){
    ...
  }
```
#### 计算属性
只有getter
#### mixins
混入功能，略骚，慎用，混入的生命周期在组件本身周期之前调用。全局API是mixin
### 生命周期
父子组件版：bc > cr > bm > bc > cr > bm > mo > mo  
![生命周期](https://cn.vuejs.org/images/lifecycle.png ':size=1200xauto')
### 响应式原理
vue2.x的响应式基于Object.defineProperty实现的，把data对象的所有property都转为getter/setter。也正是因为如此，vue不支持IE8以及更低版本的浏览器。  
Vue 无法检测 property 的添加或移除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转化，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。  
对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 property。
```
  this.$set(vm.someObject, 'b', 2)
```
有时你可能需要为已有对象赋值多个新 property，比如使用 Object.assign() 或 _.extend()。但是，这样添加到对象上的新 property 不会触发更新。在这种情况下，你应该用原对象与要混合进去的对象的 property 一起创建一个新的对象。
```JavaScript
  // 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
  this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```
Vue 不能检测以下数组的变动：  
- 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
- 当你修改数组的长度时，例如：`vm.items.length = newLength`

解决方法：1、set方法。2、用splice方法  
### 函数式组件
没有管理任何状态，没有监听任何传递给它的状态，没有上下文，没有生命周期方法。只接受一些prop并展示。
### 异步更新队列
!> vue中的nextTick并非是node中的process.nextTick，但可以以相同的思路去理解。
Vue 在内部对异步队列尝试使用原生的 `Promise.then、MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

vm.$nextTick返回的是一个Promise,所以可以使用async/await。
### vue-router
- mode: history/hash/abstract
- base: process.env.BASE_URL
- 异步加载: 
```JavaScript
  component: () => import(/* webpackChunkName: "redireact" */ '@/components/redireact.vue'),
```  
- 路由守卫: 
  - router.beforeEach((to, from, next)=>{})
  - beforeEnter
  - beforeRouteEnter
  - beforeRouteUpdate
  - beforeRouteLeave
- 完整的导航解析流程
  1. 导航被触发。
  2. 在失活的组件里调用 beforeRouteLeave 守卫。
  3. 调用全局的 beforeEach 守卫。
  4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
  5. 在路由配置里调用 beforeEnter。
  6. 解析异步路由组件。
  7. 在被激活的组件里调用 beforeRouteEnter。
  8. 调用全局的 beforeResolve 守卫 (2.5+)。
  9. 导航被确认。
  10. 调用全局的 afterEach 钩子。
  11. 触发 DOM 更新。
  12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。  

### vuex
Vue.components > actions > mutations > state > Vue.components
- state 经过vue教育的状态数据的集合，更新组件展示。不推荐直接修改state，要走流程，这是🐢腚，否则不符合状态管理的思想。
- mutations 更新状态 
- getters 和state相关，有点像data和computed的关系。
- actions 一般注重业务逻辑，比如走接口
- $store.commit 调用mutations
- $store. dispatch 调用actions
- 项目结构
```bash
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```
[官方示例](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)

### vue-cli
see you..

### 性能优化
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

!> 这里梳理的时候发现一个问题。
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
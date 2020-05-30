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


  ### vue-cli
  see you..

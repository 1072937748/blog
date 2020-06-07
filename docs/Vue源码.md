# 源码
!> 四六级没过的，趁早打开翻译软件，别装逼

下好了源码一脸懵逼，从何看起？  

首先 我们从package.json的script中看有什么
```sh
  dev的命令
  rollup -w -c scripts/config.js --environment TARGET:web-full-dev
  改为
  rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev
```

Vue框架使用rollup打包的，从`npm run dev`的命令上看寻找入口文件的切入点在`scripts/config.js`文件中。

从config.js中得知dev命令中TARGET参数用来指定打包哪种Vue文件，当前为web-full-dev，找到对应打包文件的entry为`web/entry-runtime-with-compiler.js`，即代表生成的是可在浏览器中运行的带编译器的vue.js（就是能写template的那种）。而在cli中则是使用的vue.runtime.min.js，这种不带编译器，编译的功能由webpack提供。

从`entry-runtime-with-compiler.js`中就能够追查到vue的构造方法了，位于core/instance目录下，Vue的其他重要的东西也在此处。


#### 层级结构
- entry-runtime-with-compiler.js  引入runtime/index.js中的Vue  
  - $mount 拓展，想尽办法搞到render函数，执行原始$mount

- runtime/index.js  引入core/index.js
  - 拓展平台runtime指令和组件
  - __patch__   最屌的东西
  - $mount  
    - mountComponent    执行`beforeMount`->`new Watcher(before中执行beforeUpdate)`->`vm._update(vm._render(), hyrating)`->若为根节点，则执行mounted

- core/index.js  引入core/instance/index.js
  - initGlobalAPI
    - config 只读,无法被重写
    - util    
    - set,delete,nextTick
    - observable
    - options

- core/instance/index.js
  - initMixin   init.js
    - initLifecycle 
      - $parent   父组件实例
      - $root 
      - $children
      - $refs
      - _watcher
    - initEvents    注册父组件事件 _events空对象
    - initRender    初始化render函数，即`render: h => h(App)`函数，注册响应式属性`$attrs $listeners`
    - callHook    执行beforeCreate
    - initInjections    注册inject
    - initState   初始化data  
    - initProvide   注册provide，init过程依赖于data props 所以在initState之后
    - callHook    执行created
    - 如果当前vm为根节点，则直接执行$mount
  - stateMixin    state.js
    - 挂载只读数据$data和$props,以及方法:$set,$delete,$watch
    - $set: 如果target为数组，则使用splice方法，触发响应式；如果已存在该key值则直接赋值；如果是新的key，则调用defineReactive实现响应式，并触发一次notify
    - $detele: 如果为自身的key 则删掉，并且如果是响应式数据，则触发一次通知
  - eventsMixin   event.js
    - $on   可同时注册多个事件 注意`_hasHookEvent`的用途
    - $once   切片，调用$on，注意`on.fn = fn`的用途
    - $off    什么参数都不传，代表清除该实例下所有event；如果只传事件，则删除改事件下所有event；如果两者都传了，则只删除该监听器；
    - $emit   执行vm._events[evnet]
  - lifecycleMixin    lifecycle.js
    - _update   更新视图 重点是`patch`方法
    - $forceUpdate    强制刷新，专注诡异情况
    - $destroy    销毁实例，调用`beforeDestroy`  `_watcher,_watchers`??? `patch` 调用destroyed，清除实例下的所有event。
  - renderMixin   render.js
    - installRenderHelpers    卧槽
    - $nextTick   [顺序](Vue?id=异步更新队列)
    > In problematic UIWebViews, Promise.then doesn't completely break, but it can get stuck in a weird state where callbacks are pushed into the microtask queue but the queue isn't being flushed, until the browser needs to do some other work, e.g. handle a timer. Therefore we can "force" the microtask queue to be flushed by adding an empty timer.
    - _render ？？？？设置了一个parentNode 然后...没看懂 功力不够

#### observe
TODO
#### patch
TODO
![miniVue](/assets/miniVue.png ':size=autox300')
# 编译
编译模块分为三个阶段：
- parse: 使用正则解析template中的vue指令、变量等，形成抽象语法树AST；
- optimize: 标记静态节点，用作后面的性能优化，在diff的过程中直接略过；
- generate: 把第一步生成的AST转化为渲染函数render function；

# 响应式
初始化时通过[defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)定义对象`getter/setter`，建立观察者模式，当编译生成的渲染函数被实际渲染的时候，触发getter进行依赖收集，在数据发生变化时，触发setter进行更新。[更多](/Vue?id=响应式原理)
# 虚拟Dom
就是个描述Dom结构的对象，数据修改时，先修改虚拟Dom，然后对数据做diff，最后汇总所有diff，优化dom操作。
# 更新视图
数据修改触发setter，监听器通知进行修改，通过对比新旧vdom树得到最小修改，就是patch，然后修改这些差异。
# 开写
[miniVue.js](https://github.com/1072937748/blog/tree/master/docs/assets/js/miniVue.js)
[compile.js](https://github.com/1072937748/blog/tree/master/docs/assets/js/compile.js)
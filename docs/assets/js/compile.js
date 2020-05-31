class Compile {
  // el: 待编译模板，vm: 当前vue示例
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    this.$fragment = this.node2Fragment(this.$el);
    this.$compile(this.$fragment);
    this.$el.appendChild(this.$fragment);
  }

  node2Fragment(el) {
    // 创建Dom片段
    const fragment = document.createDocumentFragment();
    //
    let child;
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      if (node.nodeType == 1) {
        // 编译元素
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // 编译插值文本
        this.compileText(node);
      }

      if (node.childNodes) {
        this.compile(node);
      }
    });
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  compileText(node) {
    this.update(node, RegExp.$1, "text");
  }

  update(node, exp, dir) {
    const updator = this[dir + "Updator"];
    updator && updator(node, this.$vm[exp]);
    // 依赖收集 未来该变量发生更新时 调用回调更新视图
    new Watcher(this.$vm, exp, function(val){
      updator && updator(node, val);
    });
  }

  textUpdator(node, val) {
    node.textContent = val;
  }

  compileElement(node) {
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr=>{
      // v-xxx
      const attrName = attr.name;
      const exp = attr.value;
      if(/^v\-/.test(attrName)){
        updatorElement && updatorElement(node, this.$vm[exp]);
      }
    })
  }

  updatorElement(node, value) {
    node.innerText = value;
  }
}

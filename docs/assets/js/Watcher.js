import Dep from "./Dep";
// 保存data中的数值和页面的关系
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    // 触发依赖收集
    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
  }
  update() {
    console.log(`${this.key}更新了`);
    this.cb && this.cb.call(this.vm, this.vm[key]);
  }
}

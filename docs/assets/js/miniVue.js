/**
var obj = {};
Object.defineProperty(obj, "name", {
  get() {
    console.log('获取数据');
    return this.value;
  },
  set(val){
    console.log('更新数据');
    return val;
  }
});
 */
import Dep from "./Dep";
import Watcher from "./Watcher";

class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.observer(this.$data);

    if (options.created) {
      options.created.call(this);
    }
  }
  observer(data) {
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach((key) => {
      // 响应式处理
      this.defineReactive(data, key, data[key]);

      // 代理data中的属性到vm根上以实现vm.xxx代替vm.$data.xxx的操作
      this.proxyData(key);
    });
  }
  defineReactive(data, key, val) {
    // 递归
    this.observer(val);
    // 定义Dep
    const dep = new Dep();
    // 为data中每一个key定义拦截
    Object.defineProperty(data, key, {
      get() {
        Dep.target && dep.addWatcher(Dep.target);
        return val;
      },
      set(newVal) {
        if (val !== newVal) {
          val = newVal;
          dep.notify();
        }
      },
    });
  }
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      },
    });
  }
}

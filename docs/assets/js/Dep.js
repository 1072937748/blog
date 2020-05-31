// 管理所有Watcher
class Dep {
  constructor() {
    this.watchers = [];
  }
  addWatcher(watcher) {
    this.watchers.push(watcher);
  }
  notify() {
    this.watchers.forEach((watcher) => {
      watcher.update();
    });
  }
}

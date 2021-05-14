## 手写Promise，由浅入深

### promise/A+规范

> promise 是一个拥有then方法的对象或函数，其行为符合本规范；

1. 一个Promise的当前状态必须为以下三种状态的一种，Pending、Fulfilled、Rejected。
2. 当Promise对象已经由Pending改为其他任意一种状态后，就不能再次改变状态，且终值也不可改变。
3. onFulfilled和onRejected是可选的。如果onFulfilled不是函数，其必须被忽略。如果onRejected不是函数，其必须被忽略。
4. then方法必须返回一个新的promise对象。因为promise的状态不可变。
5. Promise解决过程是一个抽象的操作，其需要输入一个promise和一个值，我们表示为`[[Resolve]](promise, x)`，如果x有then方法切看上去像一个promise，解决程序即尝试使promise接受x的状态；否则其用x的值来执行promise。
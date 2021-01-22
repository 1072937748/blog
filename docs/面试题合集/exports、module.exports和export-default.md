## module.exports、exports 和 export default、export（WTF）

### CommonJS(NodeJs)

该规范中，每个文件就是一个模块，有自己的作用域。module 变量代表当前模块，exports 属性（即 module.exports）是对外接口。加载模块其实就是加载该模块的 module.exports 属性。
NodeJs 为每个模块提供一个 exports 变量指向 module.exports。因此如果将 exports 指向一个值，就失去了导出的能力。

```js
// exports
exports.fun1 = () => {};

// module.exports
module.exports = () => {};

// error
exports = () => {};
```

### ES6 模块规范

1. 每一个模块之家在一次，每一个js只执行一次，如果下次再加载同目录下同文件，直接从内存中读取。
2. 每个模块内生成的变量都是局部变量，不会污染全局作用域。
3. 模块内部的变量或者函数可以通过export导出。

```js
// a.js
export const a = "a";

// b.js
export default {
  name: 1,
};

// c.js
import { a } from "a.js";
import b from "b.js";

a; // "a"
b; // {name: 1}
```

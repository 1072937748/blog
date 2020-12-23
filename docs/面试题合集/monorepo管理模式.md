## What is monorepo?

monorepo 一个多仓库管理模式的名称，主要应用于`多模块间有相互依赖`，或者`多模块有共同依赖`的模块的场景。

monorepo简单来说就是在多模块外层包了个壳，声明一个工作区(workspaces)而已。

*网络上介绍monorepo的解决方案大都是上来就`lerna` + `yarn workspaces`。亲身体验，对新手极不友好。建议先将两者分开来进行了解。*

## Yarn Workspaces

vue-next仓库目前使用的就是该种管理方式。下面yarn官网的示例 可以很清晰的描述这个管理模式的样子。
```JSON
{
  "name": "a",
  "version": "0.0.1",
  "dependencies": {
    "cross-env": "5.0.5",
    "axios": "^0.21.0",
  }
}

{
  "name": "b",
  "version": "0.0.1",
  "dependencies": {
    "cross-env": "5.0.5",
    "a": "0.0.1"
  }
}
```
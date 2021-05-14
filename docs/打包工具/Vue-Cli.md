## Vue-Cli
  **版本对应为Vue-Cli3**

### vue.config.js 配置参考
- pbulicPath 以下情况下，避免使用相对路径：
  - 使用基于HTML5`history.pushState`的路由时；
  - 使用`pages`选项构建多页面应用时；
- outputDir 默认为`dist`。构建输出文件的路径
- assetsDir 防止生成的静态资源的目录
- indexPath 指定生成的`index.html`的相对于`outputDir`输出路径。
- pages 构建多页面应用时的配置项，每一个页面配置都包括
  - entry 必选 page的入口文件
  - template 页面模板
  - filename 输出的文件名
  - chunks 等同于html-webpack-plugin中的chunks
- lintOnSave 每次保存时lint代码。在`@vue/cli-plugin-eslint`被安装之后生效
- runtimeCompiler 是否使用包含运行时编译器的 Vue 构建版本
- transpileDependencies 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
- productionSourceMap 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
- crossorigin 设置生成的 HTML 中 `<link rel="stylesheet">` 和 `<script>` 标签的 crossorigin 属性，仅影响由html-webpack-plugin注入的标签
- configureWebpack [详情](https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F)
- chainWebpack [详情](https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7)
- css.requireModuleExtension [详情](https://cli.vuejs.org/zh/guide/css.html#css-modules)
- css.extract 是否将css提取至一个独立的css文件中，默认 生产环境下是`true`
- css.sourceMap 是否为 CSS 开启 source map。
- css.loaderOptions 向css相关的loader传递选项
- devServer 开发服务器配置，所有[`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/)的选项都支持
  - proxy 代理配置
- pwa 
  - workboxPluginMode 创建SW文件的模式。`GenerateSW`、`InjectManifest`
  - workboxOptions 这些选项将传递到workbox-webpack-plugin
  - name 用作`apple-mobile-web-app-title`生成的HTML中meta标记的值
  - themeColor
  - msTileColor
  - appleMobileWebAppCapable
  - appleMobileWebAppStatusBarStyle
  - assetsVersion
  - manifestPath
  - manifestOptions 该对象将用于生成 manifest.json
  - manifestCrossorigin 设置 mainfest 文件的link标签上的crossorigin属性
  - iconPaths 设置图片地址
- pluginOptions 用来传递任何第三方插件选项。
  ```js
  module.exports = {
    pluginOptions: {
      foo: {
        // 插件可以作为`options.pluginOptions.foo` 访问这些选项。
      }
    }
  }
  ```

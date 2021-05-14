# Webpack

## 属性
- entry: 入口
- output: 输出配置
  - filename: 输出文件的名称
  - path: 输出路径
- mode: `development` | `production` 用来区分两种模式的各项配置
- module: 处理文件的工具
  - css-loader
  - style-loader
  - file-loader
  - scss-loader

- plugin:  打包优化的插件

## 快速上手

### html-webpack-plugin
- title 设置生成的html文件标题
- filename 生成html文件的文件名
- template 指定模板文件生成特定html文件
- inject 
  - true 默认值，script标签位于html文件的body底部
  - body 同true
  - head script位于head标签内
  - false 不插入js文件
- favicon 给生成的html添加一个favicon
- minify 对html文件进行压缩，同`html-minify`的压缩选项一样
- hash 给生成的js文件一个独特的hash值，该hash值是该次webpack编译的hash值。
- cache 表示只有在内容变化时才生成一个新的文件
- showErrors 显示错误信息
- chunks 
  ```js
  // webpack.config.js
  entry: {
      index: path.resolve(__dirname, './src/index.js'),
      index1: path.resolve(__dirname, './src/index1.js'),
      index2: path.resolve(__dirname, './src/index2.js')
  }
  ...
  plugins: [
      new HtmlWebpackPlugin({
          ...
          chunks: ['index','index2']
      })
  ]
  ```
- excludeChunks 与chunks相反，排除掉某些js文件
- 
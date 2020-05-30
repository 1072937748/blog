# Webpack: 一个用来打包的东西，嗯...打包的。

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
```bash
  npm init
  npm install webpack-cli html-webpack-plugin url-loader file-loader mini-css-extract-plugin optmiize-css-assets-webpack-plugin -D
  mkdir src && cd src
  touch webpack.config.js
```
webpack.config.js
```JavaScript
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptmiizeCssAssetsWebpackPlugin = require('optmiize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist'),
  },
  mdule: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /(jpeg|png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          esModule: true,
          limit: 10 * 1024,
          name: [hash:10].[ext],
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true, // 删除空格
        removeComments: true,  // 删除注释
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'dist/index.css'
    }),
    new OptmiizeCssAssetsWebpackPlugin()
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    port: 3000,
    compress: true,
    open: true,
  }
}

```
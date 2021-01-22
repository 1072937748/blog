## URL 从输入到页面展示的过程

步骤：

1. 浏览器根据 URL 查看浏览器缓存-系统缓存-路由器缓存，若缓存中有，直接跳到第 5 步。

2. 浏览器根据 URL 地址解析主机名。

3. DNS 解析服务器 IP 地址和端口号。

4. 与服务器简历 TCP 连接，即三次握手。

5. 浏览器发出请求 HTTP 请求，服务器返回响应。

6. 关闭连接，浏览器自上而下加载文档，并进行解析，遇到js文件时会刮起渲染线程，等待js记载并解析执行完毕。这么做的原因是js有可能会修改DOM，导致预先准备的渲染被修改或者后续下载的资源可能是没有必要的。

7. 如果文档中有资源则重复 5、6 动作，直至资源全部加载完毕，加载外部资源的过程是异步的。

流程大致就是这样，前端在性能优化方面的考虑更应该注意`6`做了什么。

### 为什么说操作 DOM 会很慢

在浏览器中 DOM 和 JS 都是分开实现的，通过 js 操作 DOM 的时候需要先连接 js 和 DOM。

### 浏览器解析渲染 HTML

1. HTML 被 HTML 解析器解析成 DOM Tree，css 则是 css 解析器解析成 CSSOM Tree。
2. DOM Tree 和 CSSOM Tree 解析完成后，被附加到一起形成渲染数（Render Tree）。
3. reflow，根据渲染树计算每个节点的几何信息。
4. repaint，根据计算好的信息绘制整个页面。

_由此可以看出，每次 dom 更改或者 css 几何属性更改都会触发一次 reflow 和 repaint 过程，而如果是 CSS 的非几何属性更新，则只会触发一次 repaint 过程。也就是大家常说的`重排一定引起重绘，重绘不一会会引起重排`。_

### Reflow

_浏览器渲染页面默认采用的是流式布局模型_

重排的过程是根据渲染对象的几何信息（DOM 对象的位置和尺寸大小），并将其安置在界面中的正确位置。

引起重排的操作大致会有：

- 页面首次渲染。
- 浏览器窗口大小发生变化。
- 元素尺寸或位置发生改变。
- 元素内容变化（文字数量、字体大小或图片大小等）。
- 添加或删除可见的 DOM 元素。
- 激活 CSS 伪类
- 设置 style 属性
- `查询某些属性或者调用某些方法`
  - width、height、margin、padding、display、border、position、overflow、client 系列、offset 系列、scroll 系列、scrollIntoView()、scrollTo()、getComputedStyle()、getBoundingClientRect()、scrollIntoViewIfNeeded()

### Repaint

引起重绘的属性：

color | border-style | visibility | background | text-decoration | outline | border-radius | box-shadow

### 性能优化

以上我们可以看出，页面性能优化的角度有下面几个方面：

- 减少DOM操作
  - 最小化DOM访问次数，例如虚拟DOM
  - 压缩局部逻辑中DOM修改的次数
- 按情况采用更优的API
  - 用querySelectAll代替getElementByXX，两者区别是前者返回的是Static Node List，后者是Live Node List。
  - 开启动画的GPU加速，把渲染计算交给GPU。
  - 少用HTML集合来遍历，因为集合遍历比真数组遍历耗费更高。
  - 用时间委托来减少事件处理器的数量。
- 减少重排
  - 避免滥用style属性。
  - 具有动画的元素 position属性最好设为absolute或者fixed。
  - 减少table布局，牵一发动全身。table-layout: auto或者table-layout:fixed 可以让table一行一行的渲染。
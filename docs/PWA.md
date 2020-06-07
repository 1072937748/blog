#### PWA   
翻译过来是渐进式增强WEB应用，对标Native APP。目的就是在移动端利用提供的标准化框架，在网页应用中实现和原生应用相近的用户体验的渐进式网页应用。 

当用户开启APP时，通过service work立即加载渐进式web应用程序，完全不受网络环境的约束。service work就像一个客户端代理，它控制缓存以及如何响应资源请求逻辑，通过预缓存关键资源，可以消除对网络的依赖，确保为用户提供即时可靠的体验。

#### 示例
下面从一个简单基础的pwa示例讲解：
- PWA中包含的核心功能及特性如下：
  - Web App Manifest
  - Service Worker
  - Cache API 缓存
  - Push&Notification 推送与通知
  - Background Sync 后台同步
  - 响应式设计

- 目录结构
```bash
├── index.html
├── static # 静态资源文件
│   └── ... 
└── manifest.json # 配置文件
└── sw.js # 
```
manifest.json
```JSON
  {
    "name": "一个PWA示例",
    "short_name": "PWA示例",
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#fff",
    "theme_color": "#3eaf7c",
    "icons": [
      {
        "src": "/youhun.jpg",
        "sizes": "32x32",
        "type": "image/png"
      }
    ]
  }
```
sw.js
```JavaScript
  importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
  var cacheStorageKey = 'minimal-pwa-1'
  var cacheList=[
    '/',
    '/static',
  ]
  self.addEventListener('install',e =>{
    e.waitUntil(
      caches.open(cacheStorageKey)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
    )
  })

  self.addEventListener('fetch',function(e){
    e.respondWith(
      caches.match(e.request).then(function(response){
        if(response != null){
          return response
        }
        return fetch(e.request.url)
      })
    )
  })
  self.addEventListener('activate',function(e){
    e.waitUntil(
      //获取所有cache名称
      caches.keys().then(cacheNames => {
        return Promise.all(
          // 获取所有不同于当前版本名称cache下的内容
          cacheNames.filter(cacheNames => {
            return cacheNames !== cacheStorageKey
          }).map(cacheNames => {
            return caches.delete(cacheNames)
          })
        )
      }).then(() => {
        return self.clients.claim()
      })
    )
  })
```

#### PWA现状
还不普及，国内好多浏览器还不支持。
# 菜鸡一个，开始学写笔记 
5.29 我太难了...... 
想写个属于自己的博客，预感到写出来的东西会像自己的内裤一样，不能轻易示人，所以有了接下来的搭建博客之旅。  
### 理想中的过程
```
npm install vuepress -g 
md coding
upload
github pages
show this great to the world!
```  
### 现实降维打击
基本可以说除了install -g 那一步是好的，其他步骤没有一个是顺心下来的……本md命名也由此而来。
#### step 1：搭建vuepress
按照[官网文档](https://www.vuepress.cn/guide/getting-started.html)操作，毛的问题没有，美滋滋的。
#### step 2：开始写作（start eatting shit）
让我先给自己改个名字~ ”XZ NOTE“，保存，刷新~p反应没有！  
这里我用的是最新的版本v1.5.2，去[issue](https://github.com/vuejs/vuepress/issues/2392)里看了下有人反映了这个问题，  
相传只要勇士将watchpack模块版本钉死在package.json里，就能拯救整个世界。
```
"resolutions ":{
	"watchpack": "1.6.1"
}
```
开开心心`yarn install && yarn dev`  
...  
nothing happen。`yarn global delete vuepress`。  
#### step 3: docsify救场
失眠一夜，部门大佬推荐了这款神器，相比于上面的vuepress，docsify有以下优点：
- 可以热更新，（不管以前vuePress行不行，反正现在不行）。
- 不需要再build一遍去生成个dist什么鬼的步骤，git push 直接就更新了，爽嗨。  

#### step 4: 装逼路一大事: 上线
1. git三步走(add、commit、push)
2. 打开对应的github repo
3. 点击右上角star按钮下方的⚙settings
4. 滑到倒数第二栏GItHub Pages
5. Source 选择 master branch /docs folder
6. Source上面一行：Your site is published at https://`<username>`.github.io/`<repo>`/ 就是你的网址


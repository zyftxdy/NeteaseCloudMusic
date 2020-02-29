# 介绍

一个基于vue开发的网易云音乐webapp<br/>
参考网易云音乐App的页面设计及布局，动手实现移动web端的网易云音乐<br/>
附上项目的预览地址[http://118.31.2.17](http://118.31.2.17) <br/>
也可扫描下方二维码预览<br/>
![](http://118.31.2.17/code.png)
> **PS:还请多支持网易云音乐APP,客户端下载[网易云音乐](https://music.163.com/)**<br/>
## 项目已实现功能
1.推荐歌单;<br/>
2.推荐歌曲、电台节目;<br/>
3.排行榜;<br/>
4.热门歌手;<br/>
5.歌单(网友精选碟);<br/>
6.搜索;<br/>
7.热搜榜;<br/>
8.搜索历史记录;<br/>
9.我的喜欢;<br/>
10.最近播放;<br/>
...<br/>
## 项目目标
目标:移植网易云APP的大致功能 <br/>
持续更新中....<br/>
使用中有任何建议，请Issues<br/>
## 项目进度
* 当前版本: V1.0.0
* 下次更新：<br>
    + 1.实现智能搜索提示<br>
    + 2.歌单广场完善<br>
    + 3.歌手分类完善<br>
## 技术栈
**依赖**
* vue全家桶(vue cil3脚手架构建)<br/>
* lazyload<br/>
* good-stroage<br/>
* better-scroll<br/>
* axios<br/>
* pinyin(将汉字转为拼音 地址:[https://github.com/hotoo/pinyin](https://github.com/hotoo/pinyin))<br/>
* fastclick
## 运行项目
项目的运行主要依赖于[Binaryify](https://github.com/Binaryify)提供的[api接口](https://github.com/Binaryify/NeteaseCloudMusicApi)<br>
在此非常感谢提供使用
## 运行

```
# 安装依赖
npm install
```
```
# 运行
npm run serve
```
### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

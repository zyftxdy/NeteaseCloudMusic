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
11.歌曲播放;<br/>
12.歌曲切换、添加喜欢;<br/>
13.歌词展示;<br/>
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
项目的运行主要依赖于[Binaryify](https://github.com/Binaryify)提供的[api接口](https://github.com/Binaryify/NeteaseCloudMusicApi);在此非常感谢提供使用<br>
因此使用前要保证已经克隆api到本地
> [网易云音乐api使用文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/)
## 运行

```
# 克隆项目到本地
git clone https://github.com/zyftxdy/NeteaseCloudMusic.git
```
```
# 安装依赖
npm install
```
```
# 运行
npm run serve
```
## 项目结构
```
├─ src                   
├── api                                               
│   ├── axios.js                //axios封装
│   ├── home.js                 // 主页面api方法
│   ├── playList.js             // 歌单api方法
│   ├── rankingList.js          // 排行榜api方法
│   ├── search.js               // 搜索api方法
│   ├── singer.js               // 歌手api方法
│   └── song.js                 // 歌曲api方法
├── assets                      //静态资源
│   ├── css                     //css样式
│       ├── common              // 公用样式
|           ├── iconfont.css    //iconfont字体图标
|           └── normalize.css   //css重置
|       └── play                
|           └── play.css        //播放页面css样式
|   └── img                     //公用图片    
├── common                      // 公共js
│   ├── common.js                
│   ├── mixin.js                 
│   ├── play.js             
│   ├── singer.js          
│   ├── song.js               
│   ├── stroage.js              
│   └── util.js                 
├── components

```
## 作者
> zyftxdy

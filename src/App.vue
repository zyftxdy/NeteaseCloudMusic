<template>
  <div id="app"> 
    <!-- 导航栏 -->
    <nav-bar></nav-bar>
    <!-- 界面切换 -->
    <keep-alive  exclude="search">
      <router-view/>
    </keep-alive>
    <play></play>
    <my-music></my-music>
  </div>
</template>
<script>

import navBar from 'components/content/navBar/homeNavBar'

import play from './views/play/play'
import myMusic from './views/myMusic/myMusic'

export default {
  components:{
    navBar,
    play,
    myMusic
  }
}
</script>
<style scoped>  
  @import './assets/css/common/normalize.css';
  @import './assets/css/common/iconfont.css'; 
  *{
    margin: 0;
    border: 0;
    padding:0;
  }
</style>

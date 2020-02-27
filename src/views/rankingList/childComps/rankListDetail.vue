<template>
    <transition name="rankDetail"> 
        <div class="rankDetail">
            <nav-bar class="detailBar" ref="header">
                <div slot="left" @click="handleClick">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div slot="center" class="navCenter">
                    <span>{{headerText}}</span>
                </div>
            </nav-bar>
            <div class="songtabBar" ref="songtabBar" v-show="tabBarShow" @click="playSongs(rankList.tracks)">
                <i class="iconfont icon-quanbubofang"></i>
                <span>播放全部<span class="total">(共{{rankList.length}}首)</span></span>
            </div>
            <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
                <div class="detail">
                    <div class="info">
                        <img :src="rankList.image" alt="" ref="songPic"> 
                        <div class="title">
                                <span>{{rankList.name}}</span>
                                <span>{{rankList.updateTime | showDate}}</span>
                        </div>
                    </div>
                    <div class="detailList" ref="detailList">
                        <div class="song-total" ref="songTotal" @click="playSongs(rankList.tracks)">
                            <i class="iconfont icon-quanbubofang"></i>
                            <span>播放全部<span class="total">(共{{rankList.length}}首)</span></span>
                        </div>
                        <div class="song" v-for="(item,index) in rankList.tracks" :key="index" @click="saveSong(item)">
                            <div class="sequence">
                                <span>{{index+1}}</span>
                                </div>
                            <div class="item">
                                <span>{{item.name}}</span>
                                <span>{{item.ar | showName}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </scroll>
        </div>
    </transition>
</template>

<script>

import navBar from 'components/common/navBar/navBar'
import scroll from 'components/common/scroll/scroll'

import {mapGetters} from 'vuex'

import {savePlayList} from 'common/mixin'

export default {
    name:'rankListDetail',
    mixins:[savePlayList],
    components:{
        navBar,
        scroll
    },
    data(){
        return {
            rankList:{},
            offsetTop:0,
            tabBarShow:false,
            headerText:'歌单'
        }
    },
    filters:{
        showDate:function(value){
            let date = new Date(value);
            return `最近更新:${date.getMonth()+1}月${date.getDate()}日`
        },
        showName:function(value){
            let name = []
            name = value.map((item) => {
            // console.log(arr)
            return item.name
            })
            return name.join('/')
        }
    },
    computed:{
        headerTitle(){
            return this.rankList.name;
        },  
        ...mapGetters(['getRankDetail'])
    },
    mounted(){
        if(this.getRankDetail.id){
            this.rankList = this.getRankDetail;
        } 
        this._normalizeSongs();
        
    },
    updated(){
        this.offsetTop = this.$refs.detailList.offsetTop-40;
    },
    methods:{
        //点击返回
        handleClick(){
            this.$router.back();
        },
        //页面刷新返回
        _normalizeSongs(){
            if(!this.getRankDetail.id){
                this.$router.push({
                    path:'/rankingList'
                })
            }
        },
        contentScroll(position){
            this.tabBarShow = position.y < -this.offsetTop;
            let opacity = Math.abs(position.y/-this.offsetTop);
            if(position.y < -this.offsetTop){
                this.headerText = this.headerTitle;
            }else{
                this.headerText = '歌单';
            }
            if(position.y < 0){
                this.$refs.header.$el.style.background = `rgba(149, 143, 143,${opacity})`;
                this.$refs.songPic.style.transform = `scale(1)`;
            }else{
                this.$refs.header.$el.style.background = `rgba(149, 143, 143, 0)`;
                this.$refs.songPic.style.transform = `scale(${1+opacity})`;
            }              
        }
    }
    
}
</script>

<style scoped>
    .rankDetail-enter-active, .rankDetail-leave-active {
        transition: all .3s;
    }
    .rankDetail-enter-to, .rankDetail-leave-to {
        transform: translateY(50%);
        opacity: 0;
    }
    .rankDetail{
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #f2f3f4;
        z-index: 10;
        overflow: hidden;
    }
    .detailBar{
        color: #fff;
        background: transparent;
        border:none;
    }
    .songtabBar{
        position: absolute;
        top: 40px;
        z-index: 1;
        left: 0;
        right: 0;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 12px 12px 12px 28px;
        background-color: #f2f3f4;
        border-bottom: 1px solid #e4e4e4;
    }
    .icon-fanhui{
        font-weight: 500;
    }
    .navCenter{
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .detail{
        width: 100%;
        position: relative;
    }
    .info{
        position: relative;  
    }
    .info img{
        width: 100%;
        filter:contrast(0.8);
        transform-origin: center bottom;
    }
    .info .title{
        position: absolute;
        left: 15px;
        bottom:65px;
        font-size: 13px;
        color: #fff;
    }
    .info .title span{
        display: block;
    }
    .info .title span:first-child{
        font-family: '微软雅黑';
        font-size: 20px;
        font-weight: 700;
    }
    .detailList{
        position: relative;
        top: -60px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #f2f3f4;
    }
    .detailList .song-total{
        font-size: 16px;
        padding: 12px 12px 12px 28px;
        border-bottom: 1px solid #e4e4e4;
    }
    .song-total .icon-quanbubofang,
    .songtabBar .icon-quanbubofang{
        color: #2e3030;
        font-size: 16px;
        padding-right: 10px;
    }
    .song-total .total,
    .songtabBar .total{
        color: #757575;
    }
    .detailList .song{
        display: flex;
        padding: 5px 10px;
        border-bottom: 1px solid #e4e4e4;
    }
    .detailList .sequence{
        width: 50px;
        color: #757575;
        position: relative;
    }
    .sequence span{
         display: block;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%,-50%);
    }
    .detailList .item{
        flex: 1;
        display: flex;
        flex-direction: column;
        font-style: 14px;
        overflow: hidden;
    }
    .item span{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .item span:first-child{
        font-size: 15px;
        color: #2e3030;
    }
    .item span:last-child{
        font-size: 13px;
        color: #757575;
    }
    .content{
      position: absolute;
      top: 0;
      bottom:0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
</style>
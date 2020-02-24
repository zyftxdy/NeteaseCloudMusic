<template>
    <transition name="songListDetail">
        <div class="songListDetail">
            <nav-bar class="detailBar" ref="header">
                <div slot="left" @click="handleClick">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div slot="center" class="navCenter">
                    <span>{{headerText}}</span>
                </div>
            </nav-bar>
            <!-- 吸顶 -->
            <div class="songtabBar" ref="songtabBar" v-show="tabBarShow" @click="playSongs(song.tracks)">
                <i class="iconfont icon-quanbubofang"></i>
                <span>播放全部<span class="total">(共{{song.length}}首)</span></span>
            </div>
            <!--  -->
            <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
                <div class="detail">
                    <div class="info">
                        <img :src="musicList.picUrl" alt="" ref="songPic"> 
                        <div class="title">
                                <span>{{musicList.name}}</span> 
                                <div class="playCount">
                                    <i class="iconfont icon-tinggeliang"></i>
                                    <span>{{musicList.playCount | showCount}}</span>
                                </div>
                        </div>
                    </div>
                    <div class="detailList" ref="detailList">
                        <div class="song-total" v-if="song.length" @click="playSongs(song.tracks)">
                            <i class="iconfont icon-quanbubofang"></i>
                            <span>播放全部<span class="total">(共{{song.length}}首)</span></span>
                        </div>
                        <div class="song" v-for="(item,index) in song.tracks" :key="index" @click="saveSong(item)">
                            <div class="sequence">
                                <span>{{index+1}}</span>
                                </div>
                            <div class="item">
                                <span>{{item.name}}</span>
                                <span>{{item.ar | showName}}</span>
                            </div>
                        </div>
                        <loading v-show="show"></loading>
                    </div>
                </div>
            </scroll>
        </div>
    </transition>
</template>

<script>

import navBar from 'components/common/navBar/navBar'
import scroll from 'components/common/scroll/scroll'
import loading from 'components/common/loading/loading'

import {getListDetails,MusicList} from 'api/home'

import {mapGetters} from 'vuex'

import {savePlayList} from 'common/mixin'

export default {
    name:'musicListDetail',
    mixins:[savePlayList],
    components:{
        navBar,
        scroll,
        loading
    },
    data(){
        return {
            musicList:{},
            song:{},
            offsetTop:0,
            tabBarShow:false,
            headerText:'歌单',
            show:true
        }
    },
    computed:{
        headerTitle(){
            return this.musicList.name;
        },
        ...mapGetters(['getMusicList'])
    },
    filters:{
        showCount:function(value){
            if(value>100000000){
                let v = Math.floor(Math.floor(value%100000000)/10000000);
                return Math.floor(value/100000000)+"."+v+"亿";
            }else if(value>10000){
                return Math.floor(value/10000)+'万';
            }else{
                return value;
            }
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
    mounted(){
        this.musicList = this.getMusicList;
        this._normalizeSongs();
        this._getListDetails();
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
            if(!this.getMusicList.id){
                this.$router.push({
                    path:'/home'
                })
            }
        },
        
        //拿到歌曲数据
        _getListDetails(){
            if(this.getMusicList.id){
                getListDetails(this.getMusicList.id).then(res => {
                    let itemInfo = new MusicList(res);
                    this.song = itemInfo;
                    //console.log(this.song);
                    
                    this.show = false
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
    .songListDetail-enter-active, .songListDetail-leave-active {
        transition: all .3s;
    }
    .songListDetail-enter-to, .songListDetail-leave-to {
        transform: translate3d(0,100%,0);
        opacity: 0;
    }
    .songListDetail{
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #f2f3f4;
        z-index: 10;
        overflow: hidden;
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
    .detailBar{
        color: #fff;
        background: transparent;
        border:none;
    }
    .icon-fanhui{
        font-weight: 500;
    }
    .navCenter{
        text-align: left;
    }
    .detail{
        width: 100%;
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
        display:inline-block;
    }
    .info .title span:first-child{
        font-family: '微软雅黑';
        font-size: 20px;
        font-weight: 700;
    }
    .info .title .icon-tinggeliang{
        font-size: 14px;
        padding-right: 5px;
    }
    .detailList{
        position: relative;
        top: -50px;
        padding-top: 50px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #f2f3f4;
    }
    .detailList .song-total{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
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
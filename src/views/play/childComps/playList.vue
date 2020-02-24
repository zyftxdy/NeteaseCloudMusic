<template>
    <transition name="palyList">
        <div class="palyList" v-show="showFlag" @click="hide">
            <div class="ListWrapper" @click.stop>
                <div class="header">
                    <div class="title">
                        <i class="iconfont" :class="playMode" @click.stop="changePlayMode"></i>
                        <span class="center" @click.stop="changePlayMode">{{playModeText}}<span class="count">({{getPlayList.length}})</span></span>
                        <i class="iconfont icon-lajitong" @click.stop="showConfirm"></i>
                    </div>
                </div>
                <scroll class="content" ref="scroll" :probeType="3">
                    <div class="item" v-for="(item,index) in getPlayList" :key="index" @click="playItem(item,index)">
                        <i class="iconfont" :class="{'icon-laba':index===currentIndex}"></i>
                        <span class="playName">{{item.name}}<span class="playSinger">-{{item.singer}}</span></span>
                        <i class="iconfont icon-quxiao" @click.stop="deletePlay(item)"></i>
                    </div>
                </scroll>
            </div>
            <confirm ref="confirm" text="是否清空播放列表" @deleteHistory="clearList"></confirm>
        </div> 
    </transition>
</template>

<script>

import scroll from 'components/common/scroll/scroll'
import confirm from 'components/common/confirm/confirm'

import {mapGetters,mapMutations} from 'vuex'

export default {
    name:"playList",
    components:{
        scroll,
        confirm
    },
    data(){
        return {
            showFlag:false
        }
    },
    computed:{
        ...mapGetters(['getPlayList','currentIndex','mode']),
        playMode(){
            /* if(this.mode === 0){
                return 'icon--lbxh' //循环播放
            }else if(this.mode === 1){
                return 'icon-danquxunhuan' //单曲循环
            }else if(this.mode === 2){
                return 'icon-suijibofang' //随机播放
            }  */
            return this.mode === 0?'icon--lbxh':(this.mode===1?'icon-danquxunhuan':'icon-suijibofang')
        },
        playModeText(){
            return this.mode === 0?'循环播放':(this.mode===1?'单曲循环':'随机播放')
        }
        
    },
    updated(){
        this.$refs.scroll.refresh();
    },
    methods:{
        hide(){
            this.showFlag = false;
        },
        show(){
            this.showFlag = true;
        },
        showConfirm(){
            this.$refs.confirm.show();
        },
        //清空播放列表
        clearList(){
            this.clearPlayList();
            this.hide();
            this.$emit('stopMusic');
        },
        //删除选中歌曲
        deletePlay(item){
            this.deleteSong(item);
            if (!this.getPlayList.length) {
                this.hide();
                this.$emit('stopMusic');              
            }
        },
        //切换当前播放
        playItem(item,index){
            this.setCurrentIndex(index);
        },
        //切换播放模式
        changePlayMode(){
            this.$emit('changePlayMode');
        },
        ...mapMutations({
            clearPlayList:'clearPlayList',
            deleteSong:'deleteSong',
            setCurrentIndex:'setCurrentIndex'
        })
    }
}
</script>

<style scoped>
    .palyList-enter-active,.palyList-leaver-active{
        transition: all .3s linear;
    }
    .palyList-enter, .palyList-leave-to{
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
    .palyList{
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        bottom:0;
        background: rgba(0,0,0,.2);
        z-index: 1000;
    }
    .palyList .ListWrapper{
        position: absolute;
        width: 90%;
        height: 55%;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: #fefefe;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0px 2px 15px 3px #7b7878;
    }
    .ListWrapper .header{
        padding: 5px 10px 5px 10px;
        position: relative;
        font-size: 14px;
        color: #282727;
        border-bottom: 1px solid #fcfcfc;
    }
    .header .title{
        display: flex;
        padding: 5px;
        align-items: center;
    }
    .header .title .icon--lbxh,
    .header .title .icon-lajitong{
        font-size: 20px;
        color: #6f6c6c;
    }
    .header .title .center{
        flex: 1;
        margin-left: 5px;
    }
    .content{
        padding: 5px 10px 10px 10px;
        font-size: 14px;
        color: #282727;
    }
    .content .item{
        display: flex;
        align-items: center;
        padding: 5px;
    }
    .item .icon-laba,
    .item .icon-quxiao{
        width: 25px;
        color:#282727;
        font-size: 18px;
    }
    .item .icon-laba{
        color: #ff5959;
    }
    .item .playName{
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .item .playName .playSinger{
        font-size: 11px;
        color: #8b8b8b;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .content{
      position: absolute;
      top: 40px;
      bottom:0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
</style>
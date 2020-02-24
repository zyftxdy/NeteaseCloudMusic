<template>
    <transition name="myMusic">
        <div class="myMusic" v-show="showHistory" @click="show">
            <div class="user" @click.stop>
                <div class="header">
                    <span 
                        v-for="(item,index) in titles" 
                        :key="index"
                        :class="{active:currentIndex===index}"
                        @click="handleClick(index)">{{item}}</span>
                </div>
                <div class="sequence-play" @click="playAll">
                    <i class="iconfont icon-quanbubofang"></i>
                    <span>播放全部<span class="total">(共{{count}}首)</span></span>
                </div>
                <scroll class="content" ref="scroll" :probeType="3">
                    <div class="favoriteList" v-if="currentIndex===0 && favorites.length">
                        <div class="item" v-for="(item,index) in favorites" :key="index" @click.stop="saveSong(item)">
                            <span class="sequence">{{index+1}}</span>
                            <div class="song">
                                <span>{{item.name}} </span>
                                <span>{{item.singer}}</span>
                            </div>
                            <i class="iconfont icon-lajitong" @click.stop="delFavorite(item)"></i>
                        </div>
                    </div>
                    <div class="playHistory" v-if="currentIndex===1 && playHistory.length">
                        <div class="item" v-for="(item,index) in playHistory" :key="index" @click.stop="saveSong(item)">
                            <span class="sequence">{{index+1}}</span>
                            <div class="song">
                                <span>{{item.name}} </span>
                                <span>{{item.singer}}</span>
                            </div>
                            <i class="iconfont icon-lajitong" @click.stop="delPlay(item)"></i>
                        </div>
                    </div>
                </scroll>
            </div>
        </div>
    </transition>
</template>

<script>

import scroll from 'components/common/scroll/scroll'

import {mapGetters,mapMutations,mapActions} from 'vuex'

import {savePlayList} from 'common/mixin'

export default {
    name:'MyMusic',
    mixins:[savePlayList],
    components:{
        scroll
    },
    data(){
        return{
            titles:['我的收藏','最近播放'],
            currentIndex:0
        }
        
    },
    computed:{
        ...mapGetters(['showHistory','playHistory','favorites']),
        count(){
            if(this.currentIndex === 0){
                return this.favorites.length;
            }else{
                return this.playHistory.length;
            }
        }
    },
    methods:{
        show(){
            this.showHistoryMusic(false);
        },
        handleClick(index){
            this.currentIndex = index;
        },
        //删除我的搜藏
        delFavorite(item){
            this.deleteFavorite(item);
        },
        //删除最近播放
        delPlay(item){
            this.deletePlay(item);
        },
        //全部播放
        playAll(){
            if(this.currentIndex === 0 && this.favorites.length){
                this.savePlayLists(this.favorites);
            }else{
                this.savePlayLists(this.playHistory);
            }
        },
        ...mapMutations({
            showHistoryMusic:'showHistoryMusic',
            savePlayLists:'savePlayLists'
        }),
        ...mapActions({
            deleteFavorite:'deleteFavorite',
            deletePlay:'deletePlay'
        })
    }
}
</script>

<style scoped>
    .myMusic-enter-active, .myMusic-leave-active {
        transition: all .3s;
    }
    .myMusic-enter, .myMusic-leave-to {
        transform: translateX(-100%);
        opacity: 0;
    }
    .myMusic{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(138, 138, 138, 0.1);
        z-index: 5;
    }
    .content{
      position: absolute;
      top: 70px;
      bottom:0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .user{
        position: absolute;
        top: 0;
        left: 0;
        width: 85%;
        height: 100%;
        background: #ffffff;
    }
    .header{
        display: flex;
        align-items: center;
        color: #373737;
        height: 40px;
        overflow: hidden;
        border-bottom: 1px solid #f8f7f7;
    }
    .header span{
        flex: 1;
        text-align: center;
        font-size: 14px;
        transition: all .1s linear;
    }
    .header span.active{
        font-size: 16px;
        color: #030303;
    }
    .sequence-play{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #373737;
        height: 30px;
        overflow: hidden;
        border-bottom: 1px solid #f8f7f7; 
    }
    .sequence-play .icon-quanbubofang{
        font-size: 17px;
        width: 20px;
        padding-left: 15px;
    }
    .sequence-play span{
        flex: 1;
        padding-left: 5px;
    }
    .item{
        display: flex;
        align-items: center;
        padding: 5px;
    }
    .item .sequence,
    .item .icon-lajitong{
        width: 20px;
        color: #797979;
        text-align: center;
        font-size: 16px;
    }
    .item .song{
        flex: 1;
        display: flex;
        color: #222222;
        font-size: 13px;
        flex-flow: column;
        justify-content: space-around;
        padding-left: 10px;
    }
    .item .song span{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .item .song span:last-child{
        font-size: 11px;
        color: #5c5959;
    }
</style>
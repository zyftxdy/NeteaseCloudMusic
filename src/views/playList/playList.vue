<template>
    <div class="playList">
        <scroll class="content"
                ref="scroll"
                :probeType="3">
                <swiper-item
                    :recommendList="recommendList"
                    ref="swiper"
                />
                <div class="List" ref="list">
                    <list-item
                        v-for="(item,index) in playList"
                        :key="index"
                        :listItem="item"
                    />
                </div>    
        </scroll>
    <router-view></router-view>
    </div>
</template>

<script>

import scroll from 'components/common/scroll/scroll'

import {getPlayList,ListItem} from 'api/playList'
import listItem from './childComps/listItem'
import swiperItem from './childComps/swiperItem'

export default {
    name:'playList',
    components:{
        listItem,
        swiperItem,
        scroll
    },
    data(){
        return{
            playList:[],
            recommendList:[]
        }
    },
    mounted(){
        this._getPlayList();
    },
    updated(){
        setTimeout(() => {
            this.$refs.scroll.refresh();
        }, 300);  
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
        }
    },
    methods:{
        _getPlayList(){
            getPlayList().then(res=>{
                const list = res.playlists;
                const newList = [];
                for(let i=0;i<list.length;i++){
                    let item = new ListItem(list[i]);
                    newList.push(item);
                }
                this.recommendList = newList.slice(0,3);
                this.playList = newList.slice(3,99);
            })
        }
    }
}
</script>

<style scoped>
    .content{
      position: absolute;
      top: 40px;
      bottom:0;
      left: 0;
      right: 0;
      /* overflow: hidden; */
    }
    .playList{
        position: relative;
        padding-top: 40px;
    }
    .List{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        position: relative;
        margin-top: 48%;
    }
</style>
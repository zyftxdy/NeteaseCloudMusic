<template>
    <div class="hotList"
        :class="{playing:getPlayList.length>0}"
    >
        <div class="title"><span>热搜榜</span></div>
        <hot-item
            v-for="(item,index) in hotList"
            :key="index"
            :hotItem="item"
            :hotIndex="index+1"  
        ></hot-item>
    </div> 
</template>

<script>

import hotItem from './hotItem'
import {mapGetters} from 'vuex' 

export default {
    name:'hotList',
    components:{
        hotItem
    },
    props:{
        hotList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    computed:{
        ...mapGetters(['getPlayList'])
    },
    methods:{
        
    }
}
</script>

<style scoped>
    .hotList{
        position: relative;
    }
    .playing{
        position: relative;
        padding-bottom: 50px;
    }
    .hotList .title{
        padding:5px 10px 10px 10px;
        font-size: 14px;
        color:rgb(46, 42, 42);
    }
    .hotList .title span{
        margin-left: 5px;
    }
</style>
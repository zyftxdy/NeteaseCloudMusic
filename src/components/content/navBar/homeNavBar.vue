<template>
    <nav-bar>
        <div slot="left">
            <i class="iconfont icon-caidanlan" @click="historyClick"></i>
        </div>
        <div slot="center" class="navBarList">
            <span v-for="(item,index) in navBarList" 
            :key="index"
            :class="{active:isActive.indexOf(item.path) !== -1}"
            @click="handleClick(item.path)"
            >{{item.name}}</span>
        </div>
        <div slot="right" @click="searchClick">
            <i class="iconfont icon-sousuo"></i>
        </div>
    </nav-bar> 
</template>

<script>

import navBar from 'components/common/navBar/navBar'

import {mapMutations} from 'vuex'

export default {
    name:'homeNavBar',
    components:{
        navBar
    },
    data(){
        return{
            navBarList:[{name:'歌单',path:'/playList'},
                        {name:'发现',path:'/home'},
                        {name:'排行榜',path:'/rankingList'},
                        {name:'歌手',path:'/singers'}]
        }
    },
    computed:{
        isActive(){
            return this.$route.path;
        }
    },
    methods:{
        handleClick(path){
            this.$router.replace(path);
        },
        searchClick(){
            this.$router.push({
                path:'/search'
            })
        },
        historyClick(){
            this.showHistoryMusic(true);
        },
        ...mapMutations({
            showHistoryMusic:'showHistoryMusic'
        })
    }
}
</script>

<style scoped>
    .navBarList{
        display: flex;
    }
    .navBarList span{
        flex: 1;
        font-size: 16px;
        transition: all .2s linear;
    }
    .navBarList span.active{
        font-size: 18px;
    }
</style>
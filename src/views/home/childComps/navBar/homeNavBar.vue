<template>
    <nav-bar>
        <div slot="left">
            <i class="iconfont icon-caidanlan"></i>
        </div>
        <div slot="center" class="navBarList">
            <span v-for="(item,index) in navBarList" 
            :key="index" 
            :class="{active: currentIndex === index}"
            @click="itemClick(index)"
            >{{item}}</span>
        </div>
        <div slot="right" @click="searchClick">
            <i class="iconfont icon-sousuo"></i>
        </div>
    </nav-bar> 
</template>

<script>

import navBar from 'components/common/navBar/navBar'

export default {
    name:'homeNavBar',
    components:{
        navBar
    },
    props:{
        currentIndex:{
            type:Number,
            default:1
        }
    },
    data(){
        return{
            navBarList:['我的','发现','排行','歌手']
        }
    },
    methods:{
        itemClick(index){
            this.$emit('itemClick',index);
        },
        searchClick(){
            this.$router.push({
                path:'/search'
            })
        }
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
        transition: all .1s linear;
    }
    .navBarList span.active{
        font-size: 18px;
    }
</style>
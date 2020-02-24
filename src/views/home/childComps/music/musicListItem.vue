<template>
    <div class="listItem" @click="handleClick">
        <img v-lazy="listItem.picUrl" alt="">
        <div class="number">
            <i class="iconfont icon-tinggeliang"></i>
            <span>{{listItem.playCount | showCount}}</span>
        </div>
        <div class="info">
            <p>{{listItem.name}}</p>
        </div>
    </div>
</template>

<script>

import {mapMutations} from 'vuex'

export default {
    name:'musicListItem',
    props:{
        listItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return{
            
        }
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
        handleClick(){
            this.saveMusicList(this.listItem);
            this.$router.push({path:`/home/${this.listItem.id}`});  
        },

        ...mapMutations({
        saveMusicList:'saveMusicList'
        })
    }    
}
</script>

<style scoped>
    .listItem{
        width: 30%;
        position: relative;
        padding-bottom:5px;
    }
    .listItem img{
        width: 100%;
        border-radius: 5px;
    }
    .listItem .number{
        position: absolute;
        top: 2px;
        right: 3px;
        font-size: 10px;
        color: #ffffff;
        font-weight: 500;
    }
    .listItem .iconfont{
        font-size: 9px;
        position: relative;
        top: -1px;
        right: 1px;
    }
    .listItem .info{
        float: left;
        text-align: left;
        height: 40px;
        line-height: 16px;
        overflow: hidden;
        font-size: 11px;
        position: relative;
        top: -10px;
    }
</style>
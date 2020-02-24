<template>
    <div class="recommendList">
        <div class="title">
            <span>推荐榜</span>
        </div>
        <div class="list">
            <div class="item" v-for="(item,index) in recommendList" :key="index" @click="handleClick(item)">
                <img v-lazy="item.image" alt="">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'recommendList',
    props:{
       recommendList:{
           type:Array,
           default(){
               return []
           }
       } 
    },
    methods:{
        handleClick(value){
            this.$emit('recommendClick',value);
        }
    }
}
</script>

<style scoped>
    .recommendList{
        padding: 5px 10px 10px 10px;
    }
    .recommendList .title{
        padding: 10px 0px 0px 5px;
        font-size: 16px;
        font-weight: 700;
        color: #695A5A;
    }
    .recommendList .list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 10px;
    }
    .list .item{
        width: 31%;
        padding-bottom: 5px;
    }
    .list .item img{
        width: 100%;
        border-radius: 5px;
    }
    .list .item span{
        font-size: 12px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
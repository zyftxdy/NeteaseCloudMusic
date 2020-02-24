<template>
    <div class="globalList">
        <div class="title">
            <span>全球榜</span>
        </div>
        <div class="list">
            <div class="item" v-for="(item,index) in globalList" :key="index" @click="handleClick(item)">
                <img v-lazy="item.image" alt="">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'globalList',
    props:{
        globalList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        handleClick(value){
            this.$emit('globalListClick',value);
        }
    }
}
</script>

<style scoped>
     .globalList{
        padding: 5px 10px 10px 10px;
    }
    .globalList .title{
        padding: 10px 0px 0px 5px;
        font-size: 16px;
        font-weight: 700;
        color: #695A5A;
    }
    .globalList .list{
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
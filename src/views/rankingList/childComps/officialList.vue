<template>
    <div class="officialList">
        <div class="title">
            <span>官方榜</span>
        </div>
        <div class="listItem" v-for="(item,index) in officialList" :key="index" @click="handleClick(item)">
            <div class="image">
                <img v-lazy="item.image" alt="">
            </div>
            <div class="info">
                <div class="song"  v-for="(item,index) in item.top" :key="index">
                    <span>{{index+1}}.</span>
                    <span>{{item.name}}-{{item.ar[0].name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'officialListItem',
    props:{
        officialList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        handleClick(value){
            this.$emit('officialClick',value);
        }
    }
}
</script>

<style scoped>
    .officialList{
        padding: 10px 10px 0 10px;
    }
    .officialList .title{
        padding: 0px 0px 0px 5px;
        font-size: 16px;
        font-weight: 700;
        color: #695A5A;
    }
    .officialList .listItem{
        display: flex;
        margin-top:5px;
        overflow: hidden;
    }
    .listItem .image{
        width: 30%;
    }
    .listItem .info{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px 0 10px;
        overflow: hidden;
        color: #2e3030;
        font-size: 12px;
    }
    .listItem .info .song{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: 30px;
    }
    .listItem img{
        display: block;
        width: 100%;
        border-radius: 5px;
    }
</style>
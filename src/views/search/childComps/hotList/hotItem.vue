<template>
    <div class="listItem" @click="valueClick(hotItem.searchWord)">
        <div class="hotIndex" :class="{theThree:hotIndex === 1 || hotIndex === 2 || hotIndex === 3}">
            <span>{{hotIndex}}</span>
        </div>
        <div class="content">
            <div class="title">
                <span>{{hotItem.searchWord}}</span>
                <div class="img" v-show="hotItem.iconUrl && hotItem.iconType != 5">
                    <img :src="hotItem.iconUrl" alt="">
                </div>
           </div>
            <span>{{hotItem.content}}</span>    
        </div>
        <div class="score">
            <span>{{hotItem.score}}</span> 
        </div>    
    </div>
</template>

<script>
export default {
    name:'hotItem',
    props:{
        hotItem:{
            type:Object,
            default(){
                return {}
            }
        },
        hotIndex:{
            type:Number,
            default:0
        }
    },
    methods:{
        valueClick(value){
            this.bus.$emit('hotListValue',value);     
        }
    }
}
</script>

<style scoped>
    .listItem{
        display: flex;
        padding: 0 0 10px 10px;
        font-size: 14px;
    }
    .listItem .hotIndex,
    .listItem .score{
        display: inline-block;
        text-align: center;
        margin: auto;
    }
    .listItem .hotIndex{
        width: 30px;
        color:rgb(46, 42, 42);
    }
    .listItem .theThree{
        color: #f60a0a;
    }
    .listItem .score{
        width: 80px;
        margin: 0;
        font-size: 12px;
        color: rgb(85, 81, 81); 
    }
    .listItem .content{
        flex: 1;
        position: relative;
        padding-left: 10px;
    }
    .listItem .content span{
        display: block;
        color: rgb(85, 81, 81);
        font-size: 10px;
        position: relative;   
    }
    .listItem .content .title span{
        font-weight: 700;
        font-size: 13px; 
        color: rgb(46, 42, 42);
    }
    .title{
        display: flex;
    }
    .content .title .img{
        width: 29px;
        height: 15px;
        margin-left: 5px;
        overflow: hidden;
    }
    .title img{
        width: 100%;
    }
</style>
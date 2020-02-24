<template>
    <div class="radioList">
        <div class="title">
            <span
                v-for='(item,index) in titles'
                :key = "index"
                @click="itemClick(index)"
                :class = "{active:currentIndex === index}"
            >{{item}}</span>
        </div>
        <div class="radioList" v-show = "currentIndex === 0">
            <radio-list-item
                v-for="(item,index) in radioList"
                :key="index"
                :listItem = "item"
            />
        </div>
         <div class="programList" v-show = "currentIndex === 1">
            <program-item
                v-for="(item,index) in programList"
                :key="index"
                :listItem = "item"
            />
        </div>
    </div>
</template>

<script>

import radioListItem from './radioListItem'
import programItem from './programItem'

export default {
    name:'radioList',
    components:{
        radioListItem,
        programItem
    },
    props:{
        radioList:{
            type:Array,
            default(){
                return []
            }
        },
        programList:{
            type:Array,
            default(){
                return []
            }
        },
        currentIndex:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            titles:['新歌','电台']
        }
    },
    methods:{
        itemClick(index){
            this.$emit('itemClick',index);
        }
    }
}
</script>

<style scoped>
    .title{
        padding: 10px 0px 10px 7px;
        font-size: 16px;
        color:#695A5A;       
    }
    .title span{
        font-size: 14px;
        position: relative;
        transition: all .1s linear;
    }
    .title span:first-child{
        padding-right: 5px;
    }
    .title span:last-child{
        padding-left: 5px;
    }
    .title span:last-child::before{
        content: '';
        position: absolute;
        width: 1px;
        height: 15px;
        top: 3px;
        left: 0px;
        background: #CCCCCC;
    }
    .radioList .radioList,.programList{
        display: flex;
        justify-content: space-around;
    }
    .title span.active{
        font-weight: 700;
        font-size: 16px;
    }
</style>
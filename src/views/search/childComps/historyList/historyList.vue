<template>
    <div class="historyList">
        <div class="title"  v-show="historyList.length">
            <span>历史记录</span>
            <i class="iconfont icon-lajitong" @click="showConfirm"></i>
        </div>
        <div class="list">
            <span v-for="(item,index) in historyList" :key="index" @click="valueClick(item)">
                {{item}}
            </span>
        </div>       
    </div> 
</template>

<script>
export default {
    name:'historyList',
    props:{
        historyList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        showConfirm(){
            this.$emit('showConfirm');
        },
        //重新赋值
        valueClick(item){
            this.$emit('searchValue',item);
        }
    }
}
</script>

<style scoped>
    .historyList{
        position: relative;
    }
    .historyList .title{
        font-size: 14px;
        padding:10px 10px 5px 10px;
        color: rgb(46, 42, 42);
        transition: all .3s linear;
    }
    .title .icon-lajitong{
        float: right;
        margin-right: 5px;
    }
    .title span{
        margin-left: 5px;
    }
    .list{
        display: flex;
        flex-wrap: wrap;
        padding:0px 10px 10px 10px;
    }
    .list span{
        padding:3px 4px;
        text-align: center;
        font-size: 13px;
        border: 1px solid #f1f1f1;
        border-radius: 5px;
        margin: 5px;
        color:rgb(90, 81, 81);
    }
    .coverLayer{
        position:fixed;
        top:0px;
        left:0px;
        right: 0px;
        bottom: 0px;
        background: rgba(0, 0, 0, .1);
        z-index: 10;
        animation: coverLayer .3s linear;
    }
    .confirm-wrapper{
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1000;
    }
    .confirm{
        position: relative;
        background: #f2f3f4;
        border-radius: 5px;
        animation: confirm .5s linear; 
    }
    .confirm .tips{
        padding: 15px;
        text-align: center;
        border-bottom: 1px solid #f2f2f2;
    }
    .confirm .choose{
        text-align: center;
        display: flex;
    }
    .confirm .choose span{
        padding: 15px;
        flex: 1;
    }

    @keyframes coverLayer {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }

    @keyframes confirm {
        0%{
            transform: scale(0);
        }
        50%{
            transform: scale(1.1);
        }
        100%{
            transform: scale(1);
        }
    }
    /* tip:  transform: scale() 会使fixed属性降级为absolute 解决方式:在外层再套一层div*/
</style>
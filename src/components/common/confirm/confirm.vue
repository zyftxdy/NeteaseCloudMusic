<template>
    <div class="coverLayer" v-show="flag">
            <div class="confirm-wrapper">
                <div class="confirm">
                    <div class="tips">
                        <span>{{text}}</span>
                    </div>
                    <div class="choose">
                        <span @click.stop="falseClick">取消</span>
                        <span @click.stop="trueClick">确定</span>
                    </div>
                </div> 
            </div>   
    </div>
</template>

<script>
export default {
    name:'confirm',
    props:{
        text:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            flag:false
        }
    },
    methods:{
        show(){
            this.flag = true;
        },
        //取消删除
        falseClick(){
            this.flag = !this.flag;
        },
        //确定删除
        trueClick(){
            this.$emit('deleteHistory');
            this.flag = !this.flag;
        },
    }
}
</script>

<style scoped>
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
<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
    name:'scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        setTimeout(()=>{
            this._initScroll();
        },200)   
    },
    methods:{
        _initScroll(){
            if(!this.$refs.wrapper) return
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad,
                click:true
            })

            this.scroll.on('scroll',(position)=>{
                //console.log(position)-223
                this.$emit('scroll',position)
            })
            if(this.pullUpLoad){
                this.scroll.on('scrollEnd',()=>{
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        console.log('上拉加载更多');
                        this.$emit('pullingUp');
                    }   
                })
            }
            
        },
        scrollTo(x, y, time) {
            this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
        },
        refresh() {
            this.scroll && this.scroll.refresh && this.scroll.refresh()
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
        },
        getScrollY(){
            return this.scroll ? this.scroll.y:0
        }
    }
}
</script>

<style scoped>

</style>
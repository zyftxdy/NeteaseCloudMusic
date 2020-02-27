<template>
    <div class="my-swiper" ref="mySwiper">
        <div class="swiper" ref="swiper" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend.prevent="touchEnd">
            <div class="swiperItem" v-for="(item,index) in banners" :key="index">
                <img :src="item.imageUrl" alt="" @load="imageLoad">
            </div>      
        </div>
        <div class="indicator">
            <span v-for="(item,index) in banners" :key="index" :class="{active:index===currentIndex-1}"></span>
        </div>    
    </div>
</template>

<script>

export default {
    name:'swiper',
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        },
        moveRatio: {
            type: Number,
            default: 0.25
        },
    },
    data(){
        return {
            swiperCount:0,
            number:0,
            imageLength:0,
            flag:false,
            screenWidth:document.body.clientWidth,
            currentIndex:1,
            scrolling: false, // 是否正在滚动
        }
    },
    mounted(){
        this.imageLoad();
        this.startTimer();
        //监听屏幕变化
        window.addEventListener('resize', () => {
            window.screenWidth = document.body.clientWidth;
            //窗口宽度
            this.screenWidth = window.screenWidth;
            this.setSwiperWidth(true);
        })          
    },
    methods:{
        //监听图片加载完成
        imageLoad(){
            if(++this.number == this.imageLength){
                this.setSwiper();
                this.setSwiperWidth();           
            }
        },
        //设置轮播图宽度
        setSwiperWidth(){
            let swiper = this.$refs.swiper;
            let swiperItem = swiper.getElementsByClassName('swiperItem');
            this.swiperCount= swiperItem.length;
            for(let i=0;i<(this.swiperCount);i++){
                swiperItem[i].style.width = this.screenWidth+'px';
            }
            //设置swiper宽度
            swiper.style.width = (this.swiperCount) * this.screenWidth +'px';
        },
        //设置轮播图
        setSwiper(){           
            let swiper = this.$refs.swiper;
            let swiperItem = swiper.getElementsByClassName('swiperItem');
            this.swiperCount= swiperItem.length;
            if(this.swiperCount > 1){
                //添加节点
                let firstNode = swiperItem[0].cloneNode(true);
                let lastNode = swiperItem[this.swiperCount-1].cloneNode(true);
                swiper.insertBefore(lastNode,swiperItem[0]);
                swiper.appendChild(firstNode);
            }
            this.setTransform(-this.screenWidth);  
        },
        //设置滚动位置
        setTransform:function(position){
            this.$refs.swiper.style.transform = `translateX(${position}px)`; 
        },
        //定时器操作
        startTimer:function(){
            this.playTimer = window.setInterval(()=>{
                this.currentIndex++;
                
                this.scrollContent(-this.currentIndex*this.screenWidth);
            },2500)
        },
        stopTimer:function(){
            window.clearInterval(this.playTimer);
        },
        //滚动位置
        scrollContent:function(currentPosition){
            this.scrolling = true;
            this.$refs.swiper.style.transition = `transform 1s linear 0s`;

            this.setTransform(currentPosition);

            this.checkPosition();

            this.scrolling = false;           
        },
        checkPosition: function () {
            window.setTimeout(() => {
                // 1.校验正确的位置
                this.$refs.swiper.style.transition = 'transform 0ms linear 0s';
                if (this.currentIndex >= this.imageLength + 1) {
                    this.currentIndex = 1;
                    this.setTransform(-this.currentIndex * this.screenWidth);
                } else if (this.currentIndex <= 0) {
                    this.currentIndex = this.imageLength;
                    this.setTransform(-this.currentIndex * this.screenWidth);
                }
                //this.$emit('transitionEnd', this.currentIndex-1);
            }, 1000)
        },
        /**
         * 拖动事件的处理
         */
        touchStart: function (e) {
            // 1.如果正在滚动, 不可以拖动
            if (this.scrolling) return;

            // 2.停止定时器
            this.stopTimer();

            // 3.保存开始滚动的位置
            this.startX = e.touches[0].pageX;
        },
        touchMove: function (e) {
            // 1.计算出用户拖动的距离
            this.currentX = e.touches[0].pageX;
            this.distance = this.currentX - this.startX;
            let currentPosition = -this.currentIndex * this.screenWidth;
            let moveDistance = this.distance + currentPosition;
            // 2.设置当前的位置
            this.setTransform(moveDistance);
        },
        touchEnd: function () {
            // 1.获取移动的距离
            let currentMove = Math.abs(this.distance);

            // 2.判断最终的距离
            if (this.distance === 0) {
            return
            } else if (this.distance > 0 && currentMove > this.screenWidth * this.moveRatio) { // 右边移动超过0.5
            this.currentIndex--
            } else if (this.distance < 0 && currentMove > this.screenWidth * this.moveRatio) { // 向左移动超过0.5
            this.currentIndex++
            }

            // 3.移动到正确的位置
            this.scrollContent(-this.currentIndex * this.screenWidth);

            // 4.移动完成后重新开启定时器
            this.startTimer();
      },
    },
    watch:{
        banners(){
            this.imageLength = this.banners.length;
        }
    }
}
</script>

<style scoped>
    .my-swiper{
        width: 100%;
        margin-top: 10px;
        position: relative;
        overflow: hidden;
    }
    .swiper{
        width: 100%;
        margin: auto;
        overflow: hidden;
        display: flex;  
    }
    .swiperItem{
        width: 100%;
        flex-shrink: 0;
    }
    .swiperItem img{
        display: block;
        width: 90%;
        margin: auto;
        border-radius: 5px;
    }
    .indicator{
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
    }
    .indicator span{
        display: block;
        float: left;
        width: 10px;
        height: 1px;
        margin-left: 2px;
        background: rgba(255, 255, 255, .5);
        transition: transform .1s linear;
    }
    .indicator span:first-child{
        margin: 0;
    }
    .indicator span.active{
        background: rgb(252, 38, 38);
    }
</style>
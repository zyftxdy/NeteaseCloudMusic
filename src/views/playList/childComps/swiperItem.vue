<template>
    <div class="recommend" ref="recommend"
        @click.stop
        @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
    >
        <div class="swiperItem" 
            @click.stop="handleClick(item)" 
            v-for="(item,index) in recommendList" 
            :key="index"
            >
            <div class="img">
                <img v-lazy="item.picUrl" alt="">
                <div class="play">
                    <i class="iconfont icon-bofang"></i>
                </div>
            </div>
            <div class="number">
                <i class="iconfont icon-tinggeliang"></i>
                <span>{{item.playCount | showCount}}</span>
            </div>
            <div class="info">
                <p>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>

import {mapMutations} from 'vuex'

export default {
    name:'swiperItem',
    props:{
        recommendList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            touch:{},
            currentIndex:0
        }
    },
    mounted(){
        setTimeout(() => {
            this.setStyle();
        }, 500);    
    },
    updated(){
         this.setStyle();
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
        handleClick(item){
            this.saveMusicList(item);
            this.$router.push({path:`/playList/${item.id}`});
            /* const active = e.currentTarget;
            const left = e.currentTarget.previousElementSibling;
            const right = e.currentTarget.nextElementSibling;
            active.classList.add('right');
            active.classList.remove('active');
            left.classList.add('active');
            left.classList.remove('left');
            right.classList.add('left');
            right.classList.remove('right'); */
        },
        setStyle(){
            if(this.recommendList){
                this.$refs.recommend.children[1].classList.add('active');
                this.$refs.recommend.firstChild.classList.add('left');
                this.$refs.recommend.lastChild.classList.add('right'); 
            }
        },
        touchStart(e){
            this.touch.initated = true;
            this.touch.startX = e.touches[0].clientX;
            
        },
        touchMove(e){
            if(this.touch.initated){
                this.touch.initated = false;
                this.touch.moveX =e.touches[0].clientX-this.touch.startX;
                if(this.touch.moveX>0){
                    //console.log('上一张',this.currentIndex);
                    if(this.currentIndex == 0) {
                            this.currentIndex = this.recommendList.length - 1;
                            this.$refs.recommend.children[this.currentIndex].classList.remove('right');
                            this.$refs.recommend.children[this.currentIndex].classList.add('left');
                            this.$refs.recommend.children[this.currentIndex].previousElementSibling.classList.remove('active');
                            this.$refs.recommend.children[this.currentIndex].previousElementSibling.classList.add('right');
                            this.$refs.recommend.children[this.currentIndex].previousElementSibling.previousElementSibling.classList.remove('left');
                            this.$refs.recommend.children[this.currentIndex].previousElementSibling.previousElementSibling.classList.add('active');
						}else{
                            this.currentIndex--;
                            this.$refs.recommend.children[this.currentIndex].classList.remove('right');
                            this.$refs.recommend.children[this.currentIndex].classList.add('left');
                            this.$refs.recommend.children[this.currentIndex].nextElementSibling.classList.remove('left');
                            this.$refs.recommend.children[this.currentIndex].nextElementSibling.classList.add('active');
                            if(this.$refs.recommend.children[this.currentIndex].previousElementSibling){
                                this.$refs.recommend.children[this.currentIndex].previousElementSibling.classList.remove('active');
                                this.$refs.recommend.children[this.currentIndex].previousElementSibling.classList.add('right');
                            }else{
                                this.$refs.recommend.children[this.currentIndex].nextElementSibling.nextElementSibling.classList.remove('active');
                                this.$refs.recommend.children[this.currentIndex].nextElementSibling.nextElementSibling.classList.add('right');
                            }  
                        }
                }else if(this.touch.moveX<0){
                    //console.log('下一张',this.currentIndex);
                    if(this.currentIndex == 2){
                        this.currentIndex = 0;
                        this.$refs.recommend.children[this.currentIndex].classList.remove('active');
                        this.$refs.recommend.children[this.currentIndex].classList.add('left');
                        this.$refs.recommend.children[this.currentIndex].nextElementSibling.classList.remove('right');
                        this.$refs.recommend.children[this.currentIndex].nextElementSibling.classList.add('active');
                        this.$refs.recommend.children[this.currentIndex].nextElementSibling.nextElementSibling.classList.remove('left');
                        this.$refs.recommend.children[this.currentIndex].nextElementSibling.nextElementSibling.classList.add('right');
                    }else{
                        this.currentIndex++;
                        this.$refs.recommend.children[this.currentIndex].classList.remove('active');
                        this.$refs.recommend.children[this.currentIndex].classList.add('left');
                        this.$refs.recommend.children[this.currentIndex].previousElementSibling.classList.remove('left');
                        this.$refs.recommend.children[this.currentIndex].previousElementSibling.classList.add('right');
                        if(this.$refs.recommend.children[this.currentIndex].nextElementSibling){
                            this.$refs.recommend.children[this.currentIndex].nextElementSibling.classList.remove('right');
                            this.$refs.recommend.children[this.currentIndex].nextElementSibling.classList.add('active');
                        }else{
                            this.$refs.recommend.children[this.currentIndex].previousElementSibling.previousElementSibling.classList.remove('right');
                            this.$refs.recommend.children[this.currentIndex].previousElementSibling.previousElementSibling.classList.add('active'); 
                        }
                    }
                }
            }
        },
        touchEnd(){
            this.touch.initated = true;
        },
        ...mapMutations({
            saveMusicList:'saveMusicList'
        })
    }    
}
</script>

<style scoped>
    .recommend{
        width: 100%;
        margin: auto;
        position: relative;
        display: flex;  
        padding-bottom: 20px;
        padding-top: 20px;
    }
    .swiperItem{
        width: 35%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) scale(1.1);
        padding-bottom:5px;
        border-radius: 5px;
        overflow: hidden;
        border:1px solid #f5f5f5;
        background: #ffffff;
        transition: all .3s linear 0s;
    }
    .swiperItem img{
        width: 100%;
    }
    .swiperItem .number{
        position: absolute;
        top: 2px;
        right: 3px;
        font-size: 10px;
        color: #ffffff;
        font-weight: 500;
    }
    .swiperItem .iconfont{
        font-size: 9px;
        position: relative;
        top: -1px;
        right: 1px;
    }
    .swiperItem .img{
        position: relative;
    }
    .play{
        position: absolute;
        bottom: 10px;
        right: 6px;
        width: 25px;
        text-align: center;
        height: 25px;
        line-height: 25px;
        background: rgba(246, 239, 239,.5);
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 2px 3px 4px -2px rgb(0,0,0,.5);
    }
    .play .iconfont{
        font-size: 14px;
        color: #F43535;
    }
    .swiperItem .info{
        float: left;
        text-align: left;
        line-height: 16px;
        overflow: hidden;
        font-size: 11px;
        position: relative;
        padding:0 5px 0 5px;
        height: 30px;
    }
    .swiperItem .info p{
        margin: 0;
        padding: 0;
    }
    .active{
        opacity: 1;
        z-index: 1;
    }
    .left{
        transform:translateX(-120%)  scale(1);
        opacity: 0.45;
    }			
    .right{
        transform:translateX(20%)  scale(1);
        opacity: 0.45;
    }
</style>
<template>
    <div class="singerList" >
        <scroll class="content"
                ref="scroll"
                @scroll="scroll"
                :probeType="3">
            <div class="singerList" :class="{playing:getPlayList.length>0}">
                <div class="item" v-for="(item,index) in singerList" :key="index">
                    <div class="title">
                        <span>{{item.title}}</span>
                    </div>
                    <div class="singers" v-for="(singer,index) in item.items" :key="index" @click="handleClick(singer)">
                        <div class="img">
                            <img v-lazy="singer.picUrl" alt="">
                        </div>
                        <div class="info">
                            <span>{{singer.name}}</span>
                        </div> 
                    </div>
                </div>
            </div>
        </scroll>
        <div class="navigationList">
            <ul>
                <li 
                v-for="(item,index) in navigationList" 
                :key="index"
                :class="{active:currentIndex === index}"
                @click="changeClick(index)"
                >
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import scroll from 'components/common/scroll/scroll'

import {mapMutations} from 'vuex'

import {Playing} from 'common/mixin'

export default {
    name:'singerList',
    mixins:[Playing],
    components:{
        scroll
    },
    props:{
        singerList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            offsetTops:[],
            currentIndex:0
        }
    },
    computed:{
        navigationList(){
            return this.singerList.map((item)=>{
                return item.title.substring(0,1)
            })
        }
    },
    mounted(){
        setTimeout(()=>{
            let offsetTops = [];
            let list = document.querySelectorAll('.item');
            list.forEach((item)=>{
                offsetTops.push(item.offsetTop);
            })
            this.offsetTops = offsetTops;  
            //console.log(this.offsetTops);
        },20)
             
    },
    updated(){
        setTimeout(()=>{
            let offsetTops = [];
            let list = document.querySelectorAll('.item');
            list.forEach((item)=>{
                offsetTops.push(item.offsetTop);
            })
            this.offsetTops = offsetTops;  
            //console.log(this.offsetTops);
        },20)
        this.$refs.scroll.refresh()
    },
    methods:{
        scroll(position){
            let offsetTops = this.offsetTops;
            if (position.y > 0) {
                this.currentIndex = 0
                return
            }
            for(let i=0;i<offsetTops.length-1;i++){
                let height1 = offsetTops[i];
                let height2 = offsetTops[i+1];
                if(-position.y>=height1 && -position.y<height2){
                    this.currentIndex = i;
                    return
                }
            }
            this.currentIndex = this.navigationList.length - 1;
        },
        handleClick(item){
            let id = item.id;
            this.saveSingerList(item);
            this.$router.push({
                path:`/singers/${id}`
            })
        },
        changeClick(index){
            this.$refs.scroll.scrollTo(0,-this.offsetTops[index],300);
            this.$refs.scroll.refresh();
        },
        ...mapMutations({
            saveSingerList:'saveSingerList'
        })
    },
    watch:{

    }
}
</script>

<style scoped>
    .content{
      position: absolute;
      top: 40px;
      bottom:0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .playing{
        position: relative;
        padding-bottom: 50px;
    }
    .item .title{
        /* background: rgb(209, 205, 205); */
        color: rgb(132, 129, 129);
        font-size: 14px;
        margin-bottom: 5px;
    }
    .item .title span{
        text-align: left;
        padding-left:10px;
        font-weight: 600;
    }
    .item .singers{
        display: flex;
        padding: 5px;
    }
    .item .singers .img{
        width: 17%;  
    }
    .item .singers .img img{
        width: 100%;
        border-radius: 5px;
    }
    .item .singers .info{
        flex: 1;
        display: flex;
        flex-flow: column;
        justify-content: center;
        font-size: 14px;
        color: #2e3030;
        padding-left: 15px;
    }
    .navigationList{
        position: fixed;
        top: 40px;
        right: 5px;
        bottom: 0;
        font-size: 11px;
    }
    .navigationList ul li{
        list-style-type: none;
    }
    .navigationList ul{
        overflow: hidden;
        padding: 0;
    }
    .navigationList ul li{
        padding: 2.5px;
        text-align: center;
        color: #757575;
        font-weight: 600;
    }
    .navigationList ul li.active{
        color: #d44439;
    }
</style>
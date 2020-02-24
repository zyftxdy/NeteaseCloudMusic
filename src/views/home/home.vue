<template>
    <div id='home'>
        <scroll
            class="content"
            ref="scroll"
            :probeType="3"
        >
            <!-- 轮播图 -->
            <swiper :banners="banners"></swiper>
            <!-- 推荐歌单 -->
            <music-list :list="recommendList"></music-list>
            <!-- 新歌|电台 -->
            <radio-list  
                :radioList="radioList"
                :programList="programList"
                :currentIndex="radioListIndex" 
                @itemClick="changeClick"></radio-list>    
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>

import scroll from 'components/common/scroll/scroll'
import swiper from 'components/common/swiper/swiper'

import musicList from './childComps/music/musicList'
import radioList from './childComps/radio/radioList'


//引用api
import {getRecommendList,getRecommendMusic,getRecommendRadio,getBanner} from 'api/home'

import {Song, Program} from '../../common/song'

export default {
    components: {    
        musicList,
        radioList,
        swiper,
        scroll
    },
    data() {
        return {
            recommendList:[],
            radioList:[],
            programList:[],
            banners:[],
            radioListIndex:0
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated(){
      this.$refs.scroll.refresh()
    },
    //方法集合
    methods: {
        //推荐api请求
        _getRecommend(){
            //推荐歌单
            getRecommendList().then(res => {
                //console.log("----歌单----");
                //console.log(res); 
                const list = res.result;
                //每次只取六首
                this.recommendList.push(list[0]);
                for(let i =0;i<5;){
                   const index = Math.ceil(Math.random()*(list.length-1));
                   if(this.recommendList.indexOf(list[index]) == -1){
                       this.recommendList.push(list[index]);
                       i++;
                   }
                }  
            })

            //推荐歌曲
            getRecommendMusic().then(res => {
                /* console.log("----歌曲----");
                console.log(res); */
                const list = res.result;
                let number = [];
                //每次取三首
                for(let i =0;i<3;){
                    const index = Math.floor(Math.random()*list.length);
                    if(number.indexOf(index) == -1){
                            number.push(index);
                            const songlist = new Song(list[index]);
                            this.radioList.push(songlist);
                            i++;
                    }
                } 
            })

            //推荐节目
            getRecommendRadio().then(res => {
                /* console.log("----节目----");
                console.log(res); */  
                const list = res.programs;
                let number = [];
                //每次取三首
                for(let i =0;i<3;){
                    const index = Math.floor(Math.random()*list.length); 
                    if(number.indexOf(index) == -1){
                        number.push(index);
                        const programlist = new Program(list[index]);
                        this.programList.push(programlist);
                        i++;
                    } 
                }
            })
            //获取轮播图
            getBanner().then(res => {
                //console.log(res)
                this.banners = res.banners;
            })
        },
        //点击切换
        changeClick(index){
            this.radioListIndex = index;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        setTimeout(()=>{
            this._getRecommend();
        },300)   
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
}
</script>
<style  scoped>
    #home{
        padding-top: 40px;
    }
    .content{
      position: absolute;
      top: 40px;
      bottom:0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
</style>
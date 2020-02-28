<template>
    <div class="rankingList">
        <scroll
            class="content"
            ref="scroll"
            :probeType="3"
        >
            <official-list 
                :officialList="officialList" 
                @officialClick="officialClick"></official-list>
            <recommend-list 
                :recommendList="recommendList"
                @recommendClick="recommendClick"></recommend-list>
            <global-list
                :globalList="globalList"
                @globalListClick="globalListClick"
            ></global-list>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>

import scroll from 'components/common/scroll/scroll'

import officialList from './childComps/officialList'
import recommendList from './childComps/recommendList'
import globalList from './childComps/globalList'

import {getRankList,RankList} from 'api/rankingList'
import {MUSIC_OFFICIAL_ID,MUSIC_RECOMMEND_ID,MUSIC_GLOBAL_ID} from 'common/common'

import {mapMutations} from 'vuex'

export default {
    name:"rankingList",
    components:{
        officialList,
        recommendList,
        globalList,
        scroll
    },
    data(){
        return{
            officialList:[],
            recommendList:[],
            globalList:[]
        }
    },
    mounted(){
        this._getRankList();
    },
    updated(){
        this.$refs.scroll.refresh();
    },
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated(){
      this.$refs.scroll.refresh()
    },
    methods:{
        //跳转歌单详情(官方榜)
        officialClick(value){
            const id = value.id;
            this.saveRankDetail(value);
            this.$router.push({
                path:`/rankingList/${id}`,
            })
        },
        //跳转至歌单详情(推荐榜)
        recommendClick(value){
            const id = value.id;
            this.saveRankDetail(value);
            this.$router.push({
                path:`/rankingList/${id}`
            })  
        },
        //跳转至歌单详情(全球榜榜)
        globalListClick(value){
            const id = value.id;
            this.saveRankDetail(value);
            this.$router.push({
                path:`/rankingList/${id}`
            })  
        },

        //拿到排行榜数据
        _getRankList(){
            //官方榜
            for(let i=0;i<MUSIC_OFFICIAL_ID.length;i++){
                    getRankList(MUSIC_OFFICIAL_ID[i]).then(res =>{
                        let list = new RankList(res.playlist);
                        this.officialList.push(list);
                    })               
            }
            //推荐榜
            for(let i=0;i<MUSIC_RECOMMEND_ID.length;i++){
                    getRankList(MUSIC_RECOMMEND_ID[i]).then(res =>{
                        let list = new RankList(res.playlist)
                        this.recommendList.push(list);
                    })
            }
            //全球榜
            for(let i=0;i<MUSIC_GLOBAL_ID.length;i++){
                    getRankList(MUSIC_GLOBAL_ID[i]).then(res =>{
                        let list = new RankList(res.playlist)
                        this.globalList.push(list);
                    })
            }
        }, 
        
        ...mapMutations({
            saveRankDetail:'saveRankList'
        })
    }
}
</script>

<style scoped>
    .rankingList{
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
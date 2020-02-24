<template>
    <transition name="search">
        <div id="search">        
            <search-bar @valueClick="valueClick" @setValue="setValue" :searchValue="value"></search-bar>
            <scroll
                class="content"
                ref="scroll"
                :probeType="3"
                :pullUpLoad="true"
                @pullingUp="loadMore"
            >
                <history-list
                    v-show="!value"
                    :historyList="getHistoryList" 
                    @showConfirm="showConfirm"
                    @searchValue="searchValue"
                ></history-list>
                <hot-list
                    v-show="!value"
                    :hotList="hotList"
                ></hot-list>
                <search-list
                    ref="searchResult"
                    v-show="value" 
                    :searchItem="value"
                    @refresh="refresh"></search-list>
            </scroll>
            <confirm ref="confrim" text="确定要删除全部历史记录?" @deleteHistory="deleteHistory"></confirm>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>

import scroll from 'components/common/scroll/scroll'
import confirm from 'components/common/confirm/confirm'

import searchBar from './childComps/searchBar/searchBar'
import historyList from './childComps/historyList/historyList'
import hotList from './childComps/hotList/hotList'
import searchList from './childComps/searchList/searchList'

import {getSearchHot} from 'api/search'

import {mapGetters} from 'vuex'

export default {
    name:'search',
    components:{
        scroll,
        confirm,
        searchBar,
        historyList,
        hotList,
        searchList
    },
    data(){
        return {
            value:"",
            hotList:[],

        }
    },
    computed:{
        ...mapGetters(['getHistoryList'])
    },
    created(){
        this._getSearchHot();
        this.hotListSearch();

    },
    mounted(){

    },
    activated(){
       
    },
    methods:{
        //添加历史记录
        valueClick(value){
            if(value && value != null){
                //赋值
                this.value = value;
                //1.添加历史记录
                this.$store.dispatch('addHistory',value);
            }            
        },
        showConfirm(){
            this.$refs.confrim.show();
        },
        //删除历史记录
        deleteHistory(){
            this.$store.dispatch('deleteHistory');
        },
        //历史记录里重新搜索
        searchValue(item){
            //1/赋值
            this.value = item;
            //2.添加历史记录
            this.$store.dispatch('addHistory',item);
        },
        //热搜榜里重新搜索(通过挂载总线机制)
        hotListSearch(){
            this.bus.$on('hotListValue',(value)=>{
                //1.赋值
                this.value = value;
                //2.添加历史记录
                this.$store.dispatch('addHistory',value);
            })
        },
        //
        setValue(value){
            this.value = value;
            this.$refs.scroll.scrollTo(0,0,0);
            this.$refs.scroll.refresh()
        },
        //获取热搜榜数据
        _getSearchHot(){
            getSearchHot().then(res => {
                //console.log(res);
                this.hotList = res.data;
            })
        },
        //加载更多
        loadMore(){
            this.$refs.searchResult.searchMore();
        },
        refresh(){
            setTimeout(() => {
                this.$refs.scroll.refresh()
            }, 20) 
        }
    }
}
</script>

<style scoped>
    .search-enter-active, .search-leave-active {
        transition: all .3s;
    }
    .search-enter, .search-leave-to {
        transform: translateY(100%);
        opacity: 0;
    }
    #search{
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
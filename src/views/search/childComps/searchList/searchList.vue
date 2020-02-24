<template>
    <div class="searchList">
        <div class="suggest" v-if="suggest.artists || suggest.playlists">
            <div class="title"><span>你可能感兴趣:</span></div>
            <div class="artists" v-if="suggest.artists" @click="selectSinger(suggest.artists[0])">
                <div class="img">
                    <img :src="suggest.artists[0].img1v1Url" alt="">
                </div>
                <div class="info">
                    <p>歌手:<span>{{suggest.artists[0].name}}</span></p>
                </div>
            </div>
            <div class="playList" v-if="suggest.playlists" @click="selectList(suggest.playlists[0])">
                <div class="img">
                    <img :src="suggest.playlists[0].coverImgUrl" alt="">
                </div>
                <div class="info">
                    <p>歌单:<span>{{suggest.playlists[0].name}}</span></p>
                </div>
            </div>
        </div>
        <div class="songs" v-if="songs && songs.length">
            <div class="title"><span>单曲</span></div> 
            <div class="songList">
                <div class="item" v-for="(item,index) in songs" :key="index" @click="saveSong(item)">
                    <span>{{item.name}}</span>
                    <span>{{item.singer}} - {{item.album}}</span>
                </div>
            </div>
        </div>
        <!-- <div class="noneList" v-if="!suggest.length &&!songs.length">未找到与"<span>{{searchItem}}</span>"相关的内容</div> -->
        <loading v-show="haveMore && searchItem && songs.length"></loading>
    </div>   
</template>

<script>

import loading from 'components/common/loading/loading'

import {getSearchSuggest,getSearchSong} from 'api/search'

import {SearchSong} from 'common/song'

import {mapMutations} from 'vuex'

import {savePlayList} from 'common/mixin'

export default {
    name:'searchList',
    mixins:[savePlayList],
    components:{
        loading
    },
    props:{
        searchItem:{
            type:String,
            default:""
        }
    },
    data(){
        return{
            suggest:{},
            songs:[],
            page:0,
            haveMore:true
        }
    },
    methods:{
        //跳转至歌单详情
        selectList(item){
            let musicList = {};
            musicList.id = item.id;
            musicList.name = item.name;
            musicList.picUrl = item.coverImgUrl;
            musicList.playCount = item.playCount;
            this.saveMusicList(musicList);
            this.$router.push({
                path:`/search/list/${musicList.id}`
            })
        },
        //跳转至歌手详情
        selectSinger(item){
            console.log(item);
            let singer = {};
            singer.id = item.id;
            singer.name = item.name;
            singer.picUrl = item.img1v1Url;
            singer.alias = item.alias.join('/');
            this.saveSingerList(singer);
            this.$router.push({
                path:`/search/singer/${singer.id}`
            })
        },
        //查找最佳匹配
        _getSuggest(){ 
            getSearchSuggest(this.searchItem).then(res=>{
                //console.log(res);
                this.suggest = res.result;
            })           
        },
        //获取歌曲
        _getSongs(){
            getSearchSong(this.searchItem,this.page).then(res => {
                if(!res.result.songs){
                    this.haveMore = false;
                    return
                }
                let list = res.result.songs;
                //console.log(list);
                let searchList = [];
                list.forEach(item => {
                    searchList.push(new SearchSong(item));
                });
                this.songs.push(...searchList);
                //console.log(this.songs);
                this.page += 30;
                this.$emit('refresh');
            })
        },
        //获取更多歌曲
        searchMore(){
            if(!this.haveMore){
                return
            }
            if (!this.songs.length) {
                return
            }
            getSearchSong(this.searchItem,this.page).then(res => {
                if(!res.result.songs){
                    this.haveMore = false;
                    return
                }
                let list = res.result.songs;
                let searchList = [];
                list.forEach(item => {
                    searchList.push(new SearchSong(item));
                });
                this.songs.push(...searchList);
                //console.log(this.songs);
                this.page += 30;
                this.$emit('refresh');
            })
        },

        ...mapMutations({
            saveMusicList:'saveMusicList',
            saveSingerList:'saveSingerList'
        })
    },
    watch:{
        searchItem(){
            if(this.searchItem === ""){
                this.suggest = {};
                this.songs = [];
                return
            }
            this.suggest = {};
            this.songs = [];
            this.page = 0;
            this._getSuggest();
            this._getSongs();
        }
    }
}
</script>

<style scoped>
    .suggest{
        padding: 10px;
    }
    .suggest .title{
        font-size: 13px;
        color:rgb(138, 135, 135);
        padding:0 0 5px 5px;
    }
    .suggest .artists{
        display: flex;
        justify-content: center;
        align-items: center;
        padding:5px 5px 0 5px;
    }
    .suggest p{
        width: 60%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .artists .img{
        width: 15%;
    }
    .artists .img img{
        width: 100%;
        border-radius: 50%;
    }
    .artists .info{
        flex: 1;
        padding-left: 10px;
        font-size: 14px;
        color: #2e3030;
    }
    .suggest .playList{
        display: flex;
        justify-content: center;
        align-items: center;
        padding:5px 5px 0 5px;
    }
    .playList .img{
        width: 15%;
    }
    .playList .img img{
        width: 100%;
        border-radius: 50%;
    }
    .playList .info{
        flex: 1;
        padding-left: 10px;
        font-size: 12px;
        color: #2e3030;
    }
    .songs{
        padding: 10px;
    }
    .songs .title{
        color: #2e3030;
        font-size: 17px;
        padding:0 0 5px 5px;
    }
    /* .songs .songList{
        padding-bottom:20px;
    } */
    .songList .item{
        padding:5px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .item span{
        width: 80%;
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .item span:first-child{
        font-size: 14px;
        color: #2e3030;
    }
    .item span:last-child{
        font-size: 12px;
        color: rgb(138, 135, 135);
    }
</style>
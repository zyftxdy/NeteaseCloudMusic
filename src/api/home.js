import {api} from './axios'

//未登录时推荐歌单
export function getRecommendList(){
    return api({
        url:'/personalized'
    })
}

//未登录时推荐歌单详情
export function getListDetails(id){
    return api({
        url:'/playlist/detail',
        params:{
            id
        }
    })
}

export class MusicList{
    constructor(itemInfo){
        this.id = itemInfo.playlist.id;
        this.name = itemInfo.playlist.name;
        this.playCount = itemInfo.playlist.playCount;
        this.updateTime = itemInfo.playlist.updateTime;
        this.length = itemInfo.playlist.tracks.length;
        this.desc = itemInfo.playlist.description;
        this.tracks = itemInfo.playlist.tracks;
        this.image = itemInfo.playlist.coverImgUrl;
    }
}

//未登录时推荐歌曲
export function getRecommendMusic(){
    return api({
        url:'/personalized/newsong'
    })
}

//新碟上架
export function getRecommendDisc(){
    return api({
        url:'/album/newest'
    })
}

//未登录时推荐节目
export function getRecommendRadio() {
    return api({
        url:'/program/recommend'
    })
}

//未登录时推荐MV
export function getRecommendVideo() {
    return api({
        url:'/personalized/mv'
    })
}

//获取轮播图
export function getBanner() {
    return api({
        url:'/banner'
    })
}
//  /song/url?id=#  歌曲存放
//  /lyric?id=#    歌词
//  subscribers 歌单收藏者
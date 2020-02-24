import {api} from './axios'

//获取歌手(100个)
export function getSinger(){
    return api({
        url:'/top/artists?limit=100'
    })
}

//获取歌手部分信息及热门单曲
export function getSingerDetail(id){
    return api({
        url:'/artists',
        params:{
            id
        }
    })
}
import {api} from './axios'

//获取歌曲
export function getSong(id){
    return api({
        url:'/song/url',
        params:{
            id
        }
    })
}

//获取歌词
export function getLyric(id){
    return api({
        url:'/lyric',
        params:{
            id
        }
    })
}
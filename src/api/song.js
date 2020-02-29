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

//检查音乐是否可用
export function checkSong(id){
    return api({
        url:'/check/music',
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
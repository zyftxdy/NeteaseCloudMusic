import {api} from './axios'

//热搜列表(详细)
export function getSearchHot(){
    return api({
        url:'/search/hot/detail'
    })
}

//搜索歌曲
export function getSearchSong(keywords,offset){
    return api({
        url:'/search',
        params:{
            keywords,
            offset 
        }
    })
}

//搜索建议
export function getSearchSuggest(keywords){
    return api({
        url:'/search/suggest',
        params:{
            keywords
        }
    })
}

//歌曲详情
export function getSongDetail (ids) { 
    return api({
        url:'/song/detail',
        params:{
            ids
        }
    })
}
//albums 专辑

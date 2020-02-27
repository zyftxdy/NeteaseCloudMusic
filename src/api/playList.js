import {api} from './axios'

//获取歌单 ( 网友精选碟 )
export function getPlayList(){
    return api({
        url:'/top/playlist?limit=100'
    })
}

export class ListItem{
    constructor(itemInfo){
        this.id = itemInfo.id;
        this.name = itemInfo.name;
        this.picUrl = itemInfo.coverImgUrl;
        this.playCount = itemInfo.playCount;
        this.desc = itemInfo.description;
        this.updateTime = itemInfo.updateTime;
    }
}
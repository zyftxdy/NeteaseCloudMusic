import {api} from './axios'

//获取排行榜
export function getRankList(idx){
    return api({
        url:'/top/list',
        params:{
            idx
        }
    })
}


export class RankList{
    constructor(itemInfo){
        this.id = itemInfo.id;
        this.name = itemInfo.name;
        this.image = itemInfo.coverImgUrl;
        this.updateTime = itemInfo.updateTime;
        this.desc = itemInfo.description;
        this.tracks = itemInfo.tracks;
        this.top = itemInfo.tracks.slice(0,3);
        this.length = itemInfo.tracks.length;
    }
}

/*  官方榜
    "0": 云音乐新歌榜,
    "1": 云音乐热歌榜,
    "2": 网易原创歌曲榜,
    "3": 云音乐飙升榜,
    "4": 云音乐国电榜,

    推荐榜
    "23": 云音乐说唱榜
    "24": 云音乐古典音乐榜
    "25": 云音乐电音榜
    "26": 抖音排行榜
    "22": 云音乐ACG音乐榜
    "32": 云音乐欧美新歌榜

    全球榜
    "5": UK排行榜周榜
    "6": 美国Billboard周榜
    "21": Beatport全球电子舞曲榜
    "10": 日本Oricon周榜
    "8": iTunes榜
    "29": 英国Q杂志中文版周榜
 */
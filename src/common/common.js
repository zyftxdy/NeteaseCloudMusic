
//官方榜ID
const MUSIC_OFFICIAL_ID = [0,1,2,3,4];

//推荐榜ID
const MUSIC_RECOMMEND_ID = [23,25,32,26,22,24]

//全球榜ID
const MUSIC_GLOBAL_ID = [5,6,8,10,21,29]


export {MUSIC_OFFICIAL_ID,MUSIC_RECOMMEND_ID,MUSIC_GLOBAL_ID}

export const playMode = {
    sequence: 0,//顺序
    loop: 1, //单曲
    random: 2 //随机
  }


//时间戳转日期
/* export function timestampToTime(timestamp,fmt){
    let date;
    if((""+timestamp).length === 10){
        date = new Date(timestamp*1000);
    }else{
        date = new Date(timestamp);
    }

    if(new RegExp(/y+/).test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+''));
    }
    return fmt;
    
} */
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
 */
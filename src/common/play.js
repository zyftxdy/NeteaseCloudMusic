

//歌曲时间处理
export function formatTime(time){
    let h,m,s;
    if(time>3600){
        h = Math.floor(time/3600);
        m = Math.floor(time%3600/60);
        s = Math.floor(time%60);
    }else{
        m = Math.floor(time/60);
        s = Math.floor(time%60);
    }
    return h?h+m+':'+(s<10?'0'+s:s):m+':'+(s<10?'0'+s:s);
}
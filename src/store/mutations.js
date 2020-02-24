
const mutations ={
    //排行歌单详情
    saveRankList(state,rankList){
        state.rankListDetail = rankList
    },
    //首页推荐歌单详情
    saveMusicList(state,musicList){
        state.musicListDetail = musicList
    },
    //歌手详情
    saveSingerList(state,singerList){
        state.singerDetail = singerList
    },
    //播放列表
    savePlayList(state,song){
        let playList = state.playList.slice();
        //let sequenceList = state.sequenceList.slice();
        let currentIndex = state.currentIndex;

        let fdIndex = findIndex(playList,song);

        currentIndex++;
        //已经包含这首歌曲
        if(fdIndex>-1){
            if(currentIndex === fdIndex){
                currentIndex = fdIndex;
            }else{
                playList.splice(fdIndex,1);
                playList.push(song);
                currentIndex = playList.length - 1;
            }
        }else{
            playList.push(song);
            currentIndex = playList.length - 1;
        }

        state.currentIndex = currentIndex;
        state.playList = playList;
        state.fullScreen = true;
        state.playing = true;
    },

    //全部播放
    savePlayLists(state,list){
        state.playList = list;
        state.currentIndex = 0;
        state.fullScreen = true;
        state.playing = true;
    },

    //取消全屏
    setFullScreen(state,flag){
        state.fullScreen = flag;
    },
    //播放状态
    setPlaying(state,flag){
        state.playing = flag;
    },
    //设置当前播放
    setCurrentIndex(state,index){
        state.currentIndex = index;
    },
    //清空播放列表
    clearPlayList(state){
        state.playList = [];
        state.currentIndex = -1;
        state.playing = false;
    },
    //删除选中的歌曲
    deleteSong(state,song){
        let currentIndex = state.currentIndex;
        let playList = state.playList;
        let fdIndex = findIndex(playList,song);
        playList.splice(fdIndex,1);
        if(currentIndex > fdIndex || currentIndex == playList.length){
            currentIndex --;
        }
        state.playList = playList;
        state.currentIndex = currentIndex;
        let flag = playList.length > 0;
        state.playing = flag;

    },

    //显示侧栏
    showHistoryMusic(state,flag){
        state.showHistory = flag;
    },
    //添加历史记录
    saveHistory(state,historys){
        state.historyList = historys;
      },
    //删除历史记录
    delHistory(state,historys){
        state.historyList = historys;
    },
    //添加最近播放
    savePlay(state,plays){
        state.playHistory = plays;
    },
    //删除最近播放
    delPlay(state,plays){
        state.playHistory = plays;
    },
    //添加我的收藏
    saveFavorite(state,favorites){
        state.favorites = favorites;  
    },
    //删除我的收藏
    delFavorite(state,favorites){
        state.favorites = favorites;
    },

    //更改播放模式
    setPlayMode(state,value){
        state.mode = value;
    }
    
}

function findIndex(list,song){
    return list.findIndex((item)=>{
        return item.id === song.id
    })
}

export default mutations
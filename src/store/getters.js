
const getters = {
    getHistoryList(state){
        return state.historyList;
    },
    getRankDetail(state){
        return state.rankListDetail;
    },
    getMusicList(state){
        return state.musicListDetail;
    },
    getSingerList(state){
        return state.singerDetail;
    },
    getPlayList(state){
        return state.playList;
    },
    currentIndex(state){
        return state.currentIndex;
    },
    fullScreen(state){
        return state.fullScreen;
    },
    playSong(state){
        return state.playList[state.currentIndex] || {};
    },
    playing(state){
        return state.playing;
    },
    showHistory(state){
        return state.showHistory;
    },
    playHistory(state){
        return state.playHistory;
    },
    favorites(state){
        return state.favorites;
    },
    mode(state){
        return state.mode;
    }
}

export default getters
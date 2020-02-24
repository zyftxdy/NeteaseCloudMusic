import {setHistory,deleteHistory,setPlayHistory,deletePlayHistory,setFavorite,deleteFavorite} from '../common/stroage'

const actions = {

    insertSong(context,song){
      context.commit('savePlayList',song);
    },

    //搜索历史
    addHistory(context,value){
      context.commit('saveHistory',setHistory(value));
    },
    deleteHistory(context){
      context.commit('delHistory',deleteHistory());
    },

    //最近播放
    addPlay(context,value){
      context.commit('savePlay',setPlayHistory(value));
    },
    deletePlay(context,value){
      context.commit('delPlay',deletePlayHistory(value));
    },

    //我的收藏
    addFavorite(context,value){
      context.commit('saveFavorite',setFavorite(value));
    },
    deleteFavorite(context,value){
      context.commit('delFavorite',deleteFavorite(value));
    },

    //更改播放模式
    changeMode(context,value){
      context.commit('setPlayMode',value);     
    }
}

export default actions
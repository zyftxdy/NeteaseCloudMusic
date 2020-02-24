
import {playMode} from '../common/common'
import {getHistory,getPlayHistory,getFavorite} from '../common/stroage'

const state = {
    //首页推荐歌单详情
    musicListDetail:{},
    //排行歌单详情
    rankListDetail:{},
    //歌手详情
    singerDetail:{},
    //播放列表
    playList:[],
    // 当前播放索引
    currentIndex: -1,
    //播放模式
    mode:playMode.sequence,
    //是否正在播放
    playing:false,
    //全屏播放
    fullScreen:false,
    //显示侧栏
    showHistory:false,
    //历史记录
    historyList:getHistory(),
    // 播放历史
    playHistory: getPlayHistory(),
    //我的收藏
    favorites:getFavorite(),
}

export default state
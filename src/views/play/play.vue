<template>
    <div class="play" v-show="getPlayList.length>0">
        <transition name="normalPlay">
            <div class="normalPlay" v-show="fullScreen">
                <div class="background">
                    <img :src="playSong.image" width="100%" height="100%">
                </div>
                <div class="top">
                    <nav-bar class="topBar">
                        <div slot="left" @click="handleClick">
                            <i class="iconfont icon-xiangxia"></i>
                        </div>
                        <div slot="center" class="center">
                            <span>{{playSong.name}}</span>
                            <span>{{playSong.singer}}</span>
                        </div>
                        <div slot="right">
                            <i class="iconfont" :class="heart" @click="toggleHeart(playSong)"></i>
                        </div>
                    </nav-bar>
                </div>
                <div class="middle" @click="changeMiddle">
                    <transition name="middleL">
                    <div class="middle">
                        <div class="playImg" v-show="currentShow === 'cd'">
                                <img src="../../assets/img/common/play.png" alt="" :class="active">
                        </div> 
                        <div class="middle-l" :class="active" v-show="currentShow === 'cd'">
                            <img src="../../assets/img/common/disc.png" alt="">
                            <div class="cd">
                                <img v-lazy="playSong.image" alt=""> 
                            </div>
                        </div>
                    </div>
                    </transition>
                    <transition name="milldeR">
                        <scroll class="middle-r" ref="scroll" :probeType="3" v-show="currentShow === 'lyric'">
                            <div class="content">
                                    <span
                                        v-for="(item,index) in lyric"
                                        :key="index">{{item.lyric}}</span>
                                    <span v-show="lyric.length==0" class="noLyric">
                                        暂无歌词
                                    </span>
                            </div>
                        </scroll>
                    </transition>
                </div>
                <div class="bottom">
                    <div class="progress-wrapper">
                        <span class="time time-l">{{formatTime(currentTime)}}</span>
                        <div class="progress" ref="progress">
                            <div class="line" ref="line" @click="progressClick">
                                <div class="bar" ref="bar"></div>
                                <div class="playBar" ref="playBar"
                                    @click.stop
                                    @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"><!-- 拖动事件 -->
                                    <!-- <i class="iconfont icon-jindudianhui"></i> -->
                                </div>
                            </div>
                        </div>
                        <span class="time time-r">{{formatTime(duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon icon-left">
                            <i class="iconfont" :class="playMode" @click.stop="changePlayMode"></i>
                        </div>
                        <div class="center">
                            <div class="icon icon-left">
                                <i class="iconfont icon-shangyishoushangyige" @click.stop="prev"></i>
                            </div>
                            <div class="icon icon-center">
                                <i class="iconfont" :class="play" @click.stop="togglePlaying"></i>
                            </div>
                            <div class="icon icon-right">
                                <i class="iconfont icon-xiayigexiayishou" @click.stop="next"></i>
                            </div>
                        </div>
                        <div class="icon icon-right">
                            <i class="iconfont icon-liebiaoxiangyou" @click.stop="showPlayList"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="miniPlay">
            <div class="miniPlay" v-show="!fullScreen" @click="openClick">
                <div class="miniBar" ref="miniBar"></div>
                <div class="icon">
                    <img :src="playSong.image" alt="" :class="active">
                </div>
                <div class="info">
                    <span>{{playSong.name}}</span>
                    <span>{{playSong.singer}}</span>
                </div>
                <div class="control">
                    <i class="iconfont" :class="play" @click.stop="togglePlaying"></i>
                </div>
                <div class="playList">
                    <i class="iconfont icon-liebiaoxiangyou" @click.stop="showPlayList"></i>
                </div>
            </div>
        </transition>
        <audio 
            id="audio" 
            ref="audio" 
            autoplay 
            @canplay="ready"
            @ended="end" 
            @timeupdate="onTimeUpdate" 
            @error="error"></audio>
        <play-list ref="playList" @changePlayMode="changePlayMode" @stopMusic="stopMusic"></play-list>
        <tips :text="ModeText" v-show="ModeShow"></tips>
    </div>
    
</template>

<script>

import navBar from 'components/common/navBar/navBar'
import tips from 'components/common/tips/tips'
import scroll from 'components/common/scroll/scroll'

import playList from './childComps/playList'

import {getSong,getLyric} from 'api/song'
/* import {formatTime} from 'common/play'  */
import {mapGetters,mapMutations, mapActions} from 'vuex'
import {playMode} from 'common/common'

export default {
    name:'play',
    components:{
        navBar,
        playList,
        tips,
        scroll
    },
    data(){
        return{
            url:'',
            currentTime:0,
            duration:0,
            playReady:false,
            progressBar:0,
            currentShow:'cd',
            touch:{},
            ModeText:'',
            ModeShow:false,
            lyric:[]
        }
    },
    computed:{
        ...mapGetters(['getPlayList','currentIndex','fullScreen','playSong','playing','favorites','mode']),
        play(){
            return this.playing ? 'icon-zhengzaibofang' : 'icon-quanbubofang'
        },
        active(){
            return this.playing ? 'animated' : 'notAnimated'
        },
        heart(){
            const index = this.favorites.findIndex((item)=>{ return item.id === this.playSong.id})
            if( index === -1){
                return 'icon-heart'
            }else{
                return 'icon-xihuan'
            }
        },
        playMode(){
            /* if(this.mode === 0){
                return 'icon--lbxh' //循环播放
            }else if(this.mode === 1){
                return 'icon-danquxunhuan' //单曲循环
            }else if(this.mode === 2){
                return 'icon-suijibofang' //随机播放
            }  */
            return this.mode === 0?'icon--lbxh':(this.mode===1?'icon-danquxunhuan':'icon-suijibofang')
        }
    },
    updated(){
        this.$refs.scroll.refresh();
    },
    watch:{
        playSong(newVal,oldVal){
            if(!newVal.id){
                return
            }
            if(newVal.id === oldVal.id){
                return
            }
            this.$refs.audio.play();//?
            this.$refs.audio.currentTime = 0;
            this._getSong(newVal.id);
        },
        url(newUrl){
            this._getLyric(this.playSong.id);
            this.$refs.audio.src = newUrl;
            let stop = setInterval(()=>{
                this.duration = this.$refs.audio.duration;
                this.setPlaying(true);
                //console.log(this.duration);
                if(this.duration){
                    clearInterval(stop);
                }
            },150)  
        }
    },
    methods:{
        //进度条拖拽
        touchStart(e){
            this.touch.initiated = true;
            this.touch.startX = e.touches[0].clientX;
            this.touch.left = this.$refs.bar.clientWidth;
            //console.log(this.touch);
        },
        touchMove(e){
            if (!this.touch.initiated) {
                return
            }           
           this.touch.moveX = this.touch.left+e.touches[0].clientX-this.touch.startX;
           let percentage = this.touch.moveX/this.$refs.line.clientWidth;
            if(percentage>=1){
                percentage = 1;
            }
            let currentTime = this.duration*percentage;
            this.$refs.audio.currentTime = currentTime;
            this.$refs.audio.pause()
            this.setPlaying(false)
        },
        touchEnd(){
            this.touch.initiated = false;
            this.$refs.audio.play()
            this.setPlaying(true)
        },
        
        progressClick(e){
            //bug 不能频繁点击(稍后解决)
            let toX = e.offsetX;
            let X = this.$refs.line.offsetWidth;
            let percentage = Math.floor(toX/X*1000000)/1000000;
            let currentTime = this.duration*percentage;
            this.$refs.audio.currentTime = currentTime;
            if (!this.playing) {
                this.$refs.audio.play()
                this.setPlaying(true)
            }
        },

        handleClick(){
            this.setFullScreen(false);
        },
        openClick(){
            this.setFullScreen(true);
        },
        stopMusic(){
            this.$refs.audio.pause();
            this.$refs.audio.currentTime = 0;
        },
        //更改播放模式
        changePlayMode(){
            if(this.mode === 0){
                this.changeMode(playMode.loop)
                this.showMode('单曲循环')
            }else if(this.mode === 1){
                this.changeMode(playMode.random)
                this.showMode('随机播放')
            }else if(this.mode === 2){
                this.changeMode(playMode.sequence)
                this.showMode('循环播放')
            }
        },
        //切换提示
        showMode(text){
            this.ModeShow = true;
            this.ModeText = text;
            
            setTimeout(()=>{
                this.ModeShow = false;
            },1000)
        },
        //切换歌词
        changeMiddle(){
            //console.log(this.currentShow);
            if(this.currentShow==='cd'){
                this.currentShow='lyric'
            }else{
                this.currentShow='cd'
            }
        },
        //添加取消喜欢
        toggleHeart(item){
            const index = this.favorites.findIndex((item)=>{return item.id === this.playSong.id});
            if(index === -1){
                this.addFavorite(item);
            }else{
                this.deleteFavorite(item);
            } 
        },
        //播放暂停
        togglePlaying(){
            const audio = this.$refs.audio;
            this.setPlaying(!this.playing);
            this.playing ? audio.play() : audio.pause();
        },
        //播放完毕
        end(){
            if(this.mode === 0){
                //循环播放
                this.next();
            }else if(this.mode ===1){
                this.loop();//单曲循环
            }else if(this.mode ===2){
                this.randomPlay();//随机播放
            }
            
        },
        //上一首
        prev(){
            if(!this.playReady){
                return
            }
            if(this.getPlayList.length === 1){
                this.loop();
            }else{
                if(this.mode === 0){
                    let index = this.currentIndex-1;
                    if(index === -1){
                        index = this.getPlayList.length-1;
                    }
                    this.setCurrentIndex(index);
                    if(!this.playing){
                        this.togglePlaying();
                    }
                }else if(this.mode ===2){
                    this.randomPlay();
                }else if(this.mode === 1){
                    this.loop();
                }
                
            }
            this.playReady = false;
        },
        //下一首
        next(){
            if(!this.playReady){
                return
            }
            if(this.getPlayList.length === 1){
                this.loop();
            }else{
                if(this.mode === 0){
                    let index = this.currentIndex+1;
                    if(index === this.getPlayList.length){
                        index = 0;
                    }
                    this.setCurrentIndex(index);
                    if(!this.playing){
                        this.togglePlaying();
                    }
                }else if(this.mode === 2){
                    this.randomPlay();
                }else if(this.mode === 1){
                    this.loop();                    
                }
            }
            this.playReady = false;
        },
        //单曲循环
        loop(){
            this.$refs.audio.currentTime = 0;
            this.$refs.audio.play();
        },
        //随机播放
        randomPlay(){
            let index = Math.floor(Math.random()*this.getPlayList.length);
            this.setCurrentIndex(index);
            if(!this.playing){
                this.togglePlaying();
            }
        },
        //歌曲准备完毕
        ready(){
            this.playReady = true;
            //预留播放历史
        },
        //音频错误
        error(){
            this.playReady = false;
        },
        //显示音乐小列表
        showPlayList(){
            this.$refs.playList.show();
        },
        //获取歌曲URL地址
        _getSong(id){
            getSong(id).then(res=>{
                this.url = res.data[0].url;
                //console.log(this.url);
            }).catch(()=>{
                console.log("网络状况不佳"); 
            })
        },
        //获取歌曲歌词
        _getLyric(id){
            getLyric(id).then(res=>{
                if(res.lrc){
                    this.lyric = [];
                    let t = res.lrc.lyric;
                    let arr = t.split(/\[/);               
                    for (let i = 0; i < arr.length; i++) {
                        if(arr[i]!= ""){
                            let lyric = arr[i].split(/\]/);
                            let songLyric = {};
                            if(lyric[1].indexOf('\n')!=0){
                                songLyric.time = lyric[0];
                                songLyric.lyric = lyric[1];
                                this.lyric.push(songLyric);
                            } 
                        }
                    }
                }                  
            })
        },
        ...mapMutations({
            setFullScreen:'setFullScreen',
            setPlaying:'setPlaying',
            setCurrentIndex:'setCurrentIndex'
        }),
        ...mapActions({
            addFavorite:'addFavorite',
            deleteFavorite:'deleteFavorite',
            changeMode:'changeMode'
        }),

        //计算歌曲总时长
        formatTime(time){
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
        },
        //计算当前播放位置
        onTimeUpdate(){
            let audio = this.$refs.audio;
            this.currentTime = this.$refs.audio.currentTime;
            this.progressBar = audio.currentTime/audio.duration*100+'%';            
            this.$refs.bar.style.width = this.progressBar;
            this.$refs.miniBar.style.width = this.progressBar;
            //console.log(this.$refs.line.style);
            /* const x = this.progressBar*this.$refs.line.style.width; */
            this.$refs.playBar.style.left = this.progressBar;
        }
    }
}
</script>

<style scoped>
    @import url('../../assets/css/play/play.css');
    .middleL-enter-active, .middleL-leave-active {
        transition: all .3s linear;
    }
    .middleL-enter, .middleL-leave-to {
        opacity: 0;
    }
    .middleR-enter-active, .middleR-leave-active {
        transition: all .3s linear;
    }
    .middleR-enter, .middleR-leave-to {
        opacity: 0;
    }
    .topBar{
    background: transparent;
    border: none;
    }
    .topBar .icon-xiangxia,
    .topBar .icon-heart{
        font-size: 24px;
        color: #ffffff;
    }
    .topBar .icon-xihuan{
        font-size: 24px;
        color: #f01c1c;
    }  
    .topBar .center span{
        display:block;
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .topBar .center span:first-child{
        font-size: 16px;
        line-height: 17px;
        padding-top: 5px;
    }
    .topBar .center span:last-child{
        line-height: 15px;
        padding-top: 3px;
        font-size: 13px;
    }
    .miniPlay .miniBar{
        position: absolute;
        top: -1px;
        left: 0px;
        height: 1px;
        background: rgba(249, 44, 44, 0.5);
    }
    .middle .middle-r{ 
        position: absolute;
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
    .content{
        width: 70%;
        margin: auto;
        text-align: center;
        display: flex;
        flex-flow: column;
        color: #2d2d2d;
        font-size: 12px; 
    }
    .content span{
        padding: 5px 0 5px 0;
        white-space: normal;
    }
    .content .noLyric{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
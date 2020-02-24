<template>
    <div class="listItem" @click="saveSong(listItem)">
        <img v-lazy="listItem.image" alt="">
        <div class="play">
            <i class="iconfont icon-bofang"></i>
        </div>
        <div class="info">
            <p class="song">{{listItem.name}}</p>
            <p class="singer">{{listItem.singer}}</p>
        </div>
    </div>
</template>

<script>

import {savePlayList} from 'common/mixin'

export default {
    name:'radioListItem',
    mixins:[savePlayList],
    props:{
        listItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
    .listItem{
        width: 30%;
        position: relative;
    }
    .listItem img{
        width: 100%;
        border-radius: 5px;
    }
    .listItem .play{
        position: absolute;
        top: 65px;
        right: 6px;
        width: 25px;
        text-align: center;
        height: 25px;
        line-height: 25px;
        background: rgba(246, 239, 239,.5);
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 2px 3px 4px -2px rgb(0,0,0,.5)
    }
    .listItem .play .icon-bofang{
        font-size: 14px;
        color:#F43535;
    }
    .listItem .info .song{
        line-height: 16px;
        text-align: left;
        height: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 12px;
        white-space: nowrap;
        margin: 0;
    }
    .listItem .info .singer{
        line-height: 16px;
        margin: 0;
        margin-bottom: 10px;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 11px;
        color: #757575;
    }
</style>
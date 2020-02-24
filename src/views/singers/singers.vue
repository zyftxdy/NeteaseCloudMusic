<template>
    <div class="singers">
        <singer-list :singerList="singers"></singer-list>
        <router-view></router-view>
    </div>
</template>

<script>

import singerList from './childComps/singerList'

import {Singer} from 'common/singer'
import {getSinger} from 'api/singer'

const pinyin = require('pinyin');
const HOT_NAME = '热门'
const HOT_SINGERS = 5

export default {
    name:'singers',
    components:{
        singerList
    },
    data(){
        return {
            singers:[]
        }
    },
    mounted(){
        this._getSinger();
    },
    methods:{
        //数据获取
        _getSinger(){
            getSinger().then(res => {
                let list = res.artists;
                list.map((item)=>{
                    let py = pinyin(item.name,{
                        style:pinyin.STYLE_FIRST_LETTER
                    })
                    item.initial = py[0][0].toUpperCase();
                })
                this.singers = this._normalizeSinger(list);
            })
        },
        //数据处理
        _normalizeSinger(list){
            let map = {
                hot:{
                    title:HOT_NAME,
                    items:[]
                }
            }
            list.forEach((item,index)=>{
                if(index<HOT_SINGERS){
                    map.hot.items.push(new Singer(item));
                }
                const key = item.initial.substring(0,1);
                if(!map[key]){
                    map[key]={
                        title:key,
                        items:[]
                    }
                }
                map[key].items.push(new Singer(item))
            })
            let hot = []
            let ret = []
            for (const key in map) {
                let val = map[key]
                if (val.title.match(/[A-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret);
        }
    }
}
</script>

<style scoped>
    .singers{
        padding-top: 40px;
    }
</style>
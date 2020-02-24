<template>
    <div class="musicList">
        <div class="recommendList">
            <span>推荐歌单</span>
        </div>
        <div class="itemList">
            <music-list-item
                v-for="(item,index) in list"
                :key = "index"
                :listItem = "item"
            />
        </div>
        
    </div>
</template>

<script>

import musicListItem from './musicListItem'

export default {
    name:'musicList',
    components:{
        musicListItem
    },
    props:{
        list:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
    .musicList .itemList{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .recommendList{
        padding: 10px 0px 10px 7px;
        font-size: 16px;
        font-weight: 700;
        color:#695A5A;
    }
</style>
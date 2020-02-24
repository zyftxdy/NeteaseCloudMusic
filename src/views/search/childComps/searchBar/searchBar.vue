<template>
    <nav-bar class="navBar">
        <div slot="left" @click="backClick">
            <i class="iconfont icon-fanhui"></i>    
        </div>
        <div slot="center" >
            <input class="searchInput" type="text" v-model="value" placeholder="搜索歌手、歌曲">
            <div class="quxiao" v-show="value" @click="deleteValue">
                <i class="iconfont icon-quxiao"></i>
            </div> 
        </div>
        <div slot="right" @click="valueClick">
             <span class="sousuo">搜索</span>   
        </div>       
    </nav-bar>
</template>

<script>

import navBar from 'components/common/navBar/navBar'

export default {
    name:'searchBar',
    components:{
        navBar
    },
    props:{
        searchValue:{
            type:String,
            default(){
                return ""
            }
        }
    },
    data(){
        return{
            value:""
        }
    },
    methods:{
        //返回
        backClick(){
            this.$router.back();
        },
        deleteValue(){
            this.value = ""
            this.$emit('setValue',this.value);
        },
        valueClick(){
            this.$emit('valueClick',this.value);
        }
    },
    /* 
    *注:小bug:只能监听searchValue的变化，点击相同的值无法改变
    *
    */
    watch:{
        searchValue(){
            this.value = this.searchValue;
        }
    }
}
</script>

<style scoped>
    .navBar{
        z-index: 10;
    }
    .searchInput{
        width: 100%;
        border: none;
        border-bottom: 1px solid rgb(202, 193, 193);
        outline: medium;
        color: rgb(78, 74, 74);
        font-size: 15px;
        position: relative;
    }
    .icon-fanhui{
       color: rgb(46, 42, 42);
    }
    .icon-quxiao{
        color: rgb(138, 135, 135);
    }
    .quxiao{
        position:absolute;
        right: 50px;
        top:0px;
    }
    .sousuo{
        font-size: 14px;
        color: rgb(46, 42, 42);
    }
</style>
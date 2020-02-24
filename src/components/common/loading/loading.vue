<template>
    <div class="loading">
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <span>{{text}}</span>
    </div>
</template>

<script>
export default {
    name:'loading',
    props:{
        text:{
            type:String,
            default:"加载中..."
        }
    }
}
</script>

<style scoped>
    .loading{
        overflow: hidden;
        padding: 0 10px 0 10px;
        display: flex;
        justify-content: center;
    }
    .loading ul li{
        list-style-type: none;
        float: left;        
    }
    .loading ul{
        display: inline-block;
        overflow: hidden; 
        padding: 0;
        margin: 0;
    }
    .loading ul li{
        display: inline-block;
        position: relative;
        width: 2px;
        height: 15px;
        margin-left: 2px;
        background: rgb(230, 21, 21);
        animation:loading 1s linear infinite;
    }
    .loading li:nth-child(2){
        animation-delay: -.4s;
    }
    .loading li:nth-child(3){
        animation-delay: -.8s;
    }
    .loading li:nth-child(4){
        animation-delay: -1s;
    }
    .loading li:nth-child(5){
        animation-delay: -1.2s;
    }
    .loading span{
        padding-left: 5px;
        font-size: 12px;
        color: #2e3030;
    }
    @keyframes loading {
        0%{
            transform: translateY(3px);
        }
        50%{
            transform: translateY(15px);
        }
        100%{
            transform: translateY(3px);
        }
    }
</style>
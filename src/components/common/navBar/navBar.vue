<template>
    <div class="navBar">
        <div class="nav-left"><slot name="left"></slot></div>
        <div class="nav-center"><slot name="center"></slot></div>
        <div class="nav-right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name:'navBar'
}
</script>

<style scoped>
    .navBar{
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        height: 40px;
        line-height: 40px;
        width: 100%;
        text-align: center; 
        border-bottom: 1px solid #fcfcfc;
        background: white;  
        z-index: 1;
    }
    .nav-left,.nav-right{
        width: 50px;
    }
    .nav-center{
        flex: 1;
        overflow: hidden;
    }
</style>
<template>
    <transition name="tips">
    <div class="tips">
        <span>{{text}}</span>
    </div>
    </transition>
</template>

<script>
export default {
    name:'tips',
    props:{
        text:{
            type:String,
            default: ''
        }
    }
}
</script>

<style scoped>
    .tips-enter-active, .tips-leave-active {
        transition: all .5s linear;
    }
    .tips-enter, .tips-leave-to {
        opacity: 0;
    }
    .tips{
        position: fixed;
        padding: 5px 10px;
        font-size: 12px;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
        bottom: 30px;
        z-index: 1000;
        border-radius: 10px;
        background: rgba(56, 56, 56, 0.5);
        color: #fbf2f2;
        overflow: hidden;
    }
</style>
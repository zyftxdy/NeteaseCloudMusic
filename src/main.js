import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyLoad from 'vue-lazyload';
import FasrClick from 'fastclick';


Vue.config.productionTip = false;

//挂载总线(非父子组件通信)
Vue.prototype.bus = new Vue();

//懒加载
Vue.use(VueLazyLoad,{
  preLoad: 1,
  loading: require('./assets/img/common/default.jpg')
})

//解决移动端点击300ms延迟
FasrClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

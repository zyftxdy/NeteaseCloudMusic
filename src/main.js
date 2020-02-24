import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;

//挂载总线(非父子组件通信)
Vue.prototype.bus = new Vue();

//懒加载
Vue.use(VueLazyLoad,{
  preLoad: 1,
  loading: require('./assets/img/common/default.jpg')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:() => import('../views/home/home.vue'),
    children:[
      {
        path:':id',
        component:() => import('../views/home/childComps/musicListDetail/musicListDetail.vue')
      }
    ]
  },
  {
    path:'/search',
    component:() => import('../views/search/search.vue'),
    children:[
      {
        path:'list/:id',
        component:() => import('../views/home/childComps/musicListDetail/musicListDetail.vue')
      },
      {
        path:'singer/:id',
        component:() => import('../views/singers/childComps/singerDetail.vue')
      }
    ]
  },
  {
    path:'/playList',
    component:() => import('../views/playList/playList.vue')
  },
  {
    path:'/rankingList',
    component:() => import('../views/rankingList/rankingList.vue'),
    children:[
      {
        path:':id',
        component:() => import('../views/rankingList/childComps/rankListDetail.vue')
      }
    ]
  },
  {
    path:'/singers',
    component:() => import('../views/singers/singers.vue'),
    children:[
      {
        path:':id',
        component:() => import('../views/singers/childComps/singerDetail.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode:'history',
  routes
});

/* 打印路由跳转
router.beforeEach((to,from,next)=>{
  console.log(from);
  console.log(to);
  next();
}) 
*/

export default router;

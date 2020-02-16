import Vue from 'vue'
import Router from 'vue-router'
import routers from './router.js'

Vue.use(Router)

export default new Router({
  routes: routers
})
// Vue.use(Router);

// // 路由配置
// const RouterConfig = {
//     // mode: 'history',
//     routes: routers
// };

// export const router = new Router(RouterConfig);

import { RouteRecordRaw } from 'vue-router';
import Login from '@/views/shared/login/index.vue';
/**
 * 不需要授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/icons',
    name: 'icons',
    component: () =>
      import(/* webpackChunkName: "icons" */ '@/views/shared/icons/index.vue')
  }
];

export default routes;

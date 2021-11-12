import { RouteRecordRaw } from 'vue-router';
import { IAsyncRouteState } from './state';

export const mutations = {
  setRouters: (state: IAsyncRouteState, routers: RouteRecordRaw[]): void => {
    // 设置动态路由
    state.menus = routers;
  },
  setKeepAliveComponents: (
    state: IAsyncRouteState,
    compNames: string[]
  ): void => {
    // 设置需要缓存的组件
    state.keepAliveComponents = compNames;
  }
};

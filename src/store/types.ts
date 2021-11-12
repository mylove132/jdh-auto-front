import { IAsyncRouteState } from './modules/async-route';
import { ILockscreenState } from './modules/lockscreen';
import { ITabsViewState } from './modules/tabs-view';
import { IUserState } from './modules/user/state';

export interface IStore {
  asyncRoute: IAsyncRouteState;
  user: IUserState;
  lockscreen: ILockscreenState;
  tabsView: ITabsViewState;
}
export const ACCESS_TOKEN = 'Access-Token'; // 用户token
export const CURRENT_USER = 'Current-User'; // 当前用户信息
export const IS_LOCKSCREEN = 'Is-Lockscreen'; // 是否锁屏
export const TABS_ROUTES = 'Tabs-Routes'; // 标签页

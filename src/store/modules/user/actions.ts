import { ActionContext } from 'vuex';
import { IUserState } from './state';
import { getUserInfo, login } from '@/api/user';
import { ACCESS_TOKEN, CURRENT_USER, IS_LOCKSCREEN } from '@/store/types';
import { Storage } from '@/utils/Storage';
import store from '@/store';
import { IStore } from '@/store/types';
import { LoginParams } from '@/api/user/model';

export const actions = {
  // 登录
  async login(
    { commit }: ActionContext<IUserState, IStore>,
    userInfo: LoginParams
  ) {
    try {
      const response = await login(userInfo);
      const { result, code } = response;
      if (code == 0) {
        console.log(result.token);
        // 缓存过期时间由后端接口返回
        Storage.set(ACCESS_TOKEN, result.token, result.expireTime);
        Storage.set(CURRENT_USER, result, result.expireTime);
        Storage.set(IS_LOCKSCREEN, false);
        commit('setToken', result.token);
        // todo
        commit('setUserInfo', result);
        store.commit('lockscreen/setLock', false);
      }
      return Promise.resolve(response);
    } catch (e) {
      return Promise.reject(e);
    }
  },

  // 获取用户信息
  getUserInfo({ commit }: ActionContext<IUserState, IStore>) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(response => {
          const result = response.result;

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role;
            role.permissions = result.role.permissions;
            role.permissions.map(per => {
              if (
                per.actionEntitySet != null &&
                per.actionEntitySet.length > 0
              ) {
                const action = per.actionEntitySet.map(action => {
                  return action.action;
                });
                per.actionList = action;
              }
            });
            role.permissionList = role.permissions.map(permission => {
              return permission.permissionId;
            });
            commit('setRoles', result.role);
            commit('setUserInfo', result);
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'));
          }

          // commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('setAvatar', result.avatar);

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 登出
  async logout({ commit }: ActionContext<IUserState, IStore>) {
    commit('setRoles', []);
    commit('setUserInfo', '');
    Storage.remove(ACCESS_TOKEN);
    Storage.remove(CURRENT_USER);
    return Promise.resolve('');
  }
};

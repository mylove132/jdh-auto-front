import { App, InjectionKey } from 'vue';
import {
  createLogger,
  createStore,
  Store,
  useStore as baseUseStore
} from 'vuex';
import { IStore } from './types';
import modules from '@/store/modules';

export const key: InjectionKey<Store<IStore>> = Symbol();
// 开发环境开启日志
const debug = process.env.NODE_ENV !== 'production';

const plugins = debug
  ? [
      createLogger({
        filter(mutation) {
          // 若 mutation 需要被记录，就让它返回 true 即可
          // 顺便，`mutation` 是个 { type, payload } 对象
          const notNeedDebugs: string[] = [
            'lockscreen/setLockTime',
            'lockscreen/setLock'
          ];
          return !notNeedDebugs.includes(mutation.type);
        }
      })
    ]
  : [];

const store = createStore<IStore>({
  plugins,
  modules
});

// 定义自己的store实例方法
export function useStore() {
  return baseUseStore(key);
}

// 定义注册store到vue中的方法
export function setupStore(app: App) {
  app.use(store, key);
  console.log(store, 'vuex');
}

export default store;

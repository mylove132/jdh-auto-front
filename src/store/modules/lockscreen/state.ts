import { IS_LOCKSCREEN } from '@/store/types';
import { Storage } from '@/utils/Storage';

// 长时间不操作默认锁屏时间
const initTime = 60 * 60;

const lock = Storage.get(IS_LOCKSCREEN, false);

export type ILockscreenState = {
  isLock: boolean; // 是否锁屏
  lockTime: number;
};

export const state: ILockscreenState = {
  isLock: lock === true, // 是否锁屏
  lockTime: lock == 'true' ? initTime : 0
};

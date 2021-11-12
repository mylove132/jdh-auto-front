export interface LoginParams {
  username: string;
  password: string;
}

/**
 * @description: 登录接口返回值
 */
export interface LoginResultModel {
  createdAt: string;
  id: number;
  isDel: number;
  isSuper: number;
  platform: null;
  token: string;
  expireTime: number;
  updatedAt: string;
  username: string;
}

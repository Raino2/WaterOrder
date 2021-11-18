import { Modal } from 'antd';
import { observable, action, makeObservable } from 'mobx';
import { tokenStore } from '../TokenStore/token';
import { TUser } from './interface';

//用户登录授权管理中心
class AuthStore {
  constructor() {
    makeObservable(this);
  }

  @observable isLogin: boolean = false;
  @observable user: TUser = {};
  @observable isRemenber: boolean = false;

  @action setUser = (user: TUser) => {
    this.user = user;
  };

  @action setLogin = () => {
    this.isLogin = true;
  };

  @action setLoginOut = () => {
    Modal.confirm({
      title: '退出登录',
      content: '确定要退出登录？',
      onOk: () => {
        this.isLogin = false;
        tokenStore.removeLoginToken();
      },
      okText: '立刻登出',
      cancelText: '取消',
      centered: true,
    });
  };

  @action setRemenber = () => {
    this.isRemenber = true;
  };

  @action setNoRemenber = () => {
    this.isRemenber = false;
  };
}

export const authStore = new AuthStore();
export default AuthStore;

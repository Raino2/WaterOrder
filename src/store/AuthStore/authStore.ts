import { observable, action, makeObservable } from 'mobx';
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
    this.isLogin = false;
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

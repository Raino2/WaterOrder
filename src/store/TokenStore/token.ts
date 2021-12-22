import { action, makeObservable, observable } from 'mobx';
import { login } from '../../utils/login';
import { STORAGE_KEYS } from '../Storage/keys';

class TokenStore {
  constructor() {
    makeObservable(this);
  }
  @observable isToken: boolean = false;
  @observable userRealName: string = '用户';

  @action setLoginToken = (uid: string, userRealName?: string) => {
    localStorage.getItem(STORAGE_KEYS.TOKEN_LOGIN) &&
      localStorage.removeItem(STORAGE_KEYS.TOKEN_LOGIN);

    localStorage.setItem(STORAGE_KEYS.TOKEN_LOGIN, uid);
    localStorage.setItem(STORAGE_KEYS.TOKEN_USER, userRealName || '用户');
    this.isToken = true;
    this.userRealName = userRealName || '用户';
  };

  @action autoLoginWithToken = () => {
    const userUid = localStorage.getItem(STORAGE_KEYS.TOKEN_LOGIN);
    if (userUid) {
      login.userLogin(userUid);
    }
  };

  @action removeLoginToken = () => {
    localStorage.getItem(STORAGE_KEYS.TOKEN_LOGIN) &&
      localStorage.removeItem(STORAGE_KEYS.TOKEN_LOGIN);
    localStorage.getItem(STORAGE_KEYS.TOKEN_USER) &&
      localStorage.removeItem(STORAGE_KEYS.TOKEN_USER);
    this.isToken = false;
    this.userRealName = '用户';
  };
}

export const tokenStore = new TokenStore();
export default TokenStore;

import { action, makeObservable, observable } from 'mobx';
import { authStore } from '../AuthStore/authStore';
import { STORAGE_KEYS } from '../Storage/keys';

class TokenStore {
  constructor() {
    makeObservable(this);
  }

  @action setLoginToken = (uid: string) => {
    localStorage.getItem(STORAGE_KEYS.TOKEN_LOGIN) &&
      localStorage.removeItem(STORAGE_KEYS.TOKEN_LOGIN);

    localStorage.setItem(STORAGE_KEYS.TOKEN_LOGIN, uid);
  };

  @action autoLoginWithToken = () => {
    if (localStorage.getItem(STORAGE_KEYS.TOKEN_LOGIN)) {
      authStore.setLogin();
    }
  };

  @action removeLoginToken = () => {
    localStorage.getItem(STORAGE_KEYS.TOKEN_LOGIN) &&
      localStorage.removeItem(STORAGE_KEYS.TOKEN_LOGIN);
  }
}

export const tokenStore = new TokenStore();
export default TokenStore;

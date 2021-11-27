import axios from 'axios';
import { authStore } from '../store/AuthStore/authStore';
import { STORAGE_KEYS } from '../store/Storage/keys';
import { tokenStore } from '../store/TokenStore/token';

export const loginCallback = () => {
  //获取用户的uid
  const userUid = localStorage.getItem(STORAGE_KEYS.TOKEN_LOGIN);

  //获取用户的信息
  axios
    .get(`/user`, {
      params: {
        uid: userUid,
      },
    })
    .then((res) => {
      authStore.setUser(res.data.data[0]);
    });

  //获取用户的真实姓名
  const userReal = authStore.user.userRealName;
  tokenStore.userRealName = userReal || '用户';

  //获取用户的评分
  axios
    .get(`/user/rate`, {
      params: {
        uid: userUid,
      },
    })
    .then((res) => {
      authStore.userRate = res.data.data.rate;
    });
};

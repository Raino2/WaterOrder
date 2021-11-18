import React, { useEffect } from 'react';
import { STORAGE_KEYS } from '../../store/Storage/keys';
import { tokenStore } from '../../store/TokenStore/token';
import IndexAvatar from './components/Avatar';
import IndexLinkList from './components/LinkList';
import IndexLogo from './components/Logo';

const WebHeader = () => {
  useEffect(() => {
    tokenStore.autoLoginWithToken();
    const userReal = localStorage.getItem(STORAGE_KEYS.TOKEN_USER);
    if (userReal) tokenStore.userRealName = userReal;
  }, []);

  return (
    <React.Fragment>
      <IndexLogo />
      <IndexLinkList />
      <IndexAvatar />
    </React.Fragment>
  );
};

export default WebHeader;

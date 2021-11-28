import React from 'react';
import IndexAvatar from './components/Avatar';
import IndexLinkList from './components/LinkList';
import IndexLogo from './components/Logo';

const WebHeader = () => {
  return (
    <React.Fragment>
      <IndexLogo />
      <IndexLinkList />
      <IndexAvatar />
    </React.Fragment>
  );
};

export default WebHeader;

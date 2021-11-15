import { Avatar, Divider, Space } from 'antd';
import React, { useMemo, useState } from 'react';
import styles from '../styles/index.module.scss';
import { UserOutlined } from '@ant-design/icons';
import LoginModal from '../../LoginModal';
import { authStore } from '../../../store/AuthStore/authStore';
import { observer } from 'mobx-react';

const IndexAvatar = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const loginLink = () => {
    if (authStore.isLogin)
      return (
        <Space size="middle" align="baseline">
          <span>
            欢迎,亲爱的<a>{authStore.user.userRealName}</a>
          </span>
          <a className={styles.loginLink} onClick={() => authStore.setLoginOut()}>
            退出登录
          </a>
        </Space>
      );
    return (
      <>
        <a className={styles.loginLink} onClick={() => setVisible(true)}>
          登录
        </a>
        <Divider type="vertical" />
        <a className={styles.loginLink}>注册</a>
      </>
    );
  };

  return (
    <React.Fragment>
      <Space className={styles.avatar} size={20}>
        <div>{loginLink()}</div>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Space>
      <LoginModal
        visible={visible}
        onChange={(status: boolean) => {
          setVisible(status);
        }}
      />
    </React.Fragment>
  );
};

export default observer(IndexAvatar);

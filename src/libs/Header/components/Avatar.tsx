/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Divider, Space, Tooltip } from 'antd';
import React, { useState } from 'react';
import styles from '../styles/index.module.scss';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import LoginModal from '../../LoginModal';
import { authStore } from '../../../store/AuthStore/authStore';
import { observer } from 'mobx-react';
import RegisterModal from '../../RegisterModal';
import { tokenStore } from '../../../store/TokenStore/token';
import { useHistory } from 'react-router';

const IndexAvatar = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [resgister, setRegister] = useState<boolean>(false);
  const history = useHistory();

  const loginLink = () => {
    if (authStore.isLogin)
      return (
        <Space size="middle" align="baseline">
          <span>
            欢迎,亲爱的<a>{tokenStore.userRealName}</a>
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
        <a
          className={styles.loginLink}
          onClick={() => {
            setRegister(true);
          }}
        >
          注册
        </a>
      </>
    );
  };

  return (
    <React.Fragment>
      <Space className={styles.avatar} size={20}>
        <div>{loginLink()}</div>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        {authStore.user.isAdmin && (
          <Tooltip placement="bottom" title="点击进入管理员后台">
            <SettingOutlined onClick={() => history.push('/admin')} />
          </Tooltip>
        )}
      </Space>
      <LoginModal
        visible={visible}
        onChange={(status: boolean) => {
          setVisible(status);
        }}
      />
      <RegisterModal
        visible={resgister}
        onChange={(status) => {
          setRegister(status);
        }}
      />
    </React.Fragment>
  );
};

export default observer(IndexAvatar);

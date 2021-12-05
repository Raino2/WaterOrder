import { Button } from 'antd';
import React, { useState } from 'react';
import styles from '../styles/index.module.scss';
import waterMan from '../images/diliverWaterMan.png';
import LoginModal from '../../../libs/LoginModal';
import { authStore } from '../../../store/AuthStore/authStore';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router';

const LoginContentDescription = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const history = useHistory();

  const handleIntoHomePage = () => {
    history.push('/home');
  };

  return (
    <>
      <div className="content">
        <div className={styles.description}>
          <h1 className={styles.topTitle}>
            Water Order <span style={{ fontSize: 95, color: '#ff575f' }}>Online</span>
          </h1>
          <h3 className={styles.secTitle}>
            基于React/Express实现的便捷网上订水系统，为您的地区定制
          </h3>
          {authStore.isLogin && (
            <>
              <Button
                type="primary"
                size="large"
                danger
                className={styles.loginButton}
                onClick={handleIntoHomePage}
              >
                进入首页
              </Button>
              <Button
                type="default"
                danger
                size="large"
                className={styles.loginButton}
                onClick={() => authStore.setLoginOut()}
              >
                退出登录
              </Button>
            </>
          )}
          {!authStore.isLogin && (
            <>
              <Button
                type="primary"
                danger
                size="large"
                className={styles.loginButton}
                onClick={() => {
                  setVisible(true);
                }}
              >
                立即登录
              </Button>
              <Button
                type="default"
                danger
                size="large"
                className={styles.loginButton}
                onClick={() => {
                  history.push('/home');
                }}
              >
                游客浏览
              </Button>
            </>
          )}
        </div>
        <div className={styles.waterMan}>
          <img
            src={waterMan}
            alt="没有送水工的图片"
            width="280px"
            style={{ transform: 'rotateY(180deg)' }}
          />
        </div>
      </div>
      <LoginModal
        visible={visible}
        onChange={(status: boolean) => {
          setVisible(status);
        }}
      />
    </>
  );
};

export default observer(LoginContentDescription);

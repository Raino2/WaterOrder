import { Layout, Space } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import React from 'react';
import WebHeader from '../../libs/Header';
import LoginContentDescription from './components/description';
import styles from './styles/index.module.scss';

const LoginPage = () => {
  return (
    <Layout>
      <Header
        style={{
          backgroundColor: 'white',
          boxShadow: '0px 6px 16px rgba(0,0,0,0.08) ',
          padding: '0 20px',
        }}
      >
        <WebHeader />
      </Header>
      <Content style={{ minHeight: 800, position: 'relative' }}>
        <div className={styles.desArea}>
          <LoginContentDescription />
        </div>
      </Content>
      <Footer style={{ display: 'flex', justifyContent: 'center' }}>
        <Space size={50} style={{ color: 'rgba(0,0,0,0.45)' }}>
          <div>
            CopyRight© <a href="https://github.com/Raino2">Best_Raino</a>
          </div>
          <div> 请联系我:962688180@qq.com</div>
        </Space>
      </Footer>
    </Layout>
  );
};

export default LoginPage;

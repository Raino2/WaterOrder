import { Layout, Space } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import WebHeader from '../../libs/Header';
import FeRouter from '../../public/FeRouter';
import { tokenStore } from '../../store/TokenStore/token';

const FeLayout: React.FC<any> = () => {
  useEffect(() => {
    tokenStore.autoLoginWithToken();
  }, []);

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
        <FeRouter />
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

export default observer(FeLayout);

/* eslint-disable jsx-a11y/anchor-is-valid */
import ProLayout from '@ant-design/pro-layout';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { tokenStore } from '../../store/TokenStore/token';
import AdminRouter, { route } from '../../public/AdminRouter';

const AdminLayout: React.FC = () => {
  const [pathname, setPathname] = useState<string>('/admin/welcome');
  const history = useHistory();

  //登录
  useEffect(() => {
    tokenStore.autoLoginWithToken();
  }, []);

  useMemo(() => {
    const currentPath = window.location.pathname;
    setPathname(currentPath);
  }, []);

  return (
    <ProLayout
      style={{ minHeight: '100vh' }}
      route={route}
      fixSiderbar
      location={{
        pathname,
      }}
      title="OWOS订水管理系统"
      siderWidth={240}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setPathname(item.path || '/admin');
          }}
        >
          <div>{dom}</div>
        </a>
      )}
      onPageChange={(location) => {
        history.push(location?.pathname || '/admin');
      }}
    >
      <AdminRouter />
    </ProLayout>
  );
};

export default observer(AdminLayout);

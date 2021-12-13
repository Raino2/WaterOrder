import { useHistory } from 'react-router';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';

const AdminLayout: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        title="OWOS订水管理系统"
        location={{
          pathname: '/config/template/new',
        }}
        siderWidth={280}
      >
        <PageContainer content="欢迎使用后台管理系统">
          <div>Welcome,OWOS网上订水系统后台</div>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default AdminLayout;

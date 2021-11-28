import { Button } from 'antd';
import { useHistory } from 'react-router';

const AdminLayout: React.FC = () => {
  const history = useHistory();
  const handleBach = () => {
    history.goBack();
  };

  return (
    <div>
      欢迎，但后台管理系统还未实现！
      <Button type="primary" danger onClick={handleBach}>
        返回
      </Button>
    </div>
  );
};

export default AdminLayout;

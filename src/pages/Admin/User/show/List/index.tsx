import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { TUserInfo } from './interface';

const UserShowList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>();
  const history = useHistory();
  const colums: ColumnsType<TUserInfo> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: 'uid',
      dataIndex: 'uid',
      width: 150,
      ellipsis: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '真实姓名',
      dataIndex: 'userRealName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '常用地址',
      dataIndex: 'address',
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      render: (_, data) => {
        return (
          <Button type="link" onClick={() => handleModify(data.uid)}>
            查看账户详情
          </Button>
        );
      },
    },
  ];

  /** 查看账户详情信息 **/
  const handleModify = (uid: string) => {
    history.push(`/admin/user/show/info/${uid}`);
  };

  return (
    <PageContainer>
      <Card loading={loading}>
        <Table columns={colums} rowKey={'id'} />
      </Card>
    </PageContainer>
  );
};

export default UserShowList;

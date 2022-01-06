import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Button, Card, Col, Form, Input, message, Modal, Row, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { TUser, TUserInfo } from './interface';
import styles from './styles/index.module.scss';

const UserShowList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>();
  const [userList, setUserList] = useState<TUserInfo[]>();
  const [visible, setVisible] = useState<boolean>(false);
  const history = useHistory();

  const colums: ColumnsType<TUserInfo> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => {
        return b.id - a.id;
      },
    },
    {
      title: 'uid',
      dataIndex: 'uid',
      width: 180,
      ellipsis: true,
    },
    {
      title: '用户名',
      width: 150,
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
      width: 300,
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: '订单数',
      dataIndex: 'orderCount',
      width: 80,
    },
    {
      title: '地址数',
      dataIndex: 'addressCount',
      width: 80,
    },
    {
      title: '评论数',
      dataIndex: 'commentCount',
      width: 80,
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 130,
      render: (_, data) => {
        return (
          <Button type="link" onClick={() => handleModify(data.uid)}>
            查看账户详情
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    handleTableRefresh();
  }, []);

  /** 查看账户详情信息 **/
  const handleModify = (uid: string) => {
    history.push(`/admin/user/show/info/${uid}`);
  };

  const handleCreateNewUser = (user: TUser) => {
    axios
      .post('/admin/user', user)
      .then((res) => {
        message.success('添加新用户成功！');
        setVisible(false);
        handleTableRefresh();
      })
      .catch(() => {
        message.error('创建失败');
      });
  };

  const handleTableRefresh = () => {
    setLoading(true);
    axios
      .get('/admin/user')
      .then((res) => {
        setUserList(res.data.data);
      })
      .finally(() => setLoading(false));
  };

  const { Item } = Form;
  return (
    <PageContainer>
      <Card loading={loading}>
        <div className={styles.toolbar}>
          <Button type="primary" onClick={() => setVisible(true)} danger>
            创建新用户
          </Button>
        </div>
        <Table columns={colums} rowKey={'id'} dataSource={userList} />
      </Card>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose
        footer={null}
        title="创建新用户"
      >
        <Form<TUser> onFinish={handleCreateNewUser}>
          <Row>
            <Col span={12} offset={6}>
              <Item
                name="userName"
                label="账  号"
                rules={[{ required: true, message: '账号不能为空' }]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12} offset={6}>
              <Item
                name="userPass"
                label="密  码"
                rules={[{ required: true, message: '密码不能为空' }]}
              >
                <Input type="password" />
              </Item>
            </Col>
            <Col span={12} offset={6}>
              <Item
                name="phone"
                label="手  机"
                rules={[{ required: true, message: '手机号不能为空' }]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12} offset={6}>
              <Item
                name="email"
                label="邮  箱"
                rules={[
                  { required: true, message: '邮箱不能为空' },
                  { type: 'email', message: '邮箱格式错误' },
                ]}
              >
                <Input />
              </Item>
            </Col>
            <Alert
              message="创建的用户不具备管理员功能，如果想要创建管理员请前往设置页"
              type="warning"
              showIcon
              style={{ marginBottom: 14 }}
            />
            <Col span={8} offset={9}>
              <Space size="large">
                <Button htmlType="button" onClick={() => setVisible(false)}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  创建
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default UserShowList;

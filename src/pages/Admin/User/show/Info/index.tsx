import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, List, message, Modal, Rate, Select, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { TAddress } from '../../../../Auction/interface';
import { TUserInfo } from '../List/interface';
import styles from './styles/index.module.scss';

const UserShowInfo: React.FC = () => {
  const [userInfo, setInfo] = useState<TUserInfo>();
  const [isAdmin, setAdmin] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const [visible, setVisible] = useState<boolean>();
  const [adVsible, setAdVisible] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<TAddress[]>();
  const { uuid } = useParams<{ uuid: string }>();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios
      .get('/admin/user/info', {
        params: {
          uid: uuid,
        },
      })
      .then((res) => {
        setInfo(res.data.data);
        setAdmin(!!res.data.data.isAdmin);
      })
      .finally(() => setLoading(false));
  }, [uuid]);

  /**获取地址信息 */
  useEffect(() => {
    handleFetchAddress();
  }, []);

  const handleFetchAddress = () => {
    axios
      .get('/shop/address', {
        params: {
          uid: uuid,
        },
      })
      .then((res) => {
        setAddressList(res.data.data);
      });
  };

  const handleChangeCommonAddress = (address?: string) => {
    axios
      .put('/shop/address/common', {
        uid: address,
        userUid: uuid,
      })
      .then(() => {
        message.success('默认地址修改成功');
        handleFetchAddress();
      });
  };

  const handleSetAdmin = () => {
    if (isAdmin) return;
    Modal.confirm({
      title: '权限变更操作',
      content: '确定将该用户变为管理员吗？',
      okButtonProps: {
        danger: true,
      },
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        axios
          .patch('/admin/user/admin/', {
            uid: uuid,
            isAdmin: true,
          })
          .then(() => {
            message.success('权限提升成功！该用户现在已经是管理员了！');
            setAdmin(true);
          })
          .catch(() => {
            message.error('权限提升失败');
          });
      },
    });
  };

  const handleCancleAdmin = () => {
    if (!isAdmin) return;
    Modal.confirm({
      title: '权限变更操作',
      content: '确定取消该用户的管理员资格吗？',
      okButtonProps: {
        danger: true,
      },
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        axios
          .patch('/admin/user/admin/', {
            uid: uuid,
            isAdmin: false,
          })
          .then(() => {
            message.success('权限变更成功！该用户现在已经不是管理员了！');
            setAdmin(false);
          })
          .catch(() => {
            message.error('权限变更失败');
          });
      },
    });
  };

  const handleModify = (info: TUserInfo) => {
    axios
      .put('/admin/user', info)
      .then(() => {
        message.success('修改成功！');
        history.goBack();
      })
      .catch(() => {
        message.error('修改失败！');
      });
  };

  const handleCreateNewAddress = (info: TAddress) => {
    axios
      .post('/shop/address', {
        ...info,
        userUid: uuid,
      })
      .then(() => {
        message.success('添加新地址成功！');
        setAdVisible(false);
        handleFetchAddress();
      });
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const renderButtonContent = () => {
    if (isAdmin) return <div>该用户已经是管理员，点击撤销管理员资格</div>;
    return <div>点击此按钮将此用户提升为管理员</div>;
  };

  const renderAddressModal = () => {
    return (
      <Modal
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
        title={
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: 24,
              color: '#66ccff',
              verticalAlign: 'baseline',
            }}
          >
            地址列表
          </div>
        }
        width={1000}
        destroyOnClose
      >
        <List
          style={{ width: '100%' }}
          dataSource={addressList}
          bordered
          className={styles.addressList}
          header={
            <div style={{ display: 'flex' }}>
              <div style={{ width: 500, textAlign: 'center', fontWeight: 800, fontSize: 18 }}>
                地址
              </div>
              <div style={{ width: 150, textAlign: 'center', fontWeight: 800, fontSize: 18 }}>
                收件人{' '}
              </div>
              <div
                style={{
                  width: 120,
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: 18,
                  marginRight: 30,
                }}
              >
                手机号
              </div>
              <Button type="primary" danger onClick={() => setAdVisible(true)}>
                添加新地址
              </Button>
            </div>
          }
          renderItem={(item) => (
            <List.Item>
              <div style={{ width: 500, textAlign: 'center' }}>{item.address}</div>
              <div style={{ width: 100, textAlign: 'center' }}>({item.name}收) </div>
              <div style={{ width: 100, textAlign: 'center' }}>{item.phone}</div>
              <Button
                type="link"
                disabled={!!item.isCommon}
                onClick={() => {
                  handleChangeCommonAddress(item.uid);
                }}
              >
                {item.isCommon ? '已是默认地址' : '设为默认地址'}
              </Button>
            </List.Item>
          )}
        />
      </Modal>
    );
  };

  const renderAddAddressModal = () => {
    return (
      <Modal
        visible={adVsible}
        onCancel={() => setAdVisible(false)}
        title="添加新地址"
        footer={null}
        destroyOnClose
      >
        <Form<TAddress> layout="vertical" onFinish={handleCreateNewAddress}>
          <Item name="address" label="地址" rules={[{ required: true, message: '该字段不能为空' }]}>
            <Input />
          </Item>
          <Item name="name" label="收件人" rules={[{ required: true, message: '该字段不能为空' }]}>
            <Input />
          </Item>
          <Item name="phone" label="手机号" rules={[{ required: true, message: '该字段不能为空' }]}>
            <Input />
          </Item>
          <Item
            name="isCommon"
            label="是否设为默认地址"
            rules={[{ required: true, message: '该字段不能为空' }]}
          >
            <Select>
              <Select.Option value={1}>是</Select.Option>
              <Select.Option value={0}>否</Select.Option>
            </Select>
          </Item>
          <Item>
            <Button type="primary" size="large" htmlType="submit" block>
              创建新地址
            </Button>
          </Item>
        </Form>
      </Modal>
    );
  };

  const { Item } = Form;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  return (
    <PageContainer title="用户详情信息编辑">
      <Space style={{ width: '100%' }} direction="vertical" size="large">
        <Card>
          <Button
            type="primary"
            style={{ fontSize: 24, height: 60 }}
            danger={isAdmin ? false : true}
            block
            onClick={() => {
              if (isAdmin) handleCancleAdmin();
              else handleSetAdmin();
            }}
          >
            {renderButtonContent()}
          </Button>
        </Card>
        <Card loading={loading}>
          <Form<TUserInfo> {...layout} initialValues={userInfo} onFinish={handleModify}>
            <Item
              name="uid"
              label="用户uid"
              rules={[{ required: true, message: '该字段不能为空' }]}
            >
              <Input disabled />
            </Item>
            <Item
              name="userName"
              label="用户名"
              rules={[{ required: true, message: '该字段不能为空' }]}
            >
              <Input />
            </Item>
            <Item
              name="userPass"
              label="密码"
              rules={[{ required: true, message: '该字段不能为空' }]}
            >
              <Input.Password
                placeholder="input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Item>
            <Item name="userRealName" label="真实姓名">
              <Input />
            </Item>
            <Item
              name="phone"
              label="手机号"
              rules={[{ required: true, message: '该字段不能为空' }]}
            >
              <Input />
            </Item>
            <Item name="email" label="邮箱" rules={[{ required: true, message: '该字段不能为空' }]}>
              <Input />
            </Item>
            <Item name="rate" label="评分">
              <Rate allowHalf />
            </Item>
            <Item name="address" label="地址">
              <Button type="link" onClick={handleOpenModal}>
                点击查看用户所有地址
              </Button>
            </Item>
            <Col offset={11}>
              <Space size="large">
                <Button htmlType="button" onClick={() => history.goBack()}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Space>
            </Col>
          </Form>
        </Card>
        {renderAddressModal()}
        {renderAddAddressModal()}
      </Space>
    </PageContainer>
  );
};

export default UserShowInfo;

import { Alert, Button, Form, Input, message, Modal, Space } from 'antd';
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import MessageFilled from '@ant-design/icons/lib/icons/MessageFilled';
import LockFilled from '@ant-design/icons/lib/icons/LockFilled';
import PhoneFilled from '@ant-design/icons/lib/icons/PhoneFilled';
import MailFilled from '@ant-design/icons/lib/icons/MailFilled';
import { TUser } from '../../store/AuthStore/interface';
import axios from 'axios';
import { authStore } from '../../store/AuthStore/authStore';
import { tokenStore } from '../../store/TokenStore/token';

type TProps = {
  visible: boolean;
  onChange: (status: boolean) => void;
};

const RegisterModal = (props: TProps) => {
  const handleCloseModal = () => {
    props.onChange(false);
  };

  const modalTitle = () => {
    return (
      <>
        <h1
          style={{
            textAlign: 'center',
            fontWeight: 800,
            height: 70,
            lineHeight: '70px',
          }}
        >
          <MessageFilled style={{ color: 'rgb(86,201,245)', marginRight: 10 }} />
          新用户注册
        </h1>
        <div
          style={{
            color: 'rgba(0,0,0,0.35)',
            textAlign: 'center',
          }}
        >
          超级好用的网上订水系统 OWO
        </div>
      </>
    );
  };

  const registerNewUser = (user: TUser) => {
    const { userName, userPass, phone, email } = user;

    axios
      .post(`/register`, {
        userName,
        userPass,
        phone,
        email,
      })
      .then((res) => {
        message.success('注册成功！');
        authStore.setUser(res.data);
        authStore.setLogin();
        if (authStore.user.uid)
          tokenStore.setLoginToken(authStore.user.uid, authStore.user.userRealName);
        handleCloseModal();
      })
      .catch(() => {
        message.error('注册失败');
      });
  };

  return (
    <Modal
      visible={props.visible}
      title={modalTitle()}
      footer={null}
      onCancel={handleCloseModal}
      centered
      destroyOnClose
    >
      <Form
        name="register"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16, offset: 4 }}
        autoComplete="off"
        layout="horizontal"
        size="large"
        onFinish={registerNewUser}
      >
        <Form.Item name="userName" rules={[{ required: true, message: '账号不能为空' }]}>
          <Input prefix={<SmileOutlined />} placeholder="请输入账号" />
        </Form.Item>
        <Form.Item name="userPass" rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password prefix={<LockFilled />} placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: '手机号不能为空' },
            {
              pattern: /^[0-9]{11}$/,
              message: '手机号格式错误！',
            },
          ]}
        >
          <Input prefix={<PhoneFilled />} placeholder="请输入手机号" allowClear />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              pattern:
                /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
              message: '邮箱格式错误',
            },
            {
              required: true,
              message: '邮箱不能为空',
            },
          ]}
        >
          <Input prefix={<MailFilled />} placeholder="请输入邮箱号" allowClear />
        </Form.Item>
        <Form.Item>
          <Alert message="注册成功后,请去'个人中心'完善信息" type="warning" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
          <Space size="large" align="center">
            <Button type="primary" htmlType="submit">
              注册账号
            </Button>
            <Button type="dashed" htmlType="button" onClick={handleCloseModal}>
              我再逛逛
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;

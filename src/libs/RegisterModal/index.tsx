import { Alert, Button, Form, Input, Modal, Space } from 'antd';
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import MessageFilled from '@ant-design/icons/lib/icons/MessageFilled';
import LockFilled from '@ant-design/icons/lib/icons/LockFilled';
import { placeholder } from '@babel/types';
import PhoneFilled from '@ant-design/icons/lib/icons/PhoneFilled';
import MailFilled from '@ant-design/icons/lib/icons/MailFilled';

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
          超级好用的在线订水网站 OWO
        </div>
      </>
    );
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
      >
        <Form.Item name="userName">
          <Input prefix={<SmileOutlined />} placeholder="请输入账号" />
        </Form.Item>
        <Form.Item name="userPass">
          <Input.Password prefix={<LockFilled />} placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="phone">
          <Input prefix={<PhoneFilled />} placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item name="email">
          <Input prefix={<MailFilled />} placeholder="请输入邮箱号" />
        </Form.Item>
        <Form.Item>
          <Alert message="注册成功后,请去'个人中心'完善信息" type="warning" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
          <Space size="large" align="center">
            <Button type="primary" htmlType="submit">
              注册账号
            </Button>
            <Button type="dashed" htmlType="button">
              我再逛逛
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;

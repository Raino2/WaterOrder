import { Button, Form, Input, Modal } from 'antd';
import React from 'react';

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
      <h2
        style={{
          textAlign: 'center',
          fontWeight: 800,
        }}
      >
        新用户注册
      </h2>
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
      <Form name="register" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off">
        <Form.Item name="userName" label="用户名">
          <Input />
        </Form.Item>
        <Form.Item name="userPass" label="密  码">
          <Input.Password />
        </Form.Item>
        <Form.Item name="phone" label="手  机">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮  箱">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" block>
            注册账号
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;

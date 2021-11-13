/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { LoginForm, ProFormText, ProFormCaptcha, ProFormCheckbox } from '@ant-design/pro-form';
import {
  UserOutlined,
  MobileOutlined,
  LockOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { message, Tabs, Space, Modal, notification } from 'antd';
import { CSSProperties, useEffect } from 'react';
import { useState } from 'react';
import { TUser } from './interface';
import waterMan from '../../assets/images/diliverWaterMan.png';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  marginLeft: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const LoginModal = (props: any) => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const [visible, setVisible] = useState<boolean>(false);

  //当传进来的Props发生变化时，更新visible的状态
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  //当visible发生变化时，通知父元素
  const handleCloseLoginModal = () => {
    setVisible(false);
    props.onChange(false);
  };

  const forgetPassword = () => {
    notification.error({
      message: '怎么能忘记密码呢？',
      description:
        '用户您好，虽然忘记密码是一个非常不应该的事情，但是事情已经发生了，那我们只能给您出出主意，现在立刻联系客服，并修改密码！',
      onClick: () => {
        message.warning('别点了，打电话吧快点儿的！');
      },
      duration: 3,
    });
  };

  return (
    <Modal visible={visible} footer={null} onCancel={handleCloseLoginModal} centered destroyOnClose>
      <div style={{ backgroundColor: 'white' }}>
        <LoginForm
          logo={waterMan}
          title="OWO System"
          subTitle="超级好用的网上订水系统"
          actions={
            <Space>
              其他登录方式
              <AlipayCircleOutlined style={iconStyles}></AlipayCircleOutlined>
              <TaobaoCircleOutlined style={iconStyles}></TaobaoCircleOutlined>
              <WeiboCircleOutlined style={iconStyles}></WeiboCircleOutlined>
            </Space>
          }
        >
          <Tabs
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名不能为空!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'请输入密码!'}
                rules={[
                  {
                    required: true,
                    message: '密码不能为空',
                  },
                ]}
              />
            </>
          )}
          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="mobile"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="isRemenber">
              记住账号
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
              onClick={forgetPassword}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </Modal>
  );
};

export default LoginModal;

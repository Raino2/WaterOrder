/* eslint-disable import/no-anonymous-default-export */
import React, { lazy, Suspense } from 'react';
import {
  SmileOutlined,
  AreaChartOutlined,
  TeamOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  IdcardOutlined,
  CarOutlined,
  AliwangwangOutlined,
} from '@ant-design/icons';
import { Redirect, Route } from 'react-router-dom';
import { Spin } from 'antd';

const LoginPage = lazy(() => import('../pages/Login'));
const Auction = lazy(() => import('../pages/Auction'));

const route = {
  path: '/',
  routes: [
    {
      path: '/admin/welcome',
      name: '欢迎界面',
      icon: <SmileOutlined style={{ fontSize: 20 }} />,
    },
    {
      path: '/admin/data',
      name: '数据总览',
      icon: <AreaChartOutlined style={{ fontSize: 20 }} />,
    },
    {
      path: '/admin/user',
      name: '用户管理',
      icon: <TeamOutlined style={{ fontSize: 20 }} />,
    },
    {
      path: '/admin/product',
      name: '产品管理',
      icon: <ShoppingOutlined style={{ fontSize: 20 }} />,
      routes: [
        {
          path: '/admin/product/list',
          name: '列表页',
          hideInMenu: false,
        },
      ],
    },
    {
      path: '/admin/order',
      name: '订单管理',
      icon: <SolutionOutlined style={{ fontSize: 20 }} />,
      component: <div>订单管理</div>,
    },
    {
      path: '/admin/dispatcher',
      name: '配送管理',
      icon: <IdcardOutlined style={{ fontSize: 20 }} />,
      component: <div>送水工管理</div>,
    },
    {
      path: '/admin/region',
      name: '地区管理',
      icon: <CarOutlined style={{ fontSize: 20 }} />,
      component: <div>配送地区管理</div>,
    },
    {
      path: '/admin/account',
      name: '管理账号',
      icon: <AliwangwangOutlined style={{ fontSize: 20 }} />,
      component: <div>管理员账号管理</div>,
    },
  ],
};

const AdminRouter = () => {
  return (
    <Suspense
      fallback={
        <Spin size="large" tip="Loading..." style={{ display: 'block', margin: '0 auto' }} />
      }
    >
      <Route exact path="/admin/welcome" component={LoginPage} />
      <Route exact path="/admin/data" component={Auction} />
      <Redirect from="/admin/*" to="/admin" />
    </Suspense>
  );
};
export { route };
export default AdminRouter;

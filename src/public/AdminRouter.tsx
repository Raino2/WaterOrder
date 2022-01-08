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
  SettingOutlined,
} from '@ant-design/icons';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

const ProductList = lazy(() => import('../pages/Admin/Product/List'));
const UserShowList = lazy(() => import('../pages/Admin/User/show/List'));
const UserShowInfo = lazy(() => import('../pages/Admin/User/show/Info'));
const OrderShowList = lazy(() => import('../pages/Admin/Order/show/List'));

type TRoute = {
  path: string;
  name?: string;
  icon?: React.ReactNode;
  component?: React.ComponentType<any>;
  hideInMenu?: boolean;
  routes?: TRoute[];
};

const route: TRoute = {
  path: '/admin',
  routes: [
    {
      path: '/admin/welcome',
      name: '欢迎',
      icon: <SmileOutlined style={{ fontSize: 20 }} />,
    },
    {
      path: '/admin/data',
      name: '数据',
      icon: <AreaChartOutlined style={{ fontSize: 20 }} />,
    },
    {
      path: '/admin/user',
      name: '用户',
      icon: <TeamOutlined style={{ fontSize: 20 }} />,
      routes: [
        {
          path: '/admin/user/show',
          name: '用户总览',
          component: ProductList,
        },
      ],
    },
    {
      path: '/admin/product',
      name: '产品',
      icon: <ShoppingOutlined style={{ fontSize: 20 }} />,
      routes: [
        {
          path: '/admin/product/show',
          name: '产品总览',
        },
      ],
    },
    {
      path: '/admin/order',
      name: '订单',
      icon: <SolutionOutlined style={{ fontSize: 20 }} />,
      routes: [
        {
          path: '/admin/order/show/list',
          name: '订单总览',
        },
        {
          path: '/admin/order/show/info',
        },
        {
          path: '/admin/order/diliver',
          name: '订单派发',
        },
      ],
    },
    {
      path: '/admin/dispatcher',
      name: '配送',
      icon: <IdcardOutlined style={{ fontSize: 20 }} />,
    },
    {
      path: '/admin/region',
      name: '地区',
      icon: <CarOutlined style={{ fontSize: 20 }} />,
    },
    {
      path: '/admin/setting',
      name: '设置',
      icon: <SettingOutlined style={{ fontSize: 20 }} />,
      routes: [
        {
          path: '/admin/account',
          name: '管理员账户',
        },
      ],
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
      <Switch>
        <Route exact path={'/admin/product/show'} component={ProductList} />
        <Route exact path={'/admin/user/show'} component={UserShowList} />
        <Route exact path={'/admin/user/show/info/:uuid'} component={UserShowInfo} />
        <Route exact path={'/admin/order/show/list'} component={OrderShowList} />
        <Redirect from="/admin/*" to="/admin" />
      </Switch>
    </Suspense>
  );
};
export { route };
export default AdminRouter;

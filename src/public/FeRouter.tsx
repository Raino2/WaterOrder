import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { observer } from 'mobx-react';
import { Spin } from 'antd';

const LoginPage = lazy(() => import('../pages/Login'));
const HomePage = lazy(() => import('../pages/Home'));
const ShopPage = lazy(() => import('../pages/Shop'));
const ActionPage = lazy(() => import('../pages/Auction'));

const FeRouter = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <Spin size="large" tip="Loading..." style={{ display: 'block', margin: '0 auto' }} />
        }
      >
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/auction" component={ActionPage} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default observer(FeRouter);

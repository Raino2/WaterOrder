import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FeLayout from './layout/Fe';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLayout from './layout/Admin';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment'; //在原有的基础上加上下面三行代码
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/admin" component={AdminLayout} />
          <Route path="/" component={FeLayout} />
        </Switch>
      </Router>
    </React.StrictMode>
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FeLayout from './layout/Fe';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLayout from './layout/admin';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/admin" component={AdminLayout} />
        <Route path="/" component={FeLayout} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

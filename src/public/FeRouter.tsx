import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import { observer } from 'mobx-react';

const FeRouter = () => {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/home" component={HomePage} />
      <Route exact path="/" component={LoginPage} />
    </Router>
  );
};

export default observer(FeRouter);

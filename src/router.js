import React from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import MainLayout from './layout/MainLayout';
import LoginPage from './routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <MainLayout>
          <Route path="/" exact component={IndexPage} />
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default RouterConfig;

import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';
import MainLayout from './layout/MainLayout';
import LoginPage from './routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <MainLayout>
          <Route path="/admin/dashboard" exact component={IndexPage} />
          <Redirect to="/admin/dashboard" from='/admin'/>
        </MainLayout>
      </Switch>
    </Router>
  );
}

export default RouterConfig;

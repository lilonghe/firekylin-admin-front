import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';
import MainLayout from './layout/MainLayout';
import PostListPage from './routes/post/ListPage';
import NotFound from './components/helper/404';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <MainLayout>
        <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/admin/dashboard" exact component={IndexPage} />
            <Route path="/admin/post/list" exact component={PostListPage} />
            <Redirect exact from='/admin' to="/admin/dashboard" />
            <Route component={NotFound} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default RouterConfig;

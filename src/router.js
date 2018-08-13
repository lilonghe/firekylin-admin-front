import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './routes/IndexPage';
import MainLayout from './layout/MainLayout';
import PostListPage from './routes/post/ListPage';
import NotFound from './components/helper/404';
import CateListPage from './routes/cate/ListPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <MainLayout>
        <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/admin/dashboard" exact component={IndexPage} />
            <Route path="/admin/post/list" exact component={PostListPage} />
            <Route path="/admin/cate/list" exact component={CateListPage} />
            <Redirect exact from='/admin' to="/admin/dashboard" />
            <Route component={NotFound} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default RouterConfig;

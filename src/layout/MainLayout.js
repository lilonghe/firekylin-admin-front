/* global window */
/* global document */
import React, { Component } from 'react'
import NProgress from 'nprogress'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { BackTop, Layout } from 'antd'
import { withRouter } from 'dva/router'
import Header from '../components/layout/Header';
import MySider from '../components/layout/Slider';

const { Content, Footer, Sider } = Layout

export default class MainLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {/* <Loader fullScreen /> */}
        <Layout >
          <Sider
            trigger={null}
            collapsible
            theme={'light'}
          >
            <MySider />
          </Sider>
          <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
            <BackTop target={() => document.getElementById('mainContainer')} />
            <Header />
            <Content>
              {children}
            </Content>
            <Footer >
              {/* {config.footerText} */}
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

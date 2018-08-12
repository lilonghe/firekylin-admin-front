/* global window */
/* global document */
import React, { Component } from 'react'
import NProgress from 'nprogress'
import pathToRegexp from 'path-to-regexp'
import { connect } from 'dva'
import { BackTop, Layout, Spin } from 'antd'
import { withRouter } from 'dva/router'
import Header from '../components/layout/Header';
import MySider from '../components/layout/Slider';
import LoadingHold from '../components/helper/LoadingHold';
import LoginPage from '../routes/LoginPage';

const { Content, Footer, Sider } = Layout

@connect(({ session, system }) => {
  return { session, system };
})
export default class MainLayout extends Component {
  componentDidMount() {
    const { system: { summary }, session: { user }, dispatch } = this.props;
    if (window.SysConfig.userInfo.name) {
      if (!user) {
        dispatch({
          type: 'session/save',
          payload: {
            user: window.SysConfig.userInfo
          }
        })
        dispatch({
          type: 'system/save',
          payload: {
            options: window.SysConfig.options
          }
        })
      }
      if (!summary) {
        dispatch({
          type: 'system/fetchSummary'
        })
      }
    }
  }

  render() {
    const { children, session: {user}, system: { options, summary } } = this.props;
    if (!window.SysConfig.userInfo.name) {
      return <LoginPage />
    }
    return (
        <Layout >
          <Sider
            trigger={null}
            collapsible
            theme={'light'}
          >
            <MySider options={options} />
          </Sider>
          <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
            <BackTop target={() => document.getElementById('mainContainer')} />
            <Header user={user} />
            <Content>
              {(options && summary) ? children : <LoadingHold />}
            </Content>
            <Footer >
              {/* {config.footerText} */}
            </Footer>
          </Layout>
        </Layout>
    )
  }
}

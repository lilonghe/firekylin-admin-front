import React, { Component } from 'react'
import { connect } from 'dva'
import { BackTop, Layout, Spin } from 'antd'
import { withRouter } from 'dva/router'
import Header from '../components/layout/Header';
import MySider from '../components/layout/Slider';
import LoadingHold from '../components/helper/LoadingHold';
import LoginPage from '../routes/LoginPage';
const { Content, Footer, Sider } = Layout

class MainLayout extends Component {
  state = {
    collapsed: false
  }

  toggleSlider = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

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
            collapsed={this.state.collapsed}
            theme={'light'}
          >
            <MySider options={options} />
          </Sider>
          <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
            <BackTop target={() => document.getElementById('mainContainer')} />
            <Header user={user} toggleSlider={this.toggleSlider} />
            <Content>
              <div style={{backgroundColor: '#FFF', padding: 10, minheight: 'calc(100vh - 164px)'}}>
                {(options && summary) ? children : <LoadingHold />}
              </div>
            </Content>
            <Footer >
            </Footer>
          </Layout>
        </Layout>
    )
  }
}

function mapStateToProps({session, system }) {
  return {session, system};
}

export default withRouter(connect(mapStateToProps)(MainLayout));

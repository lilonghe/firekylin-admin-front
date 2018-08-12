import React, { Component } from 'react'
import { Menu, Icon, Popover, Layout } from 'antd'
// import classnames from 'classnames'
import styles from './Header.less'
// import Menus from './Menu'
const { SubMenu } = Menu

export default class Header extends Component {
  render() {
    const { user } = this.props;
    if(!user) {
      return <div></div>;
    }
    return (
      <Layout.Header className={styles.header}>
        <div
          className={styles.button}>
          {/* <Icon type={'menu-unfold'} /> */}
        </div>
        <div className={styles.rightWarpper}>
          {/* <div className={styles.button}>
            <Icon type="mail" />
          </div> */}
          <Menu mode="horizontal">
            <SubMenu
              style={{
                float: 'right',
              }}
              title={<span>
                <Icon type="user" />
                {user.name}
              </span>}
            >
              <Menu.Item key="logout">
                <a href="/admin/user/logout">退出</a>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Layout.Header>
    )
  }
}

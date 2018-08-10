import React, { Component } from 'react'
import { Menu, Icon, Popover, Layout } from 'antd'
// import classnames from 'classnames'
import styles from './Header.less'
// import Menus from './Menu'
const { SubMenu } = Menu

export default class Header extends Component {
  render() {
    return (
      <Layout.Header className={styles.header}>
        <div
          className={styles.button}>
          <Icon type={'menu-unfold'} />
        </div>
        <div className={styles.rightWarpper}>
          <div className={styles.button}>
            <Icon type="mail" />
          </div>
          <Menu mode="horizontal">
            <SubMenu
              style={{
                float: 'right',
              }}
              title={<span>
                <Icon type="user" />
                {/* {user.username} */}
              </span>}
            >
              <Menu.Item key="logout">
                Sign out
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </Layout.Header>
    )
  }
}

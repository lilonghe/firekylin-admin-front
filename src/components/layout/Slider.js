import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Icon, Switch, Menu } from 'antd'
// import { config } from 'utils'
import styles from './Layout.less'
const MenuItem = Menu.Item;
// import Menus from './Menu'

export default class Sider extends Component {
  render() {
    return (
      <div>
        <div className={styles.logo}>
          <img alt="logo" />
          <span>{'xxx'}</span>
        </div>
        <Menu mode='inline' selectedKeys={['xxx']}>
          <MenuItem key='xxx'>xxx</MenuItem>
          <MenuItem>agefegrg34</MenuItem>
          <MenuItem>xcv3242f</MenuItem>
          <MenuItem>32r2fwvwvw</MenuItem>
          <MenuItem>wef432</MenuItem>
        </Menu>
      </div>
    )
  }
}

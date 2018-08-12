import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Icon, Switch, Menu } from 'antd'
// import { config } from 'utils'
import styles from './Layout.less'
const MenuItem = Menu.Item;
// import Menus from './Menu'

export default class Sider extends Component {
  render() {
    const { options } = this.props;
    if (!options) return <div></div>
    return (
      <div>
        <div className={styles.logo}>
          <img alt="logo" src={options.logo_url} />
          <span>{options.title}</span>
        </div>
        <Menu mode='inline' selectedKeys={['dashboard']}>
          <MenuItem key='dashboard'><Icon type="home" />概览</MenuItem>
          <MenuItem key='post'><Icon type="file-text" />文章管理</MenuItem>
          <MenuItem key='cate'><Icon type="folder" />分类管理</MenuItem>
          <MenuItem key='options'><Icon type="setting" />系统设置</MenuItem>
        </Menu>
      </div>
    )
  }
}

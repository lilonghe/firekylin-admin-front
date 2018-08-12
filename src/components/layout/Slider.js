import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
import styles from './Layout.less';
import { Link, withRouter } from 'dva/router';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default class Sider extends Component {
  render() {
    const { options } = this.props;
    if (!options) return <div></div>

    const path = window.location.pathname
    return (
      <div>
        <div className={styles.logo}>
          <img alt="logo" src={options.logo_url} />
          <span>{options.title}</span>
        </div>
        <Menu mode='inline'
          defaultOpenKeys={[path.substr(0, path.lastIndexOf('/'))]}
          selectedKeys={[path]}>
          <MenuItem key='/admin/dashboard'>
            <Link to="/admin/dashboard"><Icon type="home" />概览</Link>
          </MenuItem>
          <SubMenu key="/admin/post" title={<span><Icon type="file-text" />文章管理</span>}>
            <Menu.Item key="/admin/post/list">
              <Link to="/admin/post/list">文章列表</Link>
            </Menu.Item>
            <Menu.Item key="/admin/post/create">
              <Link to="/admin/post/create">添加文章</Link>
            </Menu.Item>
          </SubMenu>
          <MenuItem key='cate'><Icon type="folder" />分类管理</MenuItem>
          <MenuItem key='options'><Icon type="setting" />系统设置</MenuItem>
        </Menu>
      </div>
    )
  }
}

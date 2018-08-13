import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Tag } from 'antd';
import { stringToHexColor } from '../../utils/tool';
const { Column } = Table;

@connect(({ system, cate }) => ({ system, cate }))
export default class IndexPage extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'cate/fetchList',
      payload: {
        page: 1
      }
    })
  }

  render() {
    const { cate: { list } } = this.props;
    return (
      <Fragment>
        <div></div>

        <Table
          rowKey={row => row.id}
          pagination={false}
         dataSource={list}>
          <Column
            title="名称"
            dataIndex="name"
            key="name" />
          <Column
            title="缩略名"
            dataIndex="pathname"
            key="pathname" />
          <Column
            title="文章数"
            dataIndex="post_cate"
            key="post_cate" />
          <Column
            title="操作"
            dataIndex="action"
            key="action"
            render={(text, record) => (
              <div>
                <Button type="primary">编辑</Button>
                <Popconfirm title="确认删除（不可撤销）？">
                  <Button type="danger" style={{marginLeft: 10}}>删除</Button>
                </Popconfirm>
              </div>
            )} />
        </Table>
      </Fragment>
    )
  }

}

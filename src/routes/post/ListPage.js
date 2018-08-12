import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Tag } from 'antd';
import { stringToHexColor } from '../../utils/tool';
const { Column } = Table;

@connect(({ system, post }) => ({ system, post }))
export default class IndexPage extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'post/fetchList',
      payload: {
        page: 1
      }
    })
  }

  changePage = (page) => {
    this.props.dispatch({
      type: 'post/fetchList',
      payload: {
        page
      }
    })
  }

  render() {
    const { post: { list, pageSize, totalPages } } = this.props;
    return (
      <Fragment>
        <div></div>

        <Table
          rowKey={row => row.id}
          pagination={{
            total: totalPages * pageSize,
            pageSize: pageSize,
            hideOnSinglePage: true,
            onChange: this.changePage
          }}
         dataSource={list}>
          <Column
            title="标题"
            dataIndex="title"
            key="title" />
          <Column
            title="状态"
            dataIndex="status"
            key="status"
            render={((text) => {
              switch(text) {
                case 0:
                  return <span>草稿</span>
                case 3:
                  return <span>已发布</span>
                default:
                  return <span>{text}</span>
              }
            })} />
          <Column
            title="发布时间"
            dataIndex="create_time"
            key="create_time" />
          <Column
            title="是否公开"
            dataIndex="is_public"
            key="is_public"
            render={(text) => (text === 1 ? '是':'否')} />
          <Column
            title="标签"
            dataIndex="tag"
            key="tag"
            render={(text, record) => {
              return record.tag.map(t => <Tag key={t.id} color={stringToHexColor(t.name)}>{t.name}</Tag>)
            }} />
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

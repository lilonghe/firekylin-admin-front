import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Card,Row,Col } from 'antd';

@connect(({ system, post }) => ({ system, post }))
export default class IndexPage extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'post/fetchLatest'
    })
  }

  render() {
    const { system: { summary: { versions, count } }, post: { lastest } } = this.props;
    return (
      <Fragment>
        <Card title='网站概要' className={styles.summaryCard}>
          共有 {count.posts} 篇文章<br/>
          分为 {count.cates} 种大类<br/>
          有 {count.comments} 个评论
        </Card>

        <Card title='系统概况' className={styles.summaryCard}>
          <Row>
            <Col span={8}>Node :</Col>
            <Col span={14}>{versions.nodeVersion}</Col>
          </Row>
          <Row>
            <Col span={8}>V8 :</Col>
            <Col span={14}>{versions.v8Version}</Col>
          </Row>
          <Row>
            <Col span={8}>ThinkJs :</Col>
            <Col span={14}>{versions.thinkjsVersion}</Col>
          </Row>
          <Row>
            <Col span={8}>Firekylin :</Col>
            <Col span={14}>{versions.firekylinVersion}</Col>
          </Row>
          <Row>
            <Col span={8}>MySQL :</Col>
            <Col span={14}>{versions.mysqlVersion}</Col>
          </Row>
        </Card>

        <Card title="关于我们" className={styles.summaryCard} style={{width: 400}}>
              <ul>
                <li>
                  <label>项目主页：</label>
                  <a href="https://firekylin.org/" target="_blank">http://firekylin.org/</a>
                </li>
                <li>
                  <label>项目源码：</label>
                  <a href="https://github.com/firekylin/firekylin">https://github.com/firekylin/firekylin</a>
                </li>
                <li>
                  <label>帮助文档：</label>
                  <a href="https://github.com/firekylin/firekylin/wiki" target="_blank">https://github.com/firekylin/firekylin/wiki</a>
                </li>
                <li>
                  <label>问题反馈：</label>
                  <a href="https://github.com/firekylin/firekylin/issues">https://github.com/firekylin/firekylin/issues</a>
                </li>
              </ul>
        </Card>

        <Card title='最近文章' className={styles.summaryCard} style={{width: 500, clear: 'both'}}>
          {lastest.map(item => {
            return <li>
              <label style={{marginRight: 10}}>{item.create_time}</label>
              <a href={`/post/${item.pathname}`}>{item.title}</a>
            </li>
          })}
        </Card>
      </Fragment>
    )
  }
}

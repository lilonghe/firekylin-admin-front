import React, { Component } from 'react'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import styles from './LoginPage.less'
const FormItem = Form.Item;


@Form.create()
export default class LoginPage extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
        <img alt="logo" src={'https://antd-admin.zuiidea.com/public/logo.svg'} />
        <span>{'xxx'}</span>
      </div>
      <Form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" placeholder="Password" />)}
        </FormItem>
        <Row>
          <Button type="primary" >
            Sign in
          </Button>
        </Row>

      </Form>
      </div>
    )
  }
}

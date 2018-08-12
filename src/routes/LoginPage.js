import React, { Component } from 'react'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import styles from './LoginPage.less'
import md5 from 'md5';
const FormItem = Form.Item;

@connect(({ session }) => {return {session}})
@Form.create()
export default class LoginPage extends Component {

  handleSumit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.dispatch({
            type: 'session/login',
            payload: {
              username: values.username,
              oripassword: values.password,
              password: md5(window.SysConfig.options.password_salt + values.password)
            }
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const options = window.SysConfig.options;
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
        <img alt="logo" src={options.logo_url} />
        <span>{options.title}</span>
      </div>
      <Form onSubmit={this.handleSumit}>
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
          <Button type="primary"  htmlType="submit">
            登录
          </Button>
        </Row>

      </Form>
      </div>
    )
  }
}

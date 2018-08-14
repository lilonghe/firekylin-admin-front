import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Form, Button, Input } from 'antd';
const FormItem = Form.Item;

@connect(({ system }) => ({ system }))
@Form.create()
export default class IndexPage extends Component {

  handleSumit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.dispatch({
            type: 'system/updateOptions',
            payload: {...values}
          })
      }
    });
  }

  render() {
    const { system: { options }, form: { getFieldDecorator } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Fragment>
        <Form onSubmit={this.handleSumit} style={{maxWidth: 600}}>
          <FormItem label='站点名称' {...formItemLayout}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: options.title
            })(<Input placeholder="站点名称" />)}
          </FormItem>
          <FormItem label='站点描述' {...formItemLayout}>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: options.description
            })(<Input placeholder="站点描述" />)}
          </FormItem>
          <FormItem label='网站地址' {...formItemLayout}>
            {getFieldDecorator('site_url', {
              rules: [
                {},
              ],
              initialValue: options.site_url
            })(<Input placeholder="网站地址" />)}
          </FormItem>
          <FormItem label='关键词' {...formItemLayout}>
            {getFieldDecorator('keywords', {
              rules: [
                {},
              ],
              initialValue: options.keywords
            })(<Input placeholder="关键词" />)}
          </FormItem>
          <FormItem label='LOGO 地址' {...formItemLayout}>
            {getFieldDecorator('logo_url', {
              rules: [
                {},
              ],
              initialValue: options.logo_url
            })(<Input placeholder="LOGO 地址" />)}
          </FormItem>
          <FormItem label='Favicon 地址' {...formItemLayout}>
            {getFieldDecorator('favicon_url', {
              rules: [
                {},
              ],
              initialValue: options.favicon_url
            })(<Input placeholder="Favicon 地址" />)}
          </FormItem>
          <FormItem label='GitHub 地址' {...formItemLayout}>
            {getFieldDecorator('github_url', {
              rules: [
                {},
              ],
              initialValue: options.github_url
            })(<Input placeholder="GitHub 地址" />)}
          </FormItem>
          <FormItem label='Twitter 地址' {...formItemLayout}>
            {getFieldDecorator('twitter_url', {
              rules: [
                {},
              ],
              initialValue: options.twitter_url
            })(<Input placeholder="Twitter 地址" />)}
          </FormItem>
          <FormItem label='工信部备案号' {...formItemLayout}>
            {getFieldDecorator('miitbeian', {
              rules: [
                {},
              ],
              initialValue: options.miitbeian
            })(<Input placeholder="工信部备案号" />)}
          </FormItem>
          <FormItem label='公安部备案号' {...formItemLayout}>
            {getFieldDecorator('mpsbeian', {
              rules: [
                {},
              ],
              initialValue: options.mpsbeian
            })(<Input placeholder="公安部备案号" />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary"  htmlType="submit">
              保存
            </Button>
          </FormItem>

        </Form>
      </Fragment>
    )
  }
}

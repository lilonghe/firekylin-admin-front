import React, { PureComponent } from 'react'
import { Form, connect, Input, Button } from 'antd';
//import LzEditor from 'react-lz-editor';
//import ReactMarkdown from 'react-markdown';
import marked from 'marked'
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

const FormItem = Form.Item;

@Form.create()
export default class AddPage extends PureComponent {

  state = {
    markedContent: '',
    htmlContent: '',
    mdeState: null,
    publishType: 'draft'
  }

  changePublishType = (type) => {
    this.setState({
      publishType: type
    })
  }

  rcMarkedContent = (content) => {
    console.log(content);
    this.setState({
      markedContent: content,
      htmlContent: marked(content,{sanitize: true})
    })
  }

  handleChange = (mdeState) => {
    this.setState({
      mdeState
    })
  }

  handleSumit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values, this.state.mdeState);
        console.log(this.state.publishType)
        //this.props.dispatch({
        //  type: 'session/login',
        //  payload: {
            // username: values.username,
            // oripassword: values.password,
            // password: md5(window.SysConfig.options.password_salt + values.password)
        //  }
        //})
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const options = window.SysConfig.options;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 2 },
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
          offset: 4,
        },
        sm: {
          span: 16,
          offset: 2,
        },
      },
    };




    return (
      <div>
        <Form onSubmit={this.handleSumit}>
          <FormItem {...formItemLayout} label='标题'>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="标题" />)}
          </FormItem>
          <FormItem {...formItemLayout} label={'地址'}>
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
            <div style={{display: 'flex', alignItems:'center'}}>
              <span>{options.site_url + "/post/"}</span>
              <Input style={{flex: 1}} placeholder="short-name" />
              <span>.html</span>
            </div>)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button onClick={() => this.changePublishType('draft')} type="primary" htmlType="submit">保存草稿</Button>
            <Button onClick={() => this.changePublishType('public')} style={{ marginLeft:10 }} type="primary" htmlType="submit">发布文章</Button>
          </FormItem>
        </Form>
        <div style={{ lineHeight: 1.2 }} onClick={e => { e.stopPropagation(); return; }}>
          <ReactMde
            layout={'tabbed'}
            editorState={this.state.mdeState}
            onChange={this.handleChange}
            generateMarkdownPreview={(markdown) => Promise.resolve(marked(markdown))} />
        </div>
      </div>
    )
  }

}

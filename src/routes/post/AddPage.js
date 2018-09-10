import React, { PureComponent } from 'react'
import { Form, connect, Input } from 'antd';
import LzEditor from 'react-lz-editor';
import marked from 'marked'

const FormItem = Form.Item;

@Form.create()
export default class AddPage extends PureComponent {

  state = {
    markedContent: '',
    htmlContent: ''
  }

  rcMarkedContent = (content) => {
    console.log(content);
    this.setState({
      markedContent: content,
      htmlContent: marked(content,{sanitize: true})
    })
  }

  handleSumit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'session/login',
          payload: {
            // username: values.username,
            // oripassword: values.password,
            // password: md5(window.SysConfig.options.password_salt + values.password)
          }
        })
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
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
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

          <div style={{display: 'flex'}}>
              <div style={{flex: 1}}>
                <LzEditor
                  convertFormat='markdown'
                  cbReceiver={this.rcMarkedContent} />
              </div>

              <div  style={{flex: 1}} dangerouslySetInnerHTML={{__html: this.state.htmlContent}}>

              </div>
          </div>

        </Form>
      </div>
    )
  }

}

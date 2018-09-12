import React, { Component } from 'react'
import { Form, Input, Button, Select, Switch, Modal } from 'antd';
import marked from 'marked'
import { connect } from 'dva';
import { fetchListTag } from '../../services/services';

const FormItem = Form.Item;

@connect(({ system, cate }) => ({ system, cate }))
@Form.create()
export default class AddPage extends Component {

  state = {
    markedContent: '',
    htmlContent: '',
    mdeState: null,
    publishType: 'draft',
    tagList: [{id:1, name:"afa"}, {id:2, name: "xfds"}]
  }

  async componentDidMount() {
    this.props.dispatch({
      type: 'cate/fetchList',
      payload: {
        page: 1
      }
    })

    const { err, data } = await fetchListTag();
    if (!err) {
      this.setState({
        tagList: data
      })
    }

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

  previewContent = () => {
    let md = this.props.form.getFieldValue('markdown_content');
    let title = this.props.form.getFieldValue('title')
    if (!md) return;
    Modal.info({
      title: title || "无标题 - 内容预览",
      width: '60%',
      maskClosable: true,
      iconType:"read",
      content: <div style={{padding: 20, border:'1px dashed'}} dangerouslySetInnerHTML={{__html: marked(md)}}></div>
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { cate: { list } } = this.props;
    const { tagList } = this.state;
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
            {getFieldDecorator('pathname', {
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
          <FormItem {...formItemLayout} label="内容">
            {getFieldDecorator('markdown_content', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<div>
              <Button onClick={this.previewContent}>预览</Button>
              <Input.TextArea autosize={{ minRows: 10, maxRows: 50 }} placeholder="输入内容"/>
            </div>)}
          </FormItem>
          <FormItem {...formItemLayout} label="选择分类">
            {getFieldDecorator('category', {
              rules: [
                // {
                //   required: true,
                // },
              ],
            })(<Select placeholder="选择分类">
              {list.map(item => <Select.Option value={item.id}>{item.name}</Select.Option>)}
            </Select>)}
          </FormItem>
          <FormItem {...formItemLayout} label="选择标签">
            {getFieldDecorator('tag', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Select mode="tags" placeholder="选择标签">
              {tagList.map(item => <Select.Option value={item.name}>{item.name}</Select.Option>)}
            </Select>)}
          </FormItem>
          <FormItem {...formItemLayout} label="是否公开">
            {getFieldDecorator('is_public', {
              rules: [],
            })(<Switch defaultChecked={true}/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="允许评论">
            {getFieldDecorator('allow_comment', {
              rules: [],
            })(<Switch defaultChecked={true}/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="封面图片">
            {getFieldDecorator('cover', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="封面图片链接"/>)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button onClick={() => this.changePublishType('draft')} type="primary" htmlType="submit">保存草稿</Button>
            <Button onClick={() => this.changePublishType('public')} style={{ marginLeft:10 }} type="primary" htmlType="submit">发布文章</Button>
          </FormItem>
        </Form>
      </div>
    )
  }

}

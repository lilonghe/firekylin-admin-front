import React, {Component} from 'react';
import { Spin } from 'antd';


export default class LoadingHold extends Component {
  render() {
    return (
      <Spin spinning={true} style={{minHeight: 200, justifyContent: 'center', alignItems: 'center', display: 'flex'}}></Spin>
    )
  }
}

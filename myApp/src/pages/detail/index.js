import React, { Component } from "react";
import { browserHistory } from "react-router";
import FollowUpList from './cmps/follow-up-list';
import axios from 'axios'

import Trace from '../../common/trace'
import {
  Tabs,
  Button,
  Modal
} from "antd";
const { TabPane } = Tabs;
import './index.less'
import BasicInfoForm from './cmps/basic-info-form';

export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      isShowTraceModal: false,
      followUpData: []
    };
  }
  handleChangeTabs = () => {

  }
  componentDidMount(){
    this.getFollowUpData()
  }
  getFollowUpData () {
    axios.get('http://47.106.74.64:8888/api/followup/listCards?house_code=111111')
      .then((res) => {
        this.setState({followUpData:res.data.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="house-detail">
        <div className="top-area">
          <Button style={{ position: 'absolute', right: '10px', bottom: '20px',zIndex: 10 }} shape="circle" size="large" onClick={() => this.setState({ isShowTraceModal: true })}>+</Button>
          <div className="left-area">
          </div>
          <div className="right-area">
            <Tabs onChange={this.handleChangeTabs} type="card">
              <TabPane tab="跟进" key="1">
                <div className="follow-up-tab-cont">
                  <FollowUpList followUpData={this.state.followUpData}/>
                </div>
              </TabPane>
              <TabPane tab="带看" key="2">
                带看内容
              </TabPane>
              <TabPane tab="修改" key="3">
                修改内容
              </TabPane>
              <TabPane tab="语音" key="4">
                语音内容
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="bottom-area">
          <BasicInfoForm></BasicInfoForm>
        </div>
        <Modal
          visible={this.state.isShowTraceModal}
          title="输入跟进信息"
          cancelText="取消"
          okText="确认"
          footer={null}
          onCancel={() => this.setState({isShowTraceModal: false})}
        >
          <Trace onSuccess={() => { this.setState({ isShowTraceModal: false });this.getFollowUpData() }}></Trace>
        </Modal>
      </div>
    );
  }
}

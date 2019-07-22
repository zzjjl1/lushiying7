import React, { Component } from "react";
import { browserHistory } from "react-router";
import FollowUpList from './cmps/follow-up-list';
import axios from 'axios'

import Trace from '../../common/trace'
import {
  Tabs,
  Button,
  Modal,
  Tag
} from "antd";
const { TabPane } = Tabs;
import './index.less'
import BasicInfoForm from './cmps/basic-info-form';

export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      isShowTraceModal: false,
      followUpData: [],
      activeKey: '1',
      editStatus: '',
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
  handleChangeHouseInfoTab = (checked) => {
    this.setState({activeKey:checked})
    debugger
  }
  goToEdit = () => {
    this.setState({activeKey:'2', isShowTraceModal: false, editStatus:'true'})
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
          <Tabs activeKey={this.state.activeKey} onChange={this.handleChangeHouseInfoTab}>
            <TabPane tab="维护信息" key="1">
              维护信息表单
            </TabPane>
            <TabPane tab="基础信息" key="2">
              <BasicInfoForm editStatus={this.editStatus}></BasicInfoForm>
            </TabPane>
            <TabPane tab="经纪人点评" key="3">
              经纪人点评
            </TabPane>
            <TabPane tab="房主自荐" key="4">
              房主自荐
            </TabPane>
            <TabPane tab="经纪人点评" key="5">
              经纪人点评
            </TabPane>
          </Tabs>
        </div>
        <Modal
          visible={this.state.isShowTraceModal}
          title={<div><label>输入跟进信息</label><a onClick={this.goToEdit}>填房源基础信息，发贝壳币、赢专属展位</a></div>}
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

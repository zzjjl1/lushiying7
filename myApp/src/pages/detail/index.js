import React, { Component } from "react";
import { browserHistory } from "react-router";
import FollowUpList from './cmps/follow-up-list';
import {
  Tabs,
} from "antd";
const { TabPane } = Tabs;
import './index.less'
import BasicInfoForm from './cmps/basic-info-form'

export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  handleChangeTabs= () => {

  }
  render() {
    return (
      <div className="house-detail">
        <div className="top-area">
          <div className="left-area">
            房源详情页左边信息区域
          </div>
          <div className="right-area">
            <Tabs onChange={this.handleChangeTabs} type="card">
              <TabPane tab="跟进" key="1">
                <div className="follow-up-tab-cont">
                  <FollowUpList/>
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
      </div>
    );
  }
}

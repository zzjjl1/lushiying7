import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Layout,
  Breadcrumb,
  Menu,
  Icon,
  Tabs,
  DatePicker,
  Select,
  Carousel,
  Cascader
} from "antd";
import Head from "./header";
import RentShort from "./rentShort";
import RentWork from "./rentWorkDay";
import RentWeek from "./rentWeek";
import RentMonth from "./rentMonth";
import RentYear from "./rentYear";
import "./index.less";

const TabPane = Tabs.TabPane;

export default class RentDetail extends Component {
  constructor() {
    super();
    this.state={
      information:{}
    }
  }
  componentDidMount(){
  }
  

  render() {
    return (
      <div className="rentSorce">
        <Tabs type="card" defaultActiveKey="1">
          <TabPane tab="短租自驾" key="1">
            <RentShort />
          </TabPane>
          <TabPane tab="工作日套餐(4天)" key="2">
            <RentWork />
          </TabPane>
          <TabPane tab="周租套餐(7-27天)" key="3">
            <RentWeek />
          </TabPane>
          <TabPane tab="月租套餐(28+天)" key="4">
            <RentMonth information={this.state.information}/>
          </TabPane>
          <TabPane tab="年租套餐(365天)" key="5">
            <RentYear />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

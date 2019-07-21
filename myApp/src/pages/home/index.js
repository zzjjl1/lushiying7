import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";
import axios from 'axios'

import './index.less'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      expireTime: null,
    };
  }

  componentWillMount() {
    const data = {
      time: '2019-07-21 23:59'
    }
    this.setState({
      expireTime: data.time,
    })
  }


  render() {
    return (
      <div className="home">
        <h2 className="header">任务中心</h2>

        <div className="content">
          <div className="title">
            <span>补全十套房源基本信息</span>
            <span className="expire-tip">即将过期</span>
            <span>查看规则</span>
          </div>
          <p className="reward color-gray">任务奖励：20贝壳币</p>
          <div className="expire-time color-gray">
            <span>过期时间：{this.state.expireTime}</span>
            <button className="to-do">去完成</button>
          </div>
        </div>
      </div>
    );
  }
}

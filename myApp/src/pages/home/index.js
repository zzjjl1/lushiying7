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
      taskListData: null,
    };
  }

  componentWillMount() {
    axios.get('47.106.74.64:8888/task/list').then(data => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
    const data = [
      {},
      {},
      {},
    ]
    this.setState({
      taskListData: data,
    })
  }


  render() {
    const taskListData = this.state.taskListData

    const taskList = taskListData.map((task, index) =>
      <div className="content" key={index}>
        <div className="title">
          <span>补全十套房源基本信息</span>
          {/* <span className="expire-tip">即将过期</span> */}
          <span>查看规则</span>
        </div>
        <p className="reward color-gray">任务奖励：20贝壳币</p>
        <div className="expire-time color-gray">
          <span>过期时间：2019-07-23 23:59</span>
          <button className="to-do">去完成</button>
        </div>
      </div>
    )

    return (
      <div className="main">
        <h2 className="header">任务中心</h2>
        <div className="task-list">
          {taskList}
        </div>
      </div>
    );
  }
}

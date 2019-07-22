import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from 'axios'

import './index.less'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      taskListData: [],
    };
  }

  componentWillMount() {
    axios.get('http://47.106.74.64:8888/task/list').then(reps => {
      this.setState({
        taskListData: reps.data.data
      });
    }).catch((err) => {
      // 发送埋点
    })
  }

  formatNum(num) {
    return num > 9 ? num : '0' + num
  }


  render() {
    const taskListData = this.state.taskListData
    const nowDate = new Date()
    const sunDayTime =  (7 - nowDate.getDay()) * (24 * 60 * 60 * 1000) + nowDate.getTime()
    const sunDayDate = new Date(sunDayTime)
    const sunDay = `${sunDayDate.getFullYear()}
      - ${this.formatNum(sunDayDate.getMonth() + 1)}
      - ${this.formatNum(sunDayDate.getDate())}`

    const taskList = taskListData.map((task, index) =>
      <div className="content" key={index}>
        <div className="title">
          <span>补全十套房源基本信息</span>
          {/* <span className="expire-tip">即将过期</span> */}
          <span>查看规则</span>
        </div>
        <p className="reward color-gray">任务奖励：20贝壳币</p>
        <div className="expire-time color-gray">
          <span>过期时间：{sunDay}</span>
          <button className="to-do"><Link to={ '/assignment/' + task.code }>去完成</Link></button>
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

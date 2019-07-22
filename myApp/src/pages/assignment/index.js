import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";
import axios from 'axios'
import { Card } from 'antd'
import './index.less'
import TaskList from './cmps/taskList'



export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    return (
      <div className="task-area">
        <div className="title-area">每周任务清单</div>
        <div className="task-total-area">
          <div className="total-item">
            <p className="item-num">10</p>
            <p className="item-cont">已完成的房源数</p>
          </div>
          <div className="total-item">
            <p className="item-num line">10</p>
            <p className="item-cont">获得的贝壳币</p>
          </div>
          {/* <div className="total-item">
            <p className="item-num blue">0</p>
            <p className="item-cont">进行中的任务数</p>
          </div>
          <div className="total-item">
            <p className="item-num blue">0</p>
            <p className="item-cont">可获得的贝壳币</p>
          </div> */}
        </div>
        <Card title="任务详情" style={{ marginBottom: '10px' }}>
          <div className="ass-table">
            <div className="ass-cell">
              <div className="ass-cell1">任务名称</div>
              <div className="ass-cell2">补全10套房源的基本信息</div>
            </div>
            <div className="ass-cell">
              <div className="ass-cell1">任务规则</div>
              <div className="ass-cell2">一周内累计共补全10套房源的基本信息，则表示任务完成，并发放贝壳币奖励和"房源保护者"称号</div>
            </div>
            <div className="ass-cell">
              <div className="ass-cell1">奖励</div>
              <div className="ass-cell2">20个贝壳币和为期一周的"房源保护者称号</div>
            </div>
            <div className="ass-cell">
              <div className="ass-cell1">到期时间</div>
              <div className="ass-cell2">每周日23:59</div>
            </div>
          </div>
        </Card>
        <div className="task-list-area">
          <Card title="房源任务信息">
            <TaskList></TaskList>
          </Card>
        </div>
      </div>
    );
  }
}

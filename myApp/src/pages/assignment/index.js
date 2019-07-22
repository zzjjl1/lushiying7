import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";
import axios from 'axios'
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
        <div className="title-area">每日任务清单</div>
        <div className="task-total-area">
          <div className="total-item">
            <p className="item-num">0</p>
            <p className="item-cont">已完成的任务数字</p>
          </div>
          <div className="total-item">
            <p className="item-num line">0</p>
            <p className="item-cont">获得的贝壳币</p>
          </div>
          <div className="total-item">
            <p className="item-num blue">0</p>
            <p className="item-cont">进行中的任务数</p>
          </div>
          <div className="total-item">
            <p className="item-num blue">0</p>
            <p className="item-cont">可获得的贝壳币</p>
          </div>
        </div>
        <div className="task-list-area">
          <TaskList></TaskList>
        </div>
      </div>
    );
  }
}

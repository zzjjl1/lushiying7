import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";
import axios from 'axios'
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

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
     
    };
  }



  render() {
    const { showList } = this.state;
    return (
      <div>首页</div>
    );
  }
}

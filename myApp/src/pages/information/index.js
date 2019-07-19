import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Form,
  Steps,
  Button,
  Modal,
  Alert,
  Input,
  message,
  Tabs,
  Table
} from "antd";
import Data from "../../json/car_data.json";
import User from "../../json/account.json";
import { queryToJson } from "../../common/utils";
import ajax from "../../common/request";
import axios from "axios";
import moment from "moment";
import "./index.less";

const columns = [
  {
    title: "车辆图片",
    dataIndex: "src"
  },
  {
    title: "名称",
    dataIndex: "name"
  },
  {
    title: "车辆描述",
    dataIndex: "describe"
  },
  {
    title: "单价/日",
    dataIndex: "money"
  },
  {
    title: "服务费",
    dataIndex: "serverMoney"
  },
  {
    title: "详细配置",
    dataIndex: "config"
  },
  {
    title: "操作",
    dataIndex: "caozuo"
  }
];

export default class Information extends Component {
  constructor() {
    super();
    this.state = {
      authority: sessionStorage.manage,
      dataSource: [],
      visible: false
    };
  }
  componentDidMount() {
    axios({
      method: "get",
      url: "/car/findcar"
    }).then(res => {
      let dataSource = res.data.data.map(item => {
        return {
          src: <img src={item.src} style={{ width: 180 }} />,
          name: item.name,
          describe: item.describe,
          money: item.money,
          serverMoney: item.serverMoney,
          config: <a onClick={this.showModal.bind(this, item)}>查看</a>,
          caozuo: (
            <span>
              <a onClick={this.change.bind(this, item._id)}>编辑</a> |{" "}
              <a onClick={this.delete.bind(this, item._id)}>删除</a>
            </span>
          )
        };
      });
      this.setState({ dataSource });
    });
    // const dataSource = Data.data.map(item => {
    //   return {
    //     src: <img src={item.src} style={{ width: 180 }} />,
    //     name: item.name,
    //     describe: item.describe,
    //     money: item.money,
    //     serverMoney: item.serverMoney,
    //     config: <a onClick={this.showModal.bind(this,item)}>查看</a>,
    //     caozuo:<span><a onClick={this.change.bind(this,item.id)}>编辑</a> | <a onClick={this.delete.bind(this,item.id)}>删除</a></span>
    //   };
    // });
    // this.setState({ dataSource ,authority});
  }
  change(id) {
    this.props.history.push(`/enter?id=${id}`);
  }
  delete(id) {
    Modal.confirm({
      title: "警告",
      content: "确定删除该条信息吗",
      okText: "确定",
      cancelText: "不了,再想想",
      onOk: () => {
        // const data = `delete&../myApp/src/json/car_data.json&${JSON.stringify(
        //   id
        // )}`;
        // ajax("POST", "http://127.0.0.1:3000/", data);
        axios({
          method: "post",
          url: "/car/deletecar",
          data: { _id: id }
        }).then(res => {
          message.success("删除成功");
          axios({
            method: "get",
            url: "/car/findcar"
          }).then(res => {
            let dataSource = res.data.data.map(item => {
              return {
                src: <img src={item.src} style={{ width: 180 }} />,
                name: item.name,
                describe: item.describe,
                money: item.money,
                serverMoney: item.serverMoney,
                config: <a onClick={this.showModal.bind(this, item)}>查看</a>,
                caozuo: (
                  <span>
                    <a onClick={this.change.bind(this, item._id)}>编辑</a> |{" "}
                    <a onClick={this.delete.bind(this, item._id)}>删除</a>
                  </span>
                )
              };
            });
            this.setState({ dataSource });
          });
        });
      }
    });
  }

  showModal(item) {
    Modal.confirm({
      className: "gs-modal-operate aaa",
      title: "配置信息",
      iconType: "no-icon",
      okText: "确定",
      cancelText: "取消",
      content: (
        <ul>
          <li>座位数：{item.config.seat}</li>
          <li>车门数：{item.config.door}</li>
          <li>燃料类型：{item.config.fuel}</li>
          <li>变速箱类型：{item.config.box}</li>
          <li>排量：{item.config.disp}</li>
          <li>燃油标号：{item.config.mark}</li>
          <li>驱动方式：{item.config.drive}</li>
          <li>发动机进气形式：{item.config.engine}</li>
          <li>天窗：{item.config.window}</li>
          <li>油箱容量：{item.config.tank}</li>
          <li>音箱：{item.config.sound}</li>
          <li>座椅：{item.config.seatType}</li>
          <li>倒车雷达：{item.config.radar}</li>
          <li>气囊：{item.config.air}</li>
          <li>DVD/CD：{item.config.DVD}</li>
          <li>GPS导航：{item.config.GPS}</li>
        </ul>
      )
    });
  }

  render() {
    const { dataSource, authority } = this.state;
    if (authority=='false') {
      return (
        <div className="component-empty component-nopermission">
          <div className="bgimg" />
          <p>无权限</p>
        </div>
      );
    }
    return (
      <div>
        <h3>管理车辆信息</h3>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}

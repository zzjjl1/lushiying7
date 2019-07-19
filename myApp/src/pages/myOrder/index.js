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
import Data from "../../json/order.json";
import DataShow from "../../json/car_data.json";
import { queryToJson } from "../../common/utils";
import ajax from "../../common/request";
import moment from "moment";
import "./index.less";
import axios from "axios";
const TabPane = Tabs.TabPane;
const columns = [
  {
    title: "车辆图片",
    dataIndex: "img",
    width: 280
  },
  {
    title: "车辆信息",
    dataIndex: "information",
    width: 180
  },
  {
    title: "取车信息",
    dataIndex: "take",
    width: 200
  },
  {
    title: "还车信息",
    dataIndex: "return",
    width: 200
  },
  {
    title: "总计",
    dataIndex: "pay",
    width: 100
  },
  {
    title: "订单状态",
    dataIndex: "status",
    width: 100
  },
  {
    title: "操作",
    dataIndex: "caozuo"
  }
];

export default class MyOrder extends Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
      dataShow: [],
      dataShow2: [],
      dataShow3: [],
      dataShow4: [],
      dataShow5: []
    };
  }
  componentDidMount() {
    axios({
      method: "get",
      url: "/order/findorderbyid",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        auth_code: sessionStorage.code ? sessionStorage.code : null
      }
    }).then(res => {
      console.log(res.data.data);
      this.setState(
        {
          dataList: res.data.data
        },
        () => {
          const { dataList } = this.state;
          const dataShow = dataList.map((item, index) => {
            return {
              img: <img src={item.car.src} style={{ width: 180 }} />,
              information: item.car.describe,
              take: item.takePlace + item.takeShop + item.takeDate,
              return: item.returnPlace + item.returnShop + item.returnDate,
              pay: item.pay,
              status: item.status,
              caozuo: (
                <a>
                  <Link to={`/order?orderId=${item._id}`}>查看详情</Link>
                </a>
              )
            };
          });
          this.setState({ dataShow }, () => {
            const dataShow2 = this.state.dataShow.filter(item => {
              return item.status == "待处理";
            });
            const dataShow3 = this.state.dataShow.filter(item => {
              return item.status == "预订成功";
            });
            const dataShow4 = this.state.dataShow.filter(item => {
              return item.status == "已完成";
            });
            const dataShow5 = this.state.dataShow.filter(item => {
              return item.status == "已取消";
            });
            this.setState({
              dataShow2,
              dataShow3,
              dataShow4,
              dataShow5
            });
          });
        }
      );
    });

    // const user = sessionStorage.userName;
    // const dataList = Data.data.filter(item => {
    //   return item.userName == user;
    // });
    // const dataShow = dataList.map((item, index) => {
    //   let id = item.id;
    //   let datas = DataShow.data.filter(items => {
    //     return items.id == id;
    //   });
    //   return {
    //     img: <img src={datas[0].src} style={{ width: 180 }} />,
    //     information: datas[0].describe,
    //     take: item.takePlace + item.takeShop + item.takeDate,
    //     return: item.returnPlace + item.returnShop + item.returnDate,
    //     pay: item.pay,
    //     status: item.status,
    //     caozuo: (
    //       <a>
    //         <Link to={`/order?orderCode=${item.orderCode}`}>查看详情</Link>
    //       </a>
    //     )
    //   };
    // });
  }

  render() {
    const { dataShow, dataShow2, dataShow3, dataShow4, dataShow5 } = this.state;
    return (
      <div className="myOrder">
        <h3 style={{ borderBottom: 0 }}>我的订单</h3>
        <Tabs type="card" defaultActiveKey="1">
          <TabPane tab="全部" key="1">
            <Table
              columns={columns}
              dataSource={dataShow}
              emptyText="暂无数据"
            />
          </TabPane>
          <TabPane tab="处理中" key="2">
            <Table
              columns={columns}
              emptyText="暂无数据"
              dataSource={dataShow2}
            />
          </TabPane>
          <TabPane tab="预订成功" key="3">
            <Table
              columns={columns}
              dataSource={dataShow3}
              emptyText="暂无数据"
            />
          </TabPane>
          {/* <TabPane tab="已完成" key="4">
            <Table
              columns={columns}
              emptyText="暂无数据"
              dataSource={dataShow4}
            />
          </TabPane> */}
          <TabPane tab="已取消" key="5">
            <Table
              columns={columns}
              emptyText="暂无数据"
              dataSource={dataShow5}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

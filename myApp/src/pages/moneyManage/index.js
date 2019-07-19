import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Select,
  Button,
  DatePicker,
  Input,
  Table,
  Breadcrumb,
  Tooltip,
  Radio,
  Modal,
  message
} from "antd";
import echarts from "echarts";
import Data from "../../json/order.json";
import DataShow from "../../json/car_data.json";
import User from "../../json/account.json";
import ajax from "../../common/request";
import axios from "axios";
import moment from "moment";
import "./index.less";

const columns = [
  {
    title: "车型",
    dataIndex: "carName",
    width: 180
  },
  {
    title: "订单编号",
    dataIndex: "order",
    width: 180
  },
  {
    title: "订单状态",
    dataIndex: "status",
    width: 180
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: 160
  },
  {
    title: "身份证号",
    dataIndex: "idCard",

    width: 180
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    width: 120
  },
  {
    title: "取车时间",
    dataIndex: "takeDate",
    width: 160
  },
  {
    title: "还车时间",
    dataIndex: "returnDate",
    width: 160
  },
  {
    title: "取车地点",
    dataIndex: "takePlace",
    width: 160
  },
  {
    title: "还车地点",
    dataIndex: "returnPlace",
    width: 160
  },
  {
    title: "租期",
    dataIndex: "date",
    width: 160
  },
  {
    title: "支付",
    dataIndex: "pay",
    width: 160
  }
];

class Echart extends Component {
  constructor() {
    super();
    this.state={
      data:[]
    }
  }

  componentDidMount() {
    axios({
      method:'post',
      url:'/order/countyear',
      data:{year:'2019'}
    }).then(res=>{
      console.log(res.data.data)
      this.setState({data:res.data.data},()=>{
        var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      // title: { text: "收入情况" },
      tooltip: {},
      xAxis: {
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ]
      },
      yAxis: {},
      series: [
        {
          name: "收入",
          type: "bar",
          data: this.state.data
        }
      ]
    });
      })
    })
  }

  render() {
    return (
      <div>
        {/* <Select style={{ width: 200 }} defaultValue="2019">
          <Option value="2016">2016年</Option>
          <Option value="2017">2017年</Option>
          <Option value="2018">2018年</Option>
          <Option value="2019">2019年</Option>
        </Select> */}
        <div id="main" style={{ width: 700, height: 400 }} />
      </div>
    );
  }
}

class Echart2 extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    axios({
      method:'get',
      url:'/order/countcar'
    }).then(res=>{
      console.log(res.data.data)
      this.setState({
        data:res.data.data
      },()=>{
        var myChart = echarts.init(document.getElementById("main2"));
    // 绘制图表
    myChart.setOption({
      series: [
        {
          type: "pie",
          radius: "55%",
          data: this.state.data
        }
      ]
    });
      })
    })
    
  }

  render() {
    return (
      <div style={{ marginLeft: 50 }}>
        <h4>本周各类车型收入占比</h4>
        <div id="main2" style={{ width: 400, height: 400 }} />
      </div>
    );
  }
}

export default class MoneyManage extends Component {
  constructor() {
    super();
    this.state = {
      authority: sessionStorage.manage,
      orderList: [],
      carList: [],
      dataSource: [],
      count: undefined,
      name: undefined,
      userName: undefined,
      phone: undefined,
      orderCode: undefined,
      carName: undefined
    };
  }
  componentDidMount() {
    axios({
      method: "get",
      url: '/order/findallorder'
    }).then(res => {
      console.log(res.data.data);
      let count=0;
      for(var i=0;i<res.data.data.length;i++){
        count =count+parseInt(res.data.data[i].pay)
      }
      console.log(count)
      this.setState({
        count,
        orderList: res.data.data,
        dataSource: res.data.data.map((item, index) => {
          return {
            key: index,
            carName: item.car.name,
            order: item._id,
            status: item.status,
            name: item.name,
            idCard: item.idCard,
            phone: item.phone,
            takeDate: item.takeDate,
            returnDate: item.returnDate,
            takePlace: item.takePlace,
            returnPlace: item.returnPlace,
            date: `${item.date}天`,
            pay: `${item.pay}元`,
          };
        })
      });
    });
  }

  render() {
    const {
      dataSource,
      authority
    } = this.state;
    if (authority=='false') {
      return (
        <div className="component-empty component-nopermission">
          <div className="bgimg" />
          <p>无权限</p>
        </div>
      );
    }
    return (
      <div className="page-billflow">
        <div className="g-head m-bill-head">
          <div className="page-title" style={{ fontSize: "22px" }}>
            交易账单
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <Echart />
          <Echart2 />
        </div>

        <div className="m-bill-table">
          <div className="m-total">
            <span>
              共有
              <em>{dataSource.length}</em>
              条搜索结果
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              共收入
              <em>{this.state.count}</em>
              元
            </span>
          </div>
          {/* {1 > 0 && (
            <div className="m-counter">
              <span>实收总金额：</span>
              <em>{countPay}元</em>
              <span style={{ marginLeft: "30px" }}>实收租客总笔数：</span>
              <em>{orderList.length}</em>
            </div>
          )} */}
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    );
  }
}

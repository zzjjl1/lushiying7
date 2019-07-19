import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Form, Steps, Button, Modal, Alert, Input, message } from "antd";
import Data from "../../json/order.json";
import DataShow from "../../json/car_data.json";
import { queryToJson } from "../../common/utils";
import ajax from "../../common/request";
import { timingSafeEqual } from "crypto";
import moment from "moment";
import "./index.less";
import axios from "axios";
const Step = Steps.Step;

export default class Order extends Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
      dataShow: undefined,
      visible: false
    };
  }
  componentWillMount() {
    // const data = Data.data.filter(item => {
    //   return (
    //     item.orderCode == queryToJson(location.search.split("?")[1]).orderCode
    //   );
    // });
    // const dataShow = DataShow.data.filter(item => {
    //   return item.id == data[0].id;
    // });
    // this.setState(
    //   {
    //     data: data[0],
    //     dataShow: dataShow[0]
    //   },
    //   () => {
    //     console.log(this.state.data, this.state.dataShow);
    //   }
    // );
    axios({
      method:'post',
      url: '/order/findorder',
      data:{_id:queryToJson(location.search.split("?")[1]).orderId},
    }).then(res=>{
      console.log(res.data.data)
      this.setState({
        data:res.data.data,
        dataShow:res.data.data.car
      })
    })
  }
  deleteOrder() {
    Modal.confirm({
      className: "no-icon",
      content: "确定取消订单吗",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        // const data = `change&../myApp/src/json/order.json&${JSON.stringify({
        //   orderCode: queryToJson(location.search.split("?")[1]).orderCode,
        //   status: "已取消"
        // })}`;
        // ajax("POST", "http://127.0.0.1:3000/", data);
        axios({
          method:'post',
          url: '/order/neworder',
          data:{_id:queryToJson(location.search.split("?")[1]).orderId,status:'已取消'},
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            auth_code: sessionStorage.code ? sessionStorage.code : null
          }
        })
        message.success("取消成功");
        this.props.history.push("/home");
      }
    });
  }

  render() {
    const { data, dataShow } = this.state;
    return (
      <div>
        <Steps current={2}>
          <Step title="确认订单" />
          <Step title="支付" />
          <Step title="订单成功" />
        </Steps>
        <div
          style={{
            border: "1px solid #e8e8e8",
            height: 150,
            padding: 20,
            marginBottom: 20,
            marginTop: 20
          }}
        >
          <div
            style={{
              borderBottom: "1px dashed #e8e8e8",
              paddingBottom: 10,
              marginBottom: 15
            }}
          >
            <span style={{ color: "#848484", fontSize: 30 }}>
              {data&&data.status}
            </span>
            <span style={{ marginLeft: 10 }}>订单总价：</span>
            <span style={{ fontSize: 25, color: "#00bc8d" }}>{data&&data.pay}</span>
          </div>
          <span>
            订单号：{data&&data.orderCode} | 租车人：{data&&data.name} | 租期：{data&&data.date}天
          </span>
        </div>
        <div style={{ border: "1px solid #e8e8e8" }}>
          <div
            style={{
              background: "#eaf6fd",
              height: 40,
              color: "#61a1df",
              borderBottom: "solid 1px #dbe4eb",
              lineHeight: "40px",
              paddingLeft: 15
            }}
          >
            基本信息
          </div>
        </div>
        <div
          style={{
            border: "1px solid #e8e8e8",
            borderTop: 0,
            position: "relative"
          }}
          className="car-detail"
        >
          <img src={dataShow&&dataShow.src} />
          <ul style={{ display: "inline-block", marginLeft: 50 }}>
            <li style={{ fontSize: 20, color: "#000" }}>{dataShow&&dataShow.name}</li>
            <li>{dataShow&&dataShow.describe}</li>
            <li>取车时间：{data&&data.takeDate}</li>
            <li>
              取车地点：{data&&data.takePlace}-{data&&data.takeShop}
            </li>
            <li>还车时间：{data&&data.returnDate}</li>
            <li>
              还车地点：{data&&data.returnPlace}-{data&&data.returnShop}
            </li>
          </ul>
          <Button
            style={{ position: "absolute", right: 40, bottom: 40 }}
            onClick={() => {
              this.setState({ visible: true });
            }}
            type="primary"
          >
            配置信息
          </Button>
          <Modal
            className="gs-modal-operate aaa"
            title="配置信息"
            visible={this.state.visible}
            onOk={() => {
              this.setState({ visible: false });
            }}
            onCancel={() => {
              this.setState({ visible: false });
            }}
            okText="确定"
            cancelText="取消"
          >
            <ul>
              <li>座位数：{dataShow&&dataShow.config.seat}</li>
              <li>车门数：{dataShow&&dataShow.config.door}</li>
              <li>燃料类型：{dataShow&&dataShow.config.fuel}</li>
              <li>变速箱类型：{dataShow&&dataShow.config.box}</li>
              <li>排量：{dataShow&&dataShow.config.disp}</li>
              <li>燃油标号：{dataShow&&dataShow.config.mark}</li>
              <li>驱动方式：{dataShow&&dataShow.config.drive}</li>
              <li>发动机进气形式：{dataShow&&dataShow.config.engine}</li>
              <li>天窗：{dataShow&&dataShow.config.window}</li>
              <li>油箱容量：{dataShow&&dataShow.config.tank}</li>
              <li>音箱：{dataShow&&dataShow.config.sound}</li>
              <li>座椅：{dataShow&&dataShow.config.seatType}</li>
              <li>倒车雷达：{dataShow&&dataShow.config.radar}</li>
              <li>气囊：{dataShow&&dataShow.config.air}</li>
              <li>DVD/CD：{dataShow&&dataShow.config.DVD}</li>
              <li>GPS导航：{dataShow&&dataShow.config.GPS}</li>
            </ul>
          </Modal>
        </div>
        <div
          style={{ border: "1px solid #e8e8e8", padding: 20, marginTop: 20 }}
        >
          <p style={{ fontSize: 25 }}>如何取车</p>
          <p>
            1.取车时,出示以下证件的原件：本人二代身份证、本人国内有效驾驶证正副本、本人一张信用及可用额度均不低于3000元的国内有效信用卡，所有证件有效期须至少超过当次租期的一个月以上。
          </p>
          <p>2.请您准时取车，超时取车，起租时间按预订取车时间起算。</p>
        </div>
        <div
          style={{ border: "1px solid #e8e8e8", padding: 20, marginTop: 20 }}
        >
          <p style={{ fontSize: 25 }}>退改规则</p>
          <p>
            {" "}
            a)取车时间距当前时间≥2个工作小时，请提前致电400 616
            6666：取车时间在门店的营业时间内，请提前2小时申请；取车时间在门店营业时间之外，请您尽早致电申请。
          </p>
          <p>
            {" "}
            b)取车时间距当前时间＜2个工作小时，不接受修改。驾照认证授权：取车前，您可通过神州租车APP、神州租车官网等网络渠道自行认证驾照，或到门店由工作人员协助认证驾照。您的驾照信息仅作为身份和驾驶资格认证。
          </p>
        </div>
        <div className="m-btns">
          <Button type="primary">
            <Link to="/home">返回首页</Link>
          </Button>
          {data&&data.status == "预订成功" || data&&data.status == "待处理" ? (
            <Button onClick={this.deleteOrder.bind(this)}>取消订单</Button>
          ) : null}
        </div>
      </div>
    );
  }
}

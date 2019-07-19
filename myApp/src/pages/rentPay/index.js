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
  Select,
  DatePicker,
  TimePicker
} from "antd";
import Data from "../../json/car_data.json";
import {
  queryToJson,
  createRandomId,
  getElementByRef,
  showError
} from "../../common/utils";
import ajax from "../../common/request";
import { timingSafeEqual } from "crypto";
import rules from "./rules";
import moment from "moment";
import axios from "axios";
import Img from '../../Images/payma.jpg'
import "./index.less";

const Step = Steps.Step;

export default class RentPay extends Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
      visible: false,
      payVisible: false,
      name: undefined,
      idCard: undefined,
      phone: undefined,
      takePlace: "北京",
      takeShop: "A店",
      takeDate: moment(),
      returnPlace: "北京",
      returnShop: "B店",
      returnDate: moment().subtract(-1, "days")
    };
  }

  componentWillMount() {
    this.getImg();
  }

  getImg() {
    let dataUrl = queryToJson(location.search.split("?")[1]);
    axios({
      method: "post",
      url: `/car/findbyid`,
      data: dataUrl
    }).then(res => {
      console.log(res.data.data.config.seat);
      this.setState({
        dataList: res.data.data
      });
    });
  }

  check() {
    const ruleKeys = Object.keys(rules);
    const ruleSize = ruleKeys.length;
    for (let i = 0; i < ruleSize; i++) {
      const key = ruleKeys[i];
      const rule = rules[key];
      if (rule && rule.required && rule.validator) {
        const data = this.state[key];
        const result = rule.validator.call(this, data, rule);
        if (result !== true) {
          const dom = getElementByRef(this[key], result.refType);
          showError(result.message, dom);
          return false;
        }
      }
    }
    return true;
  }

  submitOrder() {
    if (this.check()) {
      this.setState({ payVisible: true });
    }
    // const data = `add&../myApp/src/json/order.json&${JSON.stringify(params)}`;
    // ajax("POST", "http://127.0.0.1:3000/", data);
    // Modal.confirm({
    //   className: "no-cancel",
    //   content: "下单成功，请注意查收手机短信或邮箱信息",
    //   okText: "好的",
    //   onOk: () => {
    //     this.props.history.push(`/order?orderCode=${params.orderCode}`);
    //   }
    // });
  }

  payOrder() {
    console.log("11111");
    let params = {
      // id: queryToJson(location.search.split("?")[1]).id,
      // orderCode: createRandomId(),
      // userName: sessionStorage.userName,
      // carName: this.state.dataList[0].name,
      car_id: queryToJson(location.search.split("?")[1])._id,
      name: this.state.name,
      idCard: this.state.idCard,
      phone: this.state.phone,
      takePlace: this.state.takePlace,
      takeShop: this.state.takeShop,
      takeDate: moment(this.state.takeDate).format("YYYY-MM-DD"),
      returnPlace: this.state.returnPlace,
      returnShop: this.state.returnShop,
      returnDate: moment(this.state.returnDate).format("YYYY-MM-DD"),
      date: this.state.returnDate.diff(this.state.takeDate, "day"),
      pay:
        parseInt(
          this.state.dataList&&this.state.dataList.money *
            this.state.returnDate.diff(this.state.takeDate, "day")
        ) +
        parseInt(this.state.dataList&&this.state.dataList.serverMoney) +
        35
      // status:'待处理'
    };
    axios({
      method: "post",
      url: `/order/neworder`,
      data: params,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        auth_code: sessionStorage.code ? sessionStorage.code : null
      }
    }).then(res => {
      this.setState(
        {
          payVisible: false,
          orderId: res.data.data._id
        },
        () => {
          Modal.confirm({
            className: "no-cancel",
            content: "下单成功，请注意查收手机短信或邮箱信息",
            okText: "好的",
            onOk: () => {
              this.props.history.push(`/order?orderId=${this.state.orderId}`);
            }
          });
        }
      );
    });
  }

  render() {
    const {
      dataList,
      name,
      idCard,
      phone,
      takePlace,
      takeShop,
      takeDate,
      returnPlace,
      returnShop,
      returnDate,
      payVisible
    } = this.state;
    return (
      <div className="rent-pay">
        <Steps current={0}>
          <Step title="确认订单" />
          <Step title="支付" />
          <Step title="订单成功" />
        </Steps>
        {/* <Head ref={ref => (this.head = ref)}></Head> */}
        <div
          className="gs-header"
          style={{
            border: "1px solid #e8e8e8",
            padding: 20,
            marginBottom: 20,
            marginTop: 20
          }}
        >
          <Form.Item label="取车地点">
            <Select
              style={{ width: 200 }}
              value={takePlace}
              onChange={e => {
                this.setState({ takePlace: e });
              }}
            >
              <Option value="北京">北京</Option>
              <Option value="上海">上海</Option>
              <Option value="天津">天津</Option>
              <Option value="河北">河北</Option>
              <Option value="哈尔滨">哈尔滨</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              style={{ width: 200 }}
              placeholder="请选择取车门店"
              value={takeShop}
              onChange={e => {
                this.setState({ takeShop: e });
              }}
            >
              <Option value="A店">A店</Option>
              <Option value="B店">B店</Option>
              <Option value="C店">C店</Option>
              <Option value="D店">D店</Option>
            </Select>
          </Form.Item>
          <Form.Item label="取车时间" style={{ marginLeft: 100 }}>
            <DatePicker
              onChange={e => {
                // console.log(e)
                // console.log(moment(e).format("YYYY_MM_DD"))
                this.setState({ takeDate: e });
              }}
              value={takeDate}
              style={{ width: 200 }}
              placeholder="请选择"
            />
          </Form.Item>
          <TimePicker style={{ marginTop: 1 }} defaultValue={moment()} />

          <Form.Item label="还车地点">
            <Select
              style={{ width: 200 }}
              value={returnPlace}
              onChange={e => {
                this.setState({ returnPlace: e });
              }}
            >
              <Option value="北京">北京</Option>
              <Option value="上海">上海</Option>
              <Option value="天津">天津</Option>
              <Option value="河北">河北</Option>
              <Option value="哈尔滨">哈尔滨</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              style={{ width: 200 }}
              placeholder="请选择还车门店"
              value={returnShop}
              onChange={e => {
                this.setState({ returnShop: e });
              }}
            >
              <Option value="A店">A店</Option>
              <Option value="B店">B店</Option>
              <Option value="C店">C店</Option>
              <Option value="D店">D店</Option>
            </Select>
          </Form.Item>
          <Form.Item label="还车时间" style={{ marginLeft: 100 }}>
            <DatePicker
              onChange={e => {
                this.setState({ returnDate: e });
              }}
              value={returnDate}
              style={{ width: 200 }}
              placeholder="请选择"
            />
          </Form.Item>
          <TimePicker style={{ marginTop: 1 }} defaultValue={moment()} />
          {/* <Button type="primary" style={{ marginLeft: 20 }}>
          立即选车
        </Button> */}
        </div>
        <div
          style={{
            padding: 20,
            border: "1px solid #e8e8e8",
            marginTop: 10,
            display: "flex"
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <img
              src={dataList && dataList.src}
              style={{ width: 180, transform: "translate(20px,-40px)" }}
            />
            <div
              style={{
                display: "inline-block",
                transform: "translateX(100px)"
              }}
            >
              <p style={{ fontSize: "20px", color: "#000" }}>
                {dataList && dataList.name}
              </p>
              <p>{dataList && dataList.describe}</p>
              <Button
                type="primary"
                onClick={() => {
                  this.setState({
                    visible: true
                  });
                }}
              >
                查看配置信息
              </Button>
              <Modal
                className="gs-modal-operate aaa"
                title={`${dataList && dataList.name}配置信息`}
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
                  <li>座位数：{dataList.config && dataList.config.seat}</li>
                  <li>车门数：{dataList.config && dataList.config.door}</li>
                  <li>燃料类型：{dataList.config && dataList.config.fuel}</li>
                  <li>变速箱类型：{dataList.config && dataList.config.box}</li>
                  <li>排量：{dataList.config && dataList.config.disp}</li>
                  <li>燃油标号：{dataList.config && dataList.config.mark}</li>
                  <li>驱动方式：{dataList.config && dataList.config.drive}</li>
                  <li>
                    发动机进气形式：{dataList.config && dataList.config.engine}
                  </li>
                  <li>天窗：{dataList.config && dataList.config.window}</li>
                  <li>油箱容量：{dataList.config && dataList.config.tank}</li>
                  <li>音箱：{dataList.config && dataList.config.sound}</li>
                  <li>座椅：{dataList.config && dataList.config.seatType}</li>
                  <li>倒车雷达：{dataList.config && dataList.config.radar}</li>
                  <li>气囊：{dataList.config && dataList.config.air}</li>
                  <li>DVD/CD：{dataList.config && dataList.config.DVD}</li>
                  <li>GPS导航：{dataList.config && dataList.config.GPS}</li>
                </ul>
              </Modal>
            </div>
          </div>
        </div>
        <Alert
          message="温馨提示：还车结算时，如果有优惠券别忘了使用哦"
          banner
        />
        <div
          style={{ marginTop: 20, padding: 20, border: "1px solid #e8e8e8" }}
        >
          <Alert
            message="下单成功后，提醒信息会发送至您的手机，请注意查收"
            banner
            type="info"
          />
          <div style={{ borderBottom: "1px solid #e8e8e8", marginBottom: 15 }}>
            <h3 className="greenleft">租车人信息：</h3>
            <span>请认真填写以下信息，取车时需要现场核对！</span>
          </div>
          <Form.Item label="姓名" required>
            <Input
              ref={ref => (this.name = ref)}
              placeholder="请输入您的姓名"
              value={name}
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="证件号码" required>
            <Input
              ref={ref => (this.idCard = ref)}
              placeholder="请输入您的证件号"
              value={idCard}
              onChange={e => {
                this.setState({ idCard: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="手机号" required>
            <Input
              ref={ref => (this.phone = ref)}
              placeholder="请输入手机号"
              value={phone}
              onChange={e => {
                this.setState({ phone: e.target.value });
              }}
            />
          </Form.Item>
          <Alert
            message="下单成功后，提醒信息会发送至您的手机，请注意查收"
            banner
            type="info"
          />
          <Alert
            style={{ marginTop: 15 }}
            message="取车时,出示以下证件的原件：本人二代身份证、本人国内有效驾驶证正副本、本人一张信用及可用额度均不低于3000元的国内有效信用卡，所有证件有效期须至少超过当次租期的两个月以上。"
            banner
          />
          <h3 className="greenleft">费用明细：</h3>
          <ul className="jiesuan">
            <li>
              <span>车辆租赁费用</span>
              <span>
                ¥
                {dataList &&
                  dataList.money * returnDate.diff(takeDate, "day")}
              </span>
            </li>
            <li>
              <span>服务费</span>
              <span>¥{dataList && dataList.serverMoney}</span>
            </li>
            <li>
              <span>车辆整备费用</span>
              <span>35</span>
            </li>
            <li>
              <span>合计</span>
              <span>
                {parseInt(
                  dataList &&
                    dataList.money * returnDate.diff(takeDate, "day")
                ) +
                  parseInt(dataList && dataList.serverMoney) +
                  35}
              </span>
            </li>
          </ul>
          <div className="m-btns">
            <Button type="primary" onClick={this.submitOrder.bind(this)}>
              提交订单
            </Button>
            <Modal
              visible={payVisible}
              className="gs-modal-operate"
              title="支付"
              okText="确认支付"
              cancelText="取消"
              onCancel={() => {
                this.setState({ payVisible: false });
              }}
              onOk={() => {
                this.payOrder();
              }}
            >
              <img src={Img} style={{width:100,height:100}}></img>
              <div style={{display:'inline-block',marginLeft:80,fontSize:20}}>请用支付宝扫描二维码付款</div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

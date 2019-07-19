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
  Table,
  Select
} from "antd";
import Data from "../../json/car_data.json";
import User from "../../json/account.json";
import { queryToJson, createRandomId,getElementByRef,showError } from "../../common/utils";
import ajax from "../../common/request";
import moment from "moment";
import rules from "./rules";
import axios from 'axios'
import "./index.less";
const Option = Select.Option;

export default class Enter extends Component {
  constructor() {
    super();
    this.state = {
      authority: sessionStorage.manage,
      _id: queryToJson(location.search.split("?")[1]).id||undefined,
      xiang: undefined,
      pailiang: undefined,
      number: undefined,
      name: undefined,
      money: undefined,
      serverMoney: undefined,
      seat: undefined,
      door: undefined,
      fuel: undefined,
      box: undefined,
      disp: undefined,
      mark: undefined,
      drive: undefined,
      engine: undefined,
      window: undefined,
      tank: undefined,
      sound: undefined,
      seatType: undefined,
      radar: undefined,
      air: undefined,
      DVD: undefined,
      GPS: undefined,
      img: undefined
    };
  }

  componentDidMount() {
    const id = queryToJson(location.search.split("?")[1]).id;
    if (id) {
      axios({
        method:'post',
        url: "/car/findbyid",
        data:{_id:id}
      }).then(res=>{
        this.setState({
          xiang: res.data.data.describe.split("/")[0],
          pailiang: res.data.data.describe.split("/")[1],
          number: res.data.data.describe.split("/")[2],
          name: res.data.data.name,
          money: res.data.data.money,
          serverMoney: res.data.data.serverMoney,
          seat: res.data.data.config.seat,
          door: res.data.data.config.door,
          fuel: res.data.data.config.fuel,
          box: res.data.data.config.box,
          disp: res.data.data.config.disp,
          mark: res.data.data.config.mark,
          drive: res.data.data.config.drive,
          engine: res.data.data.config.engine,
          window: res.data.data.config.window,
          tank: res.data.data.config.tank,
          sound: res.data.data.config.sound,
          seatType: res.data.data.config.seatType,
          radar: res.data.data.config.radar,
          air: res.data.data.config.air,
          DVD: res.data.data.config.DVD,
          GPS: res.data.data.config.GPS,
          img: res.data.data.src
        });
      })
      // const data = Data.data.filter(item => {
      //   return item.id == id;
      // });
      // this.setState({
      //   id: id,
      //   xiang: data[0].describe.split("/")[0],
      //   pailiang: data[0].describe.split("/")[1],
      //   number: data[0].describe.split("/")[2],
      //   name: data[0].name,
      //   money: data[0].money,
      //   serverMoney: data[0].serverMoney,
      //   seat: data[0].config.seat,
      //   door: data[0].config.door,
      //   fuel: data[0].config.fuel,
      //   box: data[0].config.box,
      //   disp: data[0].config.disp,
      //   mark: data[0].config.mark,
      //   drive: data[0].config.drive,
      //   engine: data[0].config.engine,
      //   window: data[0].config.window,
      //   tank: data[0].config.tank,
      //   sound: data[0].config.sound,
      //   seatType: data[0].config.seatType,
      //   radar: data[0].config.radar,
      //   air: data[0].config.air,
      //   DVD: data[0].config.DVD,
      //   GPS: data[0].config.GPS,
      //   img: data[0].src
      // });
    }
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

  submit() {
    if (this.check()) {
      const {
        _id,
        xiang,
        pailiang,
        number,
        name,
        money,
        serverMoney,
        seat,
        door,
        fuel,
        box,
        disp,
        mark,
        drive,
        engine,
        window,
        tank,
        sound,
        seatType,
        radar,
        air,
        DVD,
        GPS,
        img
      } = this.state;
      let params = {
        _id: _id,
        src: img,
        name: name,
        describe: `${xiang}/${pailiang}/${number}`,
        money: money,
        serverMoney: serverMoney,
        config: {
          seat: seat,
          door: door,
          fuel: fuel,
          box: box,
          disp: disp,
          mark: mark,
          drive: drive,
          engine: engine,
          window: window,
          tank: tank,
          sound: sound,
          seatType: seatType,
          radar: radar,
          air: air,
          DVD: DVD,
          GPS: GPS
        }
      }
      axios({
        method:'post',
        url: "/car/newcar",
        data:params
      }).then(res=>{
        console.log(res.data.data)
        message.success("保存成功");
        this.props.history.push("/information");
      })
      // let data;
      // if (id) {
      //   data = `change&../myApp/src/json/car_data.json&${JSON.stringify(
      //     params
      //   )}`;
      // } else {
      //   data = `add&../myApp/src/json/car_data.json&${JSON.stringify(params)}`;
      // }
      // ajax("POST", "http://127.0.0.1:3000/", data);
      // message.success("保存成功");
      // this.props.history.push("/information");
    }
  }

  render() {
    const {
      xiang,
      pailiang,
      number,
      name,
      money,
      serverMoney,
      seat,
      door,
      fuel,
      box,
      disp,
      mark,
      drive,
      engine,
      window,
      tank,
      sound,
      seatType,
      radar,
      air,
      DVD,
      GPS,
      img,
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
      <div className="enter">
        <h3>录入车辆信息</h3>
        <h5>基本信息</h5>
        <div>
          <Form.Item label="车辆名称" required>
            <Input
              ref={ref => (this.name = ref)}
              placeholder="请输入车辆名称"
              value={name}
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="车身结构" required>
            <Select
              ref={ref => (this.xiang = ref)}
              placeholder="请选择"
              value={xiang}
              onSelect={e => {
                this.setState({ xiang: e });
              }}
            >
              <Option value="三厢">三厢</Option>
              <Option value="四厢">四厢</Option>
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="排量" required>
            <Select
              ref={ref => (this.pailiang = ref)}
              placeholder="请选择"
              value={pailiang}
              onSelect={e => {
                this.setState({ pailiang: e });
              }}
            >
              <Option value="1.4自动">1.4自动</Option>
              <Option value="1.5自动">1.5自动</Option>
              <Option value="1.6自动">1.6自动</Option>
              <Option value="1.8T自动">1.8T自动</Option>
              <Option value="2.0自动">2.0自动</Option>
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="乘坐人数" required>
            <Select
              ref={ref => (this.number = ref)}
              placeholder="请选择"
              value={number}
              onSelect={e => {
                this.setState({ number: e });
              }}
            >
              <Option value="乘坐2人">乘坐2人</Option>
              <Option value="乘坐3人">乘坐3人</Option>
              <Option value="乘坐4人">乘坐4人</Option>
              <Option value="乘坐5人">乘坐5人</Option>
              <Option value="乘坐6人">乘坐6人</Option>
              <Option value="乘坐7人">乘坐7人</Option>
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="日均价格" required>
            <Input
              ref={ref => (this.money = ref)}
              placeholder="请输入"
              value={money}
              onChange={e => {
                this.setState({ money: e.target.value });
              }}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="服务费" required>
            <Input
              ref={ref => (this.serverMoney = ref)}
              placeholder="请输入"
              value={serverMoney}
              onChange={e => {
                this.setState({ serverMoney: e.target.value });
              }}
            />
          </Form.Item>
        </div>
        <div className="config">
          <h5>配置信息</h5>
          <Form.Item label="座位数">
            <Input
              placeholder="请输入"
              value={seat}
              onChange={e => {
                this.setState({ seat: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="车门数">
            <Input
              placeholder="请输入"
              value={door}
              onChange={e => {
                this.setState({ door: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="燃料类型">
            <Input
              placeholder="请输入"
              value={fuel}
              onChange={e => {
                this.setState({ fuel: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="变速箱类型">
            <Input
              placeholder="请输入"
              value={box}
              onChange={e => {
                this.setState({ box: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="排量">
            <Input
              placeholder="请输入"
              value={disp}
              onChange={e => {
                this.setState({ disp: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="燃油标号">
            <Input
              placeholder="请输入"
              value={mark}
              onChange={e => {
                this.setState({ mark: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="驱动方式">
            <Input
              placeholder="请输入"
              value={drive}
              onChange={e => {
                this.setState({ drive: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="发动机进气形式">
            <Input
              placeholder="请输入"
              value={engine}
              onChange={e => {
                this.setState({ engine: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="天窗">
            <Input
              placeholder="请输入"
              value={window}
              onChange={e => {
                this.setState({ window: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="邮箱容量">
            <Input
              placeholder="请输入"
              value={tank}
              onChange={e => {
                this.setState({ tank: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="音箱数量">
            <Input
              placeholder="请输入"
              value={sound}
              onChange={e => {
                this.setState({ sound: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="座椅类型">
            <Input
              placeholder="请输入"
              value={seatType}
              onChange={e => {
                this.setState({ seatType: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="有无倒车雷达">
            <Input
              placeholder="请输入"
              value={radar}
              onChange={e => {
                this.setState({ radar: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="气囊数量">
            <Input
              placeholder="请输入"
              value={air}
              onChange={e => {
                this.setState({ air: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="有无DVD">
            <Input
              placeholder="请输入"
              value={DVD}
              onChange={e => {
                this.setState({ DVD: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="有无GPS">
            <Input
              placeholder="请输入"
              value={GPS}
              onChange={e => {
                this.setState({ GPS: e.target.value });
              }}
            />
          </Form.Item>
        </div>
        <h5>图片信息</h5>
        <div>
          <Form.Item label="图片地址">
            <Input
              placeholder="请输入"
              value={img}
              style={{ width: 500 }}
              onChange={e => {
                this.setState({ img: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="图片展示">
            {img ? <img src={img} /> : null}
          </Form.Item>
        </div>
        <div className="m-btns">
          <Button type="primary" onClick={this.submit.bind(this)}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

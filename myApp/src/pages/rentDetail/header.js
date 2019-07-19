import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Select,
  DatePicker,
  TimePicker
} from "antd";
import moment from "moment";

const Option = Select.Option;

export default class Head extends Component {
  constructor() {
    super();
    this.state = {
      takePlace: "北京",
      takeShop: "A店",
      takeDate: moment(),
      returnPlace: "北京",
      returnShop: "B店",
      returnDate: moment().subtract(-1,"days"),
    };
  }

  render() {
    const {
      takePlace,
      takeShop,
      takeDate,
      returnPlace,
      returnShop,
      returnDate,
    } = this.state;
    return (
      <div
      className="gs-header"
        style={{ border: "1px solid #e8e8e8", padding: 20, marginBottom: 20,marginTop:20 }}
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
        <TimePicker style={{ marginTop: 1 }} defaultValue={moment()}/>

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
        <TimePicker style={{ marginTop: 1 }} defaultValue={moment()}/>
        {/* <Button type="primary" style={{ marginLeft: 20 }}>
          立即选车
        </Button> */}
      </div>
    );
  }
}

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Layout,
  Breadcrumb,
  Menu,
  Icon,
  Tabs,
  DatePicker,
  Select,
  Carousel,
  Cascader,
  Button,
  Alert
} from "antd";
import carYear from "../../json/car_data.json";
import axios from 'axios'

export default class RentYear extends Component {
  constructor() {
    super();
    this.state = {
      showList: []
    };
  }

  componentWillMount() {
    this.getShowImg();
  }

  getShowImg() {
    axios({
      method: "get",
      url: "/car/findcar",
    }).then(res=>{
      this.setState({showList:res.data.data})
    })
  }

  render() {
    const { showList } = this.state;
    return (
      <div>
        {showList.map(item => {
          return (
            <div
              style={{
                border: "1px solid #e8e8e8",
                borderTop: 0,
                padding: 20,
                position: "relative"
              }}
            >
              <img src={item.src} style={{ width: 250, height: 150 }} />
              <div
                style={{
                  display: "inline-block",
                  marginLeft: 100,
                  marginTop: 50
                }}
              >
                <p style={{ fontSize: "20px", color: "#000" }}>{item.name}</p>
                <p>{item.describe}</p>
              </div>
              <div
                style={{
                  display: "inline-block",
                  position: "absolute",
                  right: 250,
                  top: 110,
                  color: "#00B890",
                  fontSize: "30px"
                }}
              >
                ¥{item.money * 28}
                <span style={{ fontSize: "12px", color: "#ccc" }}>/月</span>
              </div>
              <Button
                type="primary"
                style={{ position: "absolute", right: 50, top: 115 }}
              >
                <Link to={`/rentPay?_id=${item._id}`}>套餐预订</Link>
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}

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
import Img1 from "./image/img1.jpg";
import Img2 from "./image/img2.jpg";
import Img3 from "./image/img3.jpeg";
import Img4 from "./image/img4.jpeg";
import showData from "../../json/car_data.json";
import "./index.less";

export default class Home extends Component {
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
      let list=res.data.data.filter((item,index)=>{
        return index<6
      })
      this.setState({showList:list})
    })
    
  }

  render() {
    const { showList } = this.state;
    return (
      <div className="page-home">
        <Carousel autoplay>
          <div>
            <img src={Img1} style={{ width: "100%" }} />
          </div>
          <div>
            <img src={Img2} style={{ width: "100%" }} />
          </div>
          <div>
            <img src={Img3} style={{ width: "100%", height: 318 }} />
          </div>
          <div>
            <img src={Img4} style={{ width: "100%", height: 318 }} />
          </div>
        </Carousel>
        <div className="total">
          <ul>
            <li>
              <Icon type="car" theme="filled" />
              <div>100+车型</div>
            </li>
            <li>
              <Icon type="environment" theme="filled" />
              <div>1000+网点</div>
            </li>
            <li>
              <Icon type="safety-certificate" theme="filled" />
              <div>100%车险</div>
            </li>
            <li>
              <Icon type="dashboard" theme="filled" />
              <div>无限里程</div>
            </li>
          </ul>
        </div>
        <h3 className="greenleft">热门推荐：</h3>
        <div style={{ background: "#f0f2f5", padding: 10 }}>
          {showList.map((item, key) => {
            return (
              <div
                style={{
                  backgroundColor: "#fff",
                  width: 364,
                  padding: 30,
                  display: "inline-block",
                  marginRight: 10,
                  marginBottom: 10
                }}
                key={key}
              >
                <p style={{ fontSize: "16px", color: "#000000" }}>
                  {item.name}
                </p>
                <p>{item.describe}</p>
                <Link to="/rentDetail">
                  <a className="out-link">
                    <div className="out-img">
                      <img src={item.src} alt="最新上架车源信息~" />
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

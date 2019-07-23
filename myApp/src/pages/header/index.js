import React, { Component } from "react";
import { Icon, Modal } from "antd";
import ReactDOM from "react-dom";
import { Route, Link, IndexRoute } from "react-router-dom";
import "./index.less";
import logo from "./logo.png";
import app from "./app3.png";
import Img_pearl from "./pearl.png";
import Img_phone from "./phone.png";
import Img_custom from "./custom.png";
import Img_kefu from "./kefu.png";

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      userName: {}
    };
  }

  render() {
    return (
      <div className="h-menuitem user-info fr">
        {this.state.userName?this.state.userName.name:'未设置'} &nbsp;
        <Icon type="down" />
        <div className="popdown">
          <div className="popdown-arrow" />
          <div className="popdown-inner">
            <Link to="/self">个人中心</Link>
            {/* <a
              target="_blank"
              href="https://page.lianjia.com/subject/19368.html"
            >
              使用手册
            </a> */}
            <a
              href="/"
              onClick={() => {
                sessionStorage.removeItem("userName");
                sessionStorage.removeItem("code");
              }}
            >
              退出
            </a>
          </div>
        </div>
      </div>
    );
  }
}

class AdminInfo extends Component {
  render() {
    return (
      <span className="admin-info">
        <a href="/">
          <span className="admin-title">第七战队-首席体验官</span>
        </a>
      </span>
    );
  }
}

class PearlScore extends Component {
  constructor(props) {
    super(props);
    this.isHidden = true;
  }
  render() {
    return (
      <span className="h-menuitem user-pearl fr">
        <em>
          <img className="h-menu-icon" src={Img_pearl} width="20" height="18" />
          {`珍珠币:`}
          &nbsp;
          <Icon type="down" />
        </em>
        {/* <Link className="recharge-btn">
          充值
          <img src={Img_gift} width="40" height="16" className="gift-icon" />
        </Link> */}
        <div className="popdown">
          <div className="popdown-arrow" />
          <div className="popdown-inner">
            <div>
              <h3>珍珠币总额</h3>
              <p>
                <span>现金珍珠币:</span>
                <span>奖励珍珠币:</span>
              </p>
              {/* <Link className="recharge-btn" to="">
                立即充值
              </Link> */}
            </div>
            <ul>
              <li>
                <Link className="link" to="/manage/my_account">
                  我的账户
                </Link>
              </li>
              <li>
                <Link className="link" to="/manage/my_order">
                  我的订单
                </Link>
              </li>
              <li>
                <Link className="buy link" to="/manage/exhibition_index">
                  购买展位
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </span>
    );
  }
}

class AppDownload extends Component {
  render() {
    return (
      <span className="h-menuitem user-app fr">
        <em>
          <img className="h-menu-icon" src={Img_phone} width="12" height="21" />
          下载广行APP
          <div className="popdown">
            <div className="popdown-arrow" />
            <div className="popdown-inner">
              <img
                className="appbanner"
                src={app}
                alt="matrix"
                width="170"
                height="302"
              />
            </div>
          </div>
        </em>
      </span>
    );
  }
}

class CustomService extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }
  showModal() {
    this.setState({ visible: true });
  }
  closeModal() {
    this.setState({ visible: false });
  }
  render() {
    return (
      <span className="custom-modal">
        <span
          className="h-menuitem user-app fr"
          onClick={this.showModal.bind(this)}
        >
          <img
            src={Img_kefu}
            style={{ width: 19, height: 20, marginRight: 10 }}
          />
          官方客服咨询
        </span>
        <Modal
          visible={this.state.visible}
          footer={null}
          onCancel={this.closeModal.bind(this)}
          bodyStyle={{ padding: 0, position: "relative" }}
          width="628px"
        >
          <img
            src={Img_custom}
            style={{ width: 278, height: 323, margin: "63px 0 0 20px" }}
          />
          <div style={{ position: "absolute", right: 47, top: 91, width: 246 }}>
            <p
              style={{
                fontSize: 18,
                color: "#333333",
                letterSpacing: 0,
                fontWeight: 700
              }}
            >
              官方客服
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#333333",
                letterSpacing: 0,
                margin: "5px 0 30px 0"
              }}
            >
              用户可通过拨打咨询专线，将由资深客服为您答疑解惑{" "}
              <a
                // href="https://page.lianjia.com/subject/48993.html"
                target="_blank"
              >
                {" "}
                查看详情
              </a>
            </p>
            <p
              style={{
                fontSize: 18,
                color: "#333333",
                letterSpacing: 0,
                fontWeight: 700
              }}
            >
              客服热线1：<span style={{ color: "#00B890" }}>10106188 转 0</span>
            </p>
            <p
              style={{
                fontSize: 18,
                color: "#333333",
                letterSpacing: 0,
                fontWeight: 700,
                margin: "10px 0 30px 0"
              }}
            >
              客服热线2：<span style={{ color: "#00B890" }}>10109666 转 0</span>
            </p>
            <p style={{ color: "#333333", fontSize: 14 }}>
              服务时间： 09:00-21:00(春节假期除外)
            </p>
          </div>
        </Modal>
      </span>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="header-wrap clearfix">
        <AdminInfo />
        <UserInfo />
        {/* <PearlScore /> */}
        {/* <AppDownload /> */}
        <CustomService />
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import Head from "../header";
import Home from "../home";

import "./index.less";
import RentDetail from "../rentDetail";
import RentPay from "../rentPay";
import Order from "../order";
import OrderManage from "../orderManage";
import MyOrder from "../myOrder";
import UserManage from "../userManage";
import SuperManage from "../superManage";
import Information from "../information";
import Enter from "../enter";
import Self from "../self";
import MoneyManage from "../moneyManage";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Nav extends Component {
  render() {
    return (
      <Router>
        <Layout className="page-home">
          <Head />
          <Layout>
            <Sider>
              <Menu mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                  <Link to="/home">首页</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/rentDetail">租车类型</Link>
                </Menu.Item>
                <SubMenu title="订单信息管理">
                  <Menu.Item key="3">
                    <Link to="/myOrder">我的订单</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    {" "}
                    <Link to="/orderManage">超级管理员入口</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu title="系统用户管理">
                  <Menu.Item key="5">
                    <Link to="/userManage">用户账号管理</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/superManage">超管账号管理</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu title="车辆信息管理">
                  <Menu.Item>
                    <Link to="/information">车辆信息展示</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/enter">录入车辆信息</Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="6">
                  <Link to="/moneyManage">租赁财务管理</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout
              style={{ padding: "0 24px 24px", marginLeft: 200, marginTop: 80 }}
            >
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 1000
                }}
              >
                <Route>
                  <div>
                    <Route path="/home" component={Home} />
                    <Route path="/rentDetail" component={RentDetail} />
                    <Route path="/rentPay" component={RentPay} />
                    <Route path="/order" component={Order} />
                    <Route path="/orderManage" component={OrderManage} />
                    <Route path="/myOrder" component={MyOrder} />
                    <Route path="/userManage" component={UserManage} />
                    <Route path="/superManage" component={SuperManage} />
                    <Route path="/information" component={Information} />
                    <Route path="/enter" component={Enter} />
                    <Route path="/self" component={Self} />
                    <Route path="/moneyManage" component={MoneyManage} />
                  </div>
                </Route>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

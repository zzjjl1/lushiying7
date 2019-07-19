import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute
} from "react-router-dom";
import { Button } from "antd";
import Login from "../login";
import Nav from "../nav";
import RentDetail from "../rentDetail";

export default class Routers extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Nav} />
          <Route path="/rentDetail" component={Nav} />
          <Route path="/rentPay" component={Nav} />
          <Route path="/order" component={Nav} />
          <Route path="/orderManage" component={Nav} />
          <Route path="/myOrder" component={Nav} />
          <Route path="/userManage" component={Nav} />
          <Route path="/superManage" component={Nav} />
          <Route path="/information" component={Nav} />
          <Route path="/enter" component={Nav} />
          <Route path="/self" component={Nav} />
          <Route path="/moneyManage" component={Nav} />
        </div>
      </Router>
    );
  }
}

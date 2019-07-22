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
import Assignment from "../assignment";
import Detail from "../detail";

export default class Routers extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Nav} />
          <Route path="/assignment/:id" component={Nav} />
          <Route path="/detail" component={Nav} />
        </div>
      </Router>
    );
  }
}

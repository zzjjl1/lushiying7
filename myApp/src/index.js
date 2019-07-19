// import 'react-devtools'
import "./common/style/index.less";
import './less/index.less'
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Routers from "./pages/routers"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Head from './pages/header'
import Nav from './pages/nav'
import  "./common/style/index.less"


ReactDOM.render(
  <div>
    <Routers></Routers>
  </div>
    
  ,
  document.getElementById("root")
);

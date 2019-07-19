import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute
} from "react-router-dom";
import { Button, Card, Input, message } from "antd";
import axios from "axios";
import "./index.less";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      res: undefined,
      tabKey: "login",
      userList: undefined,
      userName: undefined,
      passWord: undefined,
      registeName: undefined,
      registeWord: undefined,
      againWord: undefined,
      name: undefined,
      phone: undefined
    };
    this.tabList = [
      {
        key: "login",
        tab: "登录"
      },
      {
        key: "registe",
        tab: "注册"
      }
    ];

    this.contentList = {
      login: (
        <div>
          <Input
            placeholder="账号"
            onChange={e => {
              this.setState({ userName: e.target.value });
            }}
          />
          <Input
            placeholder="密码"
            type="passWord"
            onChange={e => {
              this.setState({ passWord: e.target.value });
            }}
          />
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={this.login.bind(this)}
          >
            登录
          </Button>
        </div>
      ),
      registe: (
        <div>
          <Input
            placeholder="账号"
            onChange={e => {
              this.setState({ registeName: e.target.value });
            }}
          />
          <Input
            placeholder="密码"
            type="passWord"
            onChange={e => {
              this.setState({ registeWord: e.target.value });
            }}
          />
          <Input
            placeholder="再次确认密码"
            type="passWord"
            onChange={e => {
              this.setState({ againWord: e.target.value });
            }}
          />
          <Input
            placeholder="昵称"
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <Input
            placeholder="手机号"
            onChange={e => {
              this.setState({ phone: e.target.value });
            }}
          />
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={this.registe.bind(this)}
          >
            注册
          </Button>
        </div>
      )
    };
  }

  componentDidMount() {
  }

  login() {
    // axios({
    //     method: "get",
    //     url: "/game/demo/hello",
    //     data:{}
    //   }).then(res => {
    //     if (res.data.ok) {
    //       console.log('11111')
    //     } else {
    //       message.error(res.data.message);
    //     }
    //   });
    this.props.history.push("/home");
    // const userInformation = this.state.userList.filter(item => {
    //   return item.userName == this.state.userName;
    // });
    // if (userInformation.length == 0) {
    //   message.error("用户名不存在！");
    // } else {
    //   if (userInformation[0].passWord == this.state.passWord) {
    //     sessionStorage.setItem("userName", userInformation[0].userName);
    //     this.props.history.push("/home");
    //   } else {
    //     message.error("密码错误！");
    //   }
    // }
    // const data = {
    //   userName: this.state.userName,
    //   passWord: this.state.passWord
    // };
    // var instance = axios.create({
    //   baseURL: "/",
    //   timeout: 1000
    //   // headers: sessionStorage.code?{'auth_code': sessionStorage.code}:null
    // });
    // axios({
    //   method: "post",
    //   url: "/user/login",
    //   data
    // }).then(res => {
    //   if (res.data.ok) {
    //     sessionStorage.setItem("userName", this.state.userName);
    //     sessionStorage.setItem("code", res.data.data.code);
    //     sessionStorage.setItem("manage", res.data.data.user.manage?true:false);
    //     this.props.history.push("/home");
    //   } else {
    //     message.error(res.data.message);
    //   }
    // });
  }
  registe() {
    const {
      registeName,
      registeWord,
      againWord,
      name,
      phone,
      userList
    } = this.state;
    if (registeName && registeWord && againWord && name && phone) {
      const arr = userList.filter(item => {
        return item.userName == registeName;
      });
      const arr2 = userList.filter(item => {
        return item.name == name;
      });
      if (arr.length != 0) {
        message.error("用户名已存在，请重新输入");
      } else if (registeWord != againWord) {
        message.error("两次密码输入不相同，请重新输入");
      } else if (arr2.length != 0) {
        message.error("昵称已存在，请重新输入");
      } else {
        let data = {
          userName: registeName,
          passWord: registeWord,
          name: name,
          phone: phone
        };
        axios({
          method: "post",
          url: "/user/registe",
          data
        })
        .then(res=>{
          if(res.data.ok){
            message.success("注册成功")
          }else{
            message.error(res.data.message)
          }
        })
        // ajax("POST","/user/registe",data)
        // const data = `add&../myApp/src/json/account.json&${JSON.stringify({
        //   userName: registeName,
        //   passWord: registeWord,
        //   name:name,
        //   phone:phone
        // })}`;
        // ajax("POST", "http://127.0.0.1:3000/", data);
        // message.success("注册成功");
      }
    } else {
      message.error("请将信息全部填写");
    }
  }

  render() {
    return (
      <div className="loginIn">
        <div className="header">
          {/* <p>广行</p> */}
          <p>车辆租赁管理系统</p>
        </div>
        <Card
          style={{
            width: 300,
            borderRadius: 4,
            position: "absolute",
            top: 150,
            right: 150
          }}
          tabList={this.tabList}
          activeTabKey={this.state.tabKey}
          onTabChange={key => {
            this.setState({ tabKey: key });
          }}
        >
          {this.contentList[this.state.tabKey]}
        </Card>
      </div>
    );
  }
}

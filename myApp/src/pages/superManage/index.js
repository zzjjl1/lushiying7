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
  Table
} from "antd";
import Data from "../../json/account.json";
import { queryToJson } from "../../common/utils";
import ajax from "../../common/request";
import axios from "axios";
import moment from "moment";
import "./index.less";
const columns = [
  {
    title: "用户名",
    dataIndex: "userName"
  },
  {
    title: "密码",
    dataIndex: "passWord"
  },
  {
    title: "昵称",
    dataIndex: "name"
  },
  {
    title: "手机号",
    dataIndex: "phone"
  },
  {
    title: "操作",
    dataIndex: "caozuo"
  }
];

export default class SuperManage extends Component {
  constructor() {
    super();
    this.state = {
      authority: sessionStorage.manage,
      dataSource: [],
      visible: false,
      registeName: undefined,
      registeWord: undefined,
      againWord: undefined,
      name: undefined,
      phone: undefined
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "/user/findsuperuser"
    }).then(res => {
      console.log(res.data.data);
      let dataSource = res.data.data;
      dataSource.map(item => {
        item.caozuo = (
          <a onClick={this.delete.bind(this, item._id)}>删除该账号</a>
        );
      });
      this.setState({ dataSource });
    });
    // const dataSource = Data.data.filter(item => {
    //   return item.manage;
    // });
    // dataSource.map(item => {
    //   item.caozuo = (
    //     <a onClick={this.delete.bind(this, item.userName)}>删除该账号</a>
    //   );
    // });
    // let authority;
    // const list = Data.data.filter(item => {
    //   return item.userName == sessionStorage.userName;
    // });
    // if (list.length > 0) {
    //   authority = list[0].manage;
    // }
    // this.setState({
    //   authority,
    //   dataSource: dataSource
    // });
  }

  delete(userName) {
    Modal.confirm({
      className: "no-icon",
      title: "温馨提示",
      content: "确定要删除吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        // const data = `delete&../myApp/src/json/account.json&${JSON.stringify(
        //   userName
        // )}`;
        // ajax("POST", "http://127.0.0.1:3000/", data);
        axios({
          method: "post",
          url: "/user/deleteuser",
          data: { _id: userName }
        }).then(res => {
          message.success("删除成功");
          axios({
            method: "get",
            url: "/user/finduser"
          }).then(res => {
            let dataSource = res.data.data;
            dataSource.map(item => {
              item.caozuo = (
                <a onClick={this.delete.bind(this, item._id)}>删除该账号</a>
              );
            });
            this.setState({
              dataSource
            });
          });
        });
      }
    });
  }

  add() {
    const { registeName, registeWord, againWord, name, phone } = this.state;
    let data = {
      userName: registeName,
      passWord: registeWord,
      name: name,
      phone: phone,
      manage: "true"
    };
    axios({
      method: "post",
      url: "/user/registe",
      data
    }).then(res => {
      if (res.data.ok) {
        message.success("添加成功");
        this.setState({
          visible:false
        })
        axios({
          method: "get",
          url: "/user/findsuperuser"
        }).then(res => {
          let dataSource = res.data.data;
          dataSource.map(item => {
            item.caozuo = (
              <a onClick={this.delete.bind(this, item._id)}>删除该账号</a>
            );
          });
          this.setState({
            dataSource
          });
        });
      } else {
        message.error(res.data.message);
      }
    });
    //   console.log('111')
    // const { registeName, registeWord, againWord,name,phone} = this.state;
    // if (registeName && registeWord && againWord&&name&&phone) {
    //   const arr = Data.data.filter(item => {
    //     return item.userName == registeName;
    //   });
    //   const arr2 = Data.data.filter(item=>{
    //     return item.name == name
    //   })
    //   if (arr.length != 0) {
    //     message.error("用户名已存在，请重新输入");
    //   } else if (registeWord != againWord) {
    //     message.error("两次密码输入不相同，请重新输入");
    //   } else if(arr2.length !=0){
    //     message.error("昵称已存在，请重新输入");
    //   }else {
    //     const data = `add&../myApp/src/json/account.json&${JSON.stringify({
    //       userName: registeName,
    //       passWord: registeWord,
    //       name:name,
    //       phone:phone,
    //       manage:"true"
    //     })}`;
    //     ajax("POST", "http://127.0.0.1:3000/", data);
    //     message.success("添加成功");
    //   }
    // } else {
    //   message.error("请将信息全部填写");
    // }
  }

  render() {
    const { dataSource, visible, authority } = this.state;
    if (authority=='false') {
      return (
        <div className="component-empty component-nopermission">
          <div className="bgimg" />
          <p>无权限</p>
        </div>
      );
    }
    return (
      <div className="superManage">
        <h3>超管账号信息</h3>
        <Button
          onClick={() => {
            this.setState({ visible: true });
          }}
          type="primary"
          style={{
            marginBottom: 10,
            position: "absolute",
            right: 40,
            top: 180
          }}
        >
          添加超管账号
        </Button>
        <Modal
          className="gs-modal-operate userManage"
          title="添加账号"
          width={300}
          visible={visible}
          okText="添加"
          cancelText="取消"
          onCancel={() => {
            this.setState({ visible: false });
          }}
          onOk={this.add.bind(this)}
        >
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
          </div>
        </Modal>
        <Table
          columns={columns}
          dataSource={dataSource}
          style={{ marginTop: 70 }}
        />
      </div>
    );
  }
}

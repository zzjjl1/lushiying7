import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Select,
  Button,
  DatePicker,
  Input,
  Table,
  Breadcrumb,
  Tooltip,
  Radio,
  Upload,
  Icon,
  Modal,
  message
} from "antd";
import Data from "../../json/order.json";
import DataShow from "../../json/car_data.json";
import User from "../../json/account.json";
import ajax from "../../common/request";
import axios from "axios";
import moment from "moment";
import "./index.less";

export default class Self extends Component {
  constructor() {
    super();
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      userList: {},
      trueName: undefined,
      idCard: undefined,
      phone: undefined,
      email: undefined,
      lastPassWord: undefined,
      newPassWord: undefined,
      changeVisible: false
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "/user/getuser",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        auth_code: sessionStorage.code ? sessionStorage.code : null
      }
    }).then(res => {
      console.log(res.data.data);
      this.setState({
        _id: res.data.data._id,
        phone: res.data.data.phone,
        trueName: res.data.data.phone,
        idCard: res.data.data.idCard,
        email: res.data.data.email
      });
    });
  }

  save() {
    const { phone, email, _id } = this.state;
    axios({
      method: "post",
      url: "/user/registe",
      data: {
        _id: _id,
        phone: phone,
        email: email
      }
    }).then(res => {
      message.success("保存成功");
      this.props.history.push("/home");
    });
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) =>
    this.setState({ fileList }, () => {
      console.log(this.state.fileList);
    });

  change() {
    const { lastPassWord, newPassWord, _id } = this.state;
    axios({
      method: "post",
      url: "user/getpassword",
      data: { _id: _id, lastPassWord: lastPassWord, newPassWord: newPassWord }
    }).then(res => {
      console.log(res.data.data)
      if(res.data.ok==true){
        message.success('更改成功')
        this.setState({changeVisible:false})
      }else{
        message.error(res.data.message)
      }
    });
  }

  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      userList,
      trueName,
      idCard,
      phone,
      email,
      lastPassWord,
      newPassWord
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传头像</div>
      </div>
    );
    return (
      <div className="self">
        <h3>我的信息</h3>
        <div>
          {/* <Form.Item label="头像" className="aaa">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item> */}
          <Form.Item label="姓名">
            <Input
              value={trueName}
              disabled={trueName ? true : false}
              onChange={e => {
                this.setState({ trueName: e.target.value });
              }}
            />
            <span style={{ marginLeft: 20, fontSize: 12 }}>
              真实姓名，方便租车时核对身份
            </span>
          </Form.Item>
          <Form.Item label="身份证">
            <Input
              value={idCard}
              disabled={idCard ? true : false}
              onChange={e => {
                this.setState({ idCard: e.target.value });
              }}
            />
            <span style={{ marginLeft: 20, fontSize: 12 }}>
              如需修改，请致电客服电话咨询
            </span>
          </Form.Item>
          <Form.Item label="手机号">
            <Input
              value={phone}
              onChange={e => {
                this.setState({ phone: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label="电子邮箱">
            <Input
              value={email}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            style={{ marginLeft: 150 }}
            size="small"
            onClick={() => {
              this.setState({ changeVisible: true });
            }}
          >
            修改登陆密码
          </Button>
          <Modal
            className="gs-modal-operate"
            title="修改密码"
            visible={this.state.changeVisible}
            okText="修改"
            cancelText="取消"
            onOk={this.change.bind(this)}
            onCancel={()=>{
              this.setState({changeVisible:false})
            }}
          >
            <Form.Item label="原始密码">
              <Input
                value={lastPassWord}
                onChange={e => {
                  this.setState({ lastPassWord: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item label="新密码">
              <Input
                value={newPassWord}
                onChange={e => {
                  this.setState({ newPassWord: e.target.value });
                }}
              />
            </Form.Item>
          </Modal>
        </div>
        <div className="m-btns">
          <Button type="primary" onClick={this.save.bind(this)}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}

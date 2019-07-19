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
  Modal,
  message
} from "antd";
import Data from "../../json/order.json";
import DataShow from "../../json/car_data.json";
import User from "../../json/account.json";
import ajax from "../../common/request";
import axios from 'axios'
import moment from "moment";
import "./index.less";

const columns = [
  {
    title: "车型",
    dataIndex: "carName",
    width: 180
  },
  {
    title: "订单编号",
    dataIndex: "order",
    width: 180
  },
  {
    title: "订单状态",
    dataIndex: "status",
    width: 180
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: 160
  },
  {
    title: "身份证号",
    dataIndex: "idCard",

    width: 180
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    width: 120
  },
  {
    title: "取车时间",
    dataIndex: "takeDate",
    width: 160
  },
  {
    title: "还车时间",
    dataIndex: "returnDate",
    width: 160
  },
  {
    title: "取车地点",
    dataIndex: "takePlace",
    width: 160
  },
  {
    title: "还车地点",
    dataIndex: "returnPlace",
    width: 160
  },
  {
    title: "租期",
    dataIndex: "date",
    width: 160
  },
  {
    title: "支付",
    dataIndex: "pay",
    width: 160
  },
  {
    title: "操作",
    dataIndex: "caozuo"
  }
];

export default class OrderManage extends Component {
  constructor() {
    super();
    this.state = {
      authority: sessionStorage.manage,
      orderList: [],
      carList: [],
      dataSource: [],
      countPay: undefined,
      name: undefined,
      userName: undefined,
      phone: undefined,
      orderCode: undefined,
      carName: undefined
    };
  }
  componentDidMount() {
    axios({
      method: "get",
      url: `/order/findallorder`,
    }).then(res=>{
      console.log(res.data.data)
      this.setState({
        orderList:res.data.data,
        dataSource:res.data.data.map((item,index)=>{
          return {
            key: index,
            carName: item.car.name,
            order: item._id,
            status: item.status,
            name: item.name,
            idCard: item.idCard,
            phone: item.phone,
            takeDate: item.takeDate,
            returnDate: item.returnDate,
            takePlace: item.takePlace,
            returnPlace: item.returnPlace,
            date: `${item.date}天`,
            pay: `${item.pay}元`,
            caozuo: (
              <span>
                {item.status == "待处理" ? (
                  <a onClick={this.change.bind(this, item._id)}>
                    接受订单 |{" "}
                  </a>
                ) : null}
                <a onClick={this.delete.bind(this, item._id)}>删除</a>
              </span>
            )
          };
        })
      })
    })
    // let countPay = 0;
    // let authority = undefined;
    // for (var i = 0; i < Data.data.length; i++) {
    //   countPay += Data.data[i].pay;
    // }
    // const list = User.data.filter(item => {
    //   return item.userName == sessionStorage.userName;
    // });
    // if (list.length > 0) {
    //   authority = list[0].manage;
    // }
    // this.setState({
    //   authority,
    //   orderList: Data.data,
    //   carList: DataShow.data,
    //   dataSource: Data.data.map((item, index) => {
    //     return {
    //       key: index,
    //       carName: item.carName,
    //       order: item.orderCode,
    //       status: item.status,
    //       name: item.name,
    //       idCard: item.idCard,
    //       phone: item.phone,
    //       takeDate: item.takeDate,
    //       returnDate: item.returnDate,
    //       takePlace: item.takePlace,
    //       returnPlace: item.returnPlace,
    //       date: `${item.date}天`,
    //       pay: `${item.pay}元`,
    //       caozuo: (
    //         <span>
    //           {item.status == "待处理" ? (
    //             <a onClick={this.change.bind(this, item.orderCode)}>
    //               接受订单 |{" "}
    //             </a>
    //           ) : null}
    //           <a onClick={this.delete.bind(this, item.orderCode)}>删除</a>
    //         </span>
    //       )
    //     };
    //   }),
    //   countPay
    // });
  }

  delete(orderCode) {
    Modal.confirm({
      className: "no-icon",
      title: "温馨提示",
      content: "确定要删除吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        // const data = `delete&../myApp/src/json/order.json&${JSON.stringify(
        //   orderCode
        // )}`;
        // ajax("POST", "http://127.0.0.1:3000/", data);
        axios({
          method: "post",
          url: `order/delete`,
          data: {_id:orderCode},
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            auth_code: sessionStorage.code ? sessionStorage.code : null
          }
        }).then(res=>{
          message.success("删除成功");
          axios({
            method: "get",
            url: `/order/findallorder`,
          }).then(res=>{
            console.log(res.data.data)
            this.setState({
              orderList:res.data.data,
              dataSource:res.data.data.map((item,index)=>{
                return {
                  key: index,
                  carName: item.car.name,
                  order: item._id,
                  status: item.status,
                  name: item.name,
                  idCard: item.idCard,
                  phone: item.phone,
                  takeDate: item.takeDate,
                  returnDate: item.returnDate,
                  takePlace: item.takePlace,
                  returnPlace: item.returnPlace,
                  date: `${item.date}天`,
                  pay: `${item.pay}元`,
                  caozuo: (
                    <span>
                      {item.status == "待处理" ? (
                        <a onClick={this.change.bind(this, item._id)}>
                          接受订单 |{" "}
                        </a>
                      ) : null}
                      <a onClick={this.delete.bind(this, item._id)}>删除</a>
                    </span>
                  )
                };
              })
            })
          })
        })
        
      }
    });
  }

  change(orderCode) {
    // const data = `change&../myApp/src/json/order.json&${JSON.stringify({
    //   orderCode: orderCode,
    //   status: "预订成功"
    // })}`;
    // ajax("POST", "http://127.0.0.1:3000/", data);
    axios({
      method: "post",
      url: `/order/neworder`,
      data: {_id:orderCode,status:'预订成功'},
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        auth_code: sessionStorage.code ? sessionStorage.code : null
      }
    }).then(res=>{
      message.success("成功接单");
      axios({
        method: "get",
        url: `/order/findallorder`,
      }).then(res=>{
        console.log(res.data.data)
        this.setState({
          orderList:res.data.data,
          dataSource:res.data.data.map((item,index)=>{
            return {
              key: index,
              carName: item.car.name,
              order: item._id,
              status: item.status,
              name: item.name,
              idCard: item.idCard,
              phone: item.phone,
              takeDate: item.takeDate,
              returnDate: item.returnDate,
              takePlace: item.takePlace,
              returnPlace: item.returnPlace,
              date: `${item.date}天`,
              pay: `${item.pay}元`,
              caozuo: (
                <span>
                  {item.status == "待处理" ? (
                    <a onClick={this.change.bind(this, item._id)}>
                      接受订单 |{" "}
                    </a>
                  ) : null}
                  <a onClick={this.delete.bind(this, item._id)}>删除</a>
                </span>
              )
            };
          })
        })
      })
    })
    
  }

    search(){
      const { phone, name, orderCode, carName } = this.state;
      const data={
        name:name,
        phone:phone,
        _id:orderCode,
        carName:carName
      }
      axios({
        method: "post",
        url: `/order/find`,
        data: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          auth_code: sessionStorage.code ? sessionStorage.code : null
        }
      }).then(res=>{
        console.log(res.data.data)
        this.setState({
          orderList:res.data.data,
          dataSource:res.data.data.map((item,index)=>{
            return {
              key: index,
              carName: item.car.name,
              order: item._id,
              status: item.status,
              name: item.name,
              idCard: item.idCard,
              phone: item.phone,
              takeDate: item.takeDate,
              returnDate: item.returnDate,
              takePlace: item.takePlace,
              returnPlace: item.returnPlace,
              date: `${item.date}天`,
              pay: `${item.pay}元`,
              caozuo: (
                <span>
                  {item.status == "待处理" ? (
                    <a onClick={this.change.bind(this, item._id)}>
                      接受订单 |{" "}
                    </a>
                  ) : null}
                  <a onClick={this.delete.bind(this, item._id)}>删除</a>
                </span>
              )
            };
          })
        })
      })
    }
  // search() {
  //   const { name, phone, userName, orderCode, carName } = this.state;
  //   if (name || phone || userName || orderCode || carName) {
  //     if (userName != undefined) {
  //       let arr = Data.data.filter(item => {
  //         return item.userName == userName;
  //       });
  //       this.setState({
  //         dataSource: arr.map((item, index) => {
  //           return {
  //             key: index,
  //             carName: item.carName,
  //             order: item.orderCode,
  //             status:item.status,
  //             name: item.name,
  //             idCard: item.idCard,
  //             phone: item.phone,
  //             takeDate: item.takeDate,
  //             returnDate: item.returnDate,
  //             takePlace: item.takePlace,
  //             returnPlace: item.returnPlace,
  //             date: `${item.date}天`,
  //             pay: `${item.pay}元`
  //           };
  //         })
  //       });
  //     }
  //     if (name != undefined) {
  //       let arr = Data.data.filter(item => {
  //         return item.name == name;
  //       });
  //       this.setState({
  //         dataSource: arr.map((item, index) => {
  //           return {
  //             key: index,
  //             carName: item.carName,
  //             order: item.orderCode,
  //             status:item.status,
  //             name: item.name,
  //             idCard: item.idCard,
  //             phone: item.phone,
  //             takeDate: item.takeDate,
  //             returnDate: item.returnDate,
  //             takePlace: item.takePlace,
  //             returnPlace: item.returnPlace,
  //             date: `${item.date}天`,
  //             pay: `${item.pay}元`
  //           };
  //         })
  //       });
  //     }
  //     if (phone != undefined) {
  //       let arr = Data.data.filter(item => {
  //         return item.phone == phone;
  //       });
  //       this.setState({
  //         dataSource: arr.map((item, index) => {
  //           return {
  //             key: index,
  //             carName: item.carName,
  //             order: item.orderCode,
  //             status:item.status,
  //             name: item.name,
  //             idCard: item.idCard,
  //             phone: item.phone,
  //             takeDate: item.takeDate,
  //             returnDate: item.returnDate,
  //             takePlace: item.takePlace,
  //             returnPlace: item.returnPlace,
  //             date: `${item.date}天`,
  //             pay: `${item.pay}元`
  //           };
  //         })
  //       });
  //     }
  //     if (orderCode != undefined) {
  //       let arr = Data.data.filter(item => {
  //         return item.orderCode == orderCode;
  //       });
  //       this.setState({
  //         dataSource: arr.map((item, index) => {
  //           return {
  //             key: index,
  //             carName: item.carName,
  //             order: item.orderCode,
  //             status:item.status,
  //             name: item.name,
  //             idCard: item.idCard,
  //             phone: item.phone,
  //             takeDate: item.takeDate,
  //             returnDate: item.returnDate,
  //             takePlace: item.takePlace,
  //             returnPlace: item.returnPlace,
  //             date: `${item.date}天`,
  //             pay: `${item.pay}元`
  //           };
  //         })
  //       });
  //     }
  //     if (carName != undefined) {
  //       let arr = Data.data.filter(item => {
  //         return item.carName == carName;
  //       });
  //       this.setState({
  //         dataSource: arr.map((item, index) => {
  //           return {
  //             key: index,
  //             carName: item.carName,
  //             order: item.orderCode,
  //             status:item.status,
  //             name: item.name,
  //             idCard: item.idCard,
  //             phone: item.phone,
  //             takeDate: item.takeDate,
  //             returnDate: item.returnDate,
  //             takePlace: item.takePlace,
  //             returnPlace: item.returnPlace,
  //             date: `${item.date}天`,
  //             pay: `${item.pay}元`
  //           };
  //         })
  //       });
  //     }
  //   } else {
  //     this.setState({
  //       dataSource: Data.data.map((item, index) => {
  //         return {
  //           key: index,
  //           carName: item.carName,
  //           order: item.orderCode,
  //           status:item.status,
  //           name: item.name,
  //           idCard: item.idCard,
  //           phone: item.phone,
  //           takeDate: item.takeDate,
  //           returnDate: item.returnDate,
  //           takePlace: item.takePlace,
  //           returnPlace: item.returnPlace,
  //           date: `${item.date}天`,
  //           pay: `${item.pay}元`
  //         };
  //       })
  //     });
  //   }
  // }

  render() {
    const {
      dataSource,
      orderList,
      countPay,
      name,
      userName,
      phone,
      orderCode,
      carName,
      authority
    } = this.state;
    if (authority=='false') {
      return (
        <div className="component-empty component-nopermission">
          <div className="bgimg" />
          <p>无权限</p>
        </div>
      );
    }
    return (
      <div className="page-billflow">
        <div className="g-head m-bill-head">
          <div className="page-title" style={{ fontSize: "22px" }}>
            订单流水
          </div>
        </div>
        <div className="m-bill">
          <Form className={"m-from"} layout="inline">
            <Row style={{ marginTop: "15px" }}>
              {/* <Col style={{ display: "inline-block" }}>
                <Form.Item label="用户账号">
                  <Input
                    style={{ width: "224px" }}
                    value={userName}
                    onChange={e => {
                      this.setState({ userName: e.target.value });
                    }}
                  />
                </Form.Item>
              </Col> */}
              <Col style={{ display: "inline-block" }}>
                <Form.Item label="姓名">
                  <Input
                    style={{ width: "224px" }}
                    value={name}
                    onChange={e => {
                      this.setState({ name: e.target.value });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col style={{ display: "inline-block" }}>
                <Form.Item label="联系方式">
                  <Input
                    style={{ width: "224px" }}
                    placeholder="输入联系方式"
                    value={phone}
                    onChange={e => {
                      this.setState({ phone: e.target.value });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginTop: "15px" }}>
              <Col style={{ display: "inline-block" }}>
                <Form.Item label="订单编号">
                  <Input
                    style={{ width: "224px" }}
                    placeholder="输入订单编号"
                    value={orderCode}
                    onChange={e => {
                      this.setState({ orderCode: e.target.value });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col style={{ display: "inline-block" }}>
                <Form.Item label="按车型">
                  <Input
                    style={{ width: "224px" }}
                    placeholder="请输入车型"
                    value={carName}
                    onChange={e => {
                      this.setState({ carName: e.target.value });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col style={{ display: "inline-block" }}>
                <Form.Item style={{ marginLeft: "30px" }}>
                  <Button
                    type="Default"
                    onClick={() => {
                      this.setState({
                        name: undefined,
                        userName: undefined,
                        phone: undefined,
                        orderCode: undefined,
                        carName: undefined
                      });
                    }}
                  >
                    重置
                  </Button>
                  <Button type="primary" onClick={this.search.bind(this)}>
                    搜索
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="m-bill-table">
          <div className="m-total">
            <span>
              共有
              <em>{dataSource.length}</em>
              条搜索结果
            </span>
          </div>
          {/* {1 > 0 && (
            <div className="m-counter">
              <span>实收总金额：</span>
              <em>{countPay}元</em>
              <span style={{ marginLeft: "30px" }}>实收租客总笔数：</span>
              <em>{orderList.length}</em>
            </div>
          )} */}
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    );
  }
}

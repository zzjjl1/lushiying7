import React, { Component } from "react";
import { browserHistory } from "react-router";
import axios from 'axios'
import { Form, Icon, Input, Button, Select, message } from 'antd';

const {Option} = Select

class BasicInfoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      followUpData: [],
      tagsMap: {},
      basicInfo: {},
      isEdit: false,
    };
  }
  componentDidMount() {
    this.props.form.validateFields();
    this.getDetail();
  }
  getDetail = () => {
    const params = {};
    axios.get('',params)
      .then(function (res) {
        this.setState({basicInfo: res.basicInfo},()=>{this.setDetail()});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setDetail = () => {
    const { basicInfo } = this.state;
    const { setFieldsValue } = this.props.form;
    setFieldsValue({city:basicInfo.city})
  }
  editBasicInfo = () => {
    this.setState({isEdit:true})
  }
  handleSave = () => {
    e.preventDefault();
    axios.get('',this.props.form)
      .then(function (res) {
        message.success('修改成功！');
      })
      .catch(function (error) {
        console.log(error);
        message.success('修改失败！');
        this.handleCancel();
      });
  };
  handleCancel = () => {
    this.setDetail();
    this.setState({isEdit:true});
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isEdit } = this.state;
    return (
      <div className="form-area">
        <div className="bottom-area-title">
          <label className="title-label">基础信息</label>
          <div className="edit-label" onClick={this.editBasicInfo}>
            <Icon type="edit" /><label>补充&纠错</label>
          </div>
        </div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <div className="form-label">小区信息</div>
          <Form.Item label='所在城区' >
            {getFieldDecorator('city')(
              <Input
                disabled={!isEdit}
                placeholder="请输入所在城区"
              />,
            )}
          </Form.Item>
          <Form.Item label='所属商圈' >
            {getFieldDecorator('area')(
              <Input
                disabled={!isEdit}
                placeholder="请输入所属商圈"
              />,
            )}
          </Form.Item>
          <Form.Item label='物业费' >
            {getFieldDecorator('price')(
              <Input
                disabled={!isEdit}
                placeholder="请输入物业费"
              />,
            )}
          </Form.Item>
          <div className="form-label">建筑信息</div>
          <Form.Item label='交易权属' >
            {getFieldDecorator('asdas')(
              <Input
                disabled={!isEdit}
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='建筑结构' >
            {getFieldDecorator('asdas')(
              <Input
                disabled={!isEdit}
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='产权年限' >
            {getFieldDecorator('asdas')(
              <Input
                disabled={!isEdit}
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='梯户比例' >
            {getFieldDecorator('asdas')(
              <Input
                disabled={!isEdit}
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='房屋用途' >
            {getFieldDecorator('asdas')(
              <Input
                disabled={!isEdit}
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='建筑类型' >
            {getFieldDecorator('asdas')(
              <Input
                disabled={!isEdit}
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='建成年代' >
            {getFieldDecorator('asdas')(
              <Input
                disabled={!isEdit}
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='凶宅信息' >
            {getFieldDecorator('asdas')(
              <Input
                disabled={!isEdit}
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='嫌恶设施' >
            {getFieldDecorator('asdas')(
              <Input
                disabled={!isEdit}
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <div className="form-label">生活信息</div>
          <Form.Item label='供暖类型' >
            {getFieldDecorator('city')(
              <Input
                disabled={!isEdit}
                placeholder="请输入所在城区"
              />,
            )}
          </Form.Item>
          <Form.Item label='用电类型' >
            {getFieldDecorator('area')(
              <Input
                disabled={!isEdit}
                placeholder="请输入用电类型"
              />,
            )}
          </Form.Item>
          <Form.Item label='车位比例' >
            {getFieldDecorator('price')(
              <Input
                disabled={!isEdit}
                placeholder="请输入物业费"
              />,
            )}
          </Form.Item>
          <Form.Item label='停车服务费' >
            {getFieldDecorator('city')(
              <Input
                disabled={!isEdit}
                placeholder="请输入所在城区"
              />,
            )}
          </Form.Item>
          <Form.Item label='供暖费用' >
            {getFieldDecorator('area')(
              <Input
                disabled={!isEdit}
                placeholder="请输入供暖费用"
              />,
            )}
          </Form.Item>
          <Form.Item label='用水类型' >
            {getFieldDecorator('price')(
              <Input
                disabled={!isEdit}
                placeholder="请输入用水类型"
              />,
            )}
          </Form.Item>
          <Form.Item label='地上车位数' >
            {getFieldDecorator('city')(
              <Input
                disabled={!isEdit}
                placeholder="请输入地上车位数"
              />,
            )}
          </Form.Item>
          <Form.Item label='是否有电梯' >
            {getFieldDecorator('area')(
              <Select defaultValue="1" disabled={!isEdit}>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label='是否有燃气' >
            {getFieldDecorator('price')(
              <Select defaultValue="1" disabled={!isEdit}>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label='燃气费' >
            {getFieldDecorator('city')(
              <Input
                disabled={!isEdit}
                placeholder="请输入燃气费"
              />,
            )}
          </Form.Item>
          <Form.Item label='地下车位数' >
            {getFieldDecorator('area')(
              <Input
                disabled={!isEdit}
                placeholder="请输入地下车位数"
              />,
            )}
          </Form.Item>
          <Form.Item label='是否有热水' >
            {getFieldDecorator('price')(
              <Select defaultValue="1" disabled={!isEdit}>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label='热水费' >
            {getFieldDecorator('city')(
              <Input
                disabled={!isEdit}
                placeholder="请输入热水费"
              />,
            )}
          </Form.Item>
          <Form.Item label='小区幼儿园' >
            {getFieldDecorator('area')(
              <Input
                disabled={!isEdit}
                placeholder="请输入小区幼儿园"
              />,
            )}
          </Form.Item>
          <Form.Item label='是否有中水' >
            {getFieldDecorator('price')(
              <Select defaultValue="1" disabled={!isEdit}>
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label='中水费' >
            {getFieldDecorator('price')(
              <Input
                disabled={!isEdit}
                placeholder="请输入中水费"
              />,
            )}
          </Form.Item>
        </Form>
        {isEdit?<div>
          <Button type="primary" onClick={this.handleSave}>保存</Button>
          <Button type="default" onClick={this.handleCancel}>取消</Button>
        </div>:null}
      </div>
    );
  }
}

BasicInfoForm = Form.create({})(BasicInfoForm);
export default BasicInfoForm;


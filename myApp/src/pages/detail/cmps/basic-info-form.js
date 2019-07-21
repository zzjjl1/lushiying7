import React, { Component } from "react";
import { browserHistory } from "react-router";
import axios from 'axios'
import { Form, Icon, Input, Button, Select } from 'antd';

const {Option} = Select

class BasicInfoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      followUpData:[],
      tagsMap:{},
    };
  }
  componentDidMount(){
    const params = {};
    axios.get('',params)
      .then(function (res) {
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div className="form-area">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <div className="form-label">小区信息</div>
          <Form.Item label='所在城区' >
            {getFieldDecorator('city')(
              <Input
                placeholder="请输入所在城区"
              />,
            )}
          </Form.Item>
          <Form.Item label='所属商圈' >
            {getFieldDecorator('area')(
              <Input
                placeholder="请输入所属商圈"
              />,
            )}
          </Form.Item>
          <Form.Item label='物业费' >
            {getFieldDecorator('price')(
              <Input
                placeholder="请输入物业费"
              />,
            )}
          </Form.Item>
          <div className="form-label">建筑信息</div>
          <Form.Item label='交易权属' >
            {getFieldDecorator('asdas')(
              <Input
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='建筑结构' >
            {getFieldDecorator('asdas')(
              <Input
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='产权年限' >
            {getFieldDecorator('asdas')(
              <Input
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='梯户比例' >
            {getFieldDecorator('asdas')(
              <Input
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='房屋用途' >
            {getFieldDecorator('asdas')(
              <Input
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='建筑类型' >
            {getFieldDecorator('asdas')(
              <Input
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='建成年代' >
            {getFieldDecorator('asdas')(
              <Input
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='凶宅信息' >
            {getFieldDecorator('asdas')(
              <Input
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <Form.Item label='嫌恶设施' >
            {getFieldDecorator('asdas')(
              <Input
                placeholder="请输入交易权属"
              />,
            )}
          </Form.Item>
          <div className="form-label">生活信息</div>
          <Form.Item label='供暖类型' >
            {getFieldDecorator('city')(
              <Input
                placeholder="请输入所在城区"
              />,
            )}
          </Form.Item>
          <Form.Item label='用电类型' >
            {getFieldDecorator('area')(
              <Input
                placeholder="请输入用电类型"
              />,
            )}
          </Form.Item>
          <Form.Item label='车位比例' >
            {getFieldDecorator('price')(
              <Input
                placeholder="请输入物业费"
              />,
            )}
          </Form.Item>
          <Form.Item label='停车服务费' >
            {getFieldDecorator('city')(
              <Input
                placeholder="请输入所在城区"
              />,
            )}
          </Form.Item>
          <Form.Item label='供暖费用' >
            {getFieldDecorator('area')(
              <Input
                placeholder="请输入供暖费用"
              />,
            )}
          </Form.Item>
          <Form.Item label='用水类型' >
            {getFieldDecorator('price')(
              <Input
                placeholder="请输入用水类型"
              />,
            )}
          </Form.Item>
          <Form.Item label='地上车位数' >
            {getFieldDecorator('city')(
              <Input
                placeholder="请输入地上车位数"
              />,
            )}
          </Form.Item>
          <Form.Item label='是否有电梯' >
            {getFieldDecorator('area')(
              <Select defaultValue="1">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label='是否有燃气' >
            {getFieldDecorator('price')(
              <Select defaultValue="1">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label='燃气费' >
            {getFieldDecorator('city')(
              <Input
                placeholder="请输入燃气费"
              />,
            )}
          </Form.Item>
          <Form.Item label='地下车位数' >
            {getFieldDecorator('area')(
              <Input
                placeholder="请输入地下车位数"
              />,
            )}
          </Form.Item>
          <Form.Item label='是否有热水' >
            {getFieldDecorator('price')(
              <Select defaultValue="1">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label='热水费' >
            {getFieldDecorator('city')(
              <Input
                placeholder="请输入热水费"
              />,
            )}
          </Form.Item>
          <Form.Item label='小区幼儿园' >
            {getFieldDecorator('area')(
              <Input
                placeholder="请输入小区幼儿园"
              />,
            )}
          </Form.Item>
          <Form.Item label='是否有中水' >
            {getFieldDecorator('price')(
              <Select defaultValue="1">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label='中水费' >
            {getFieldDecorator('price')(
              <Input
                placeholder="请输入中水费"
              />,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

BasicInfoForm = Form.create({})(BasicInfoForm);
export default BasicInfoForm;


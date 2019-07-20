import React, { Component } from "react";
import { browserHistory } from "react-router";
import axios from 'axios'
import { Form, Icon, Input, Button } from 'antd';

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
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label='所在城区' validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('city')(
            <Input
              placeholder="请输入所在城区"
            />,
          )}
        </Form.Item>
        <Form.Item label='所属商圈' validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('area')(
            <Input
              placeholder="请输入所属商圈"
            />,
          )}
        </Form.Item>
        <Form.Item label='物业费' validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('price')(
            <Input
              placeholder="请输入物业费"
            />,
          )}
        </Form.Item>
        <Form.Item label='交易权属' validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('asdas')(
            <Input
              placeholder="请输入交易权属"
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

BasicInfoForm = Form.create({})(BasicInfoForm);
export default BasicInfoForm;


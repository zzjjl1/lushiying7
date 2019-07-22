import React, { Component } from "react";
import { browserHistory } from "react-router";
import axios from 'axios'
import { Form, Icon, Input, Button, Select, message, Row, Col } from 'antd';

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
    let _this = this;
    axios.get('http://47.106.74.64:8888/house/detail',{
      params: {
        userId: 1,
        code: 1,
      }
    })
      .then(function (res) {
        _this.setState({basicInfo: res.data.data},()=>{_this.setDetail()});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setDetail = () => {
    const { setFieldsValue } = this.props.form;
    const {
      province, bizCicle, propertyCost, tradingAuthority, buildingStructure, propertyYear, ladderRatio,
      houseUse, buildingType, buildingYear, hauntHouse, disgustingFacility,
      heatingType, electricityType, parkingRatio, parkingCost, heatingCost, waterType, groundCarCount, haveElevator,
      haveGas, gasCost, undergroundCarCount, haveHotWater, hotWaterCost, communityKindergarten, haveZhongshui, zhongshuiCost
    } = this.state.basicInfo;
    setFieldsValue({
      province, bizCicle, propertyCost, tradingAuthority, buildingStructure, propertyYear, ladderRatio,
      houseUse, buildingType, buildingYear, hauntHouse, disgustingFacility,
      heatingType, electricityType, parkingRatio, parkingCost, heatingCost, waterType, groundCarCount, haveElevator,
      haveGas, gasCost, undergroundCarCount, haveHotWater, hotWaterCost, communityKindergarten, haveZhongshui, zhongshuiCost
    })
  }
  editBasicInfo = () => {
    this.setState({isEdit:true})
  }
  handleSave = (e) => {
    e.preventDefault();
    let _this = this;
    let formData = this.props.form.getFieldsValue();
    formData.userId = 1;
    let data = {"houseDTO": formData};
    axios.post('http://47.106.74.64:8888/house/addOrEdit',data)
      .then(function (res) {
        message.success('修改成功！');
        _this.getDetail();
      })
      .catch(function (error) {
        console.log(error);
        message.success('修改失败！');
        _this.handleCancel();
      });
  };
  handleCancel = () => {
    this.setDetail();
    this.setState({isEdit:false});
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isEdit } = this.state;
    const { formLayout } = this.state;
    return (
      <div className="form-area">
        <div className="bottom-area-title">
          <label className="title-label">基础信息</label>
          <div className="edit-label" onClick={this.editBasicInfo}>
            <Icon type="edit" /><label>补充&纠错</label>
          </div>
        </div>
        <Form layout="inline" onSubmit={this.handleSubmit} >
          <div className="form-label">小区信息</div>
          <Row>
            <Col span="8">
              <Form.Item label='所在城区' >
                {getFieldDecorator('province',)(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入所在城区"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='所属商圈' >
                {getFieldDecorator('bizCicle',)(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入所属商圈"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='物业费' >
                {getFieldDecorator('propertyCost')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入物业费"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <div className="form-label">建筑信息</div>
          <Row>
            <Col span="8">
              <Form.Item label='交易权属' >
                {getFieldDecorator('tradingAuthority')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入交易权属"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='建筑结构' >
                {getFieldDecorator('buildingStructure')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入交易权属"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='产权年限' >
                {getFieldDecorator('propertyYear')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入交易权属"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Form.Item label='梯户比例' >
                {getFieldDecorator('ladderRatio')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入交易权属"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='房屋用途' >
                {getFieldDecorator('houseUse')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入交易权属"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='建筑类型' >
                {getFieldDecorator('buildingType')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入交易权属"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Form.Item label='建成年代' >
                {getFieldDecorator('buildingYear')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入交易权属"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='凶宅信息' >
                {getFieldDecorator('hauntHouse')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入交易权属"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='嫌恶设施' >
                {getFieldDecorator('disgustingFacility')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入交易权属"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <div className="form-label">生活信息</div>
          <Row>
            <Col span="8">
              <Form.Item label='供暖类型' >
                {getFieldDecorator('heatingType')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入所在城区"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='用电类型' >
                {getFieldDecorator('electricityType')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入用电类型"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='车位比例' >
                {getFieldDecorator('parkingRatio')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入物业费"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Form.Item label='停车服务费' >
                {getFieldDecorator('parkingCost')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入所在城区"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='供暖费用' >
                {getFieldDecorator('heatingCost')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入供暖费用"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='用水类型' >
                {getFieldDecorator('waterType')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入用水类型"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Form.Item label='地上车位数' >
                {getFieldDecorator('groundCarCount')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入地上车位数"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='是否有电梯' >
                {getFieldDecorator('haveElevator')(
                  <Select initialValue="1" disabled={!isEdit}>
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='是否有燃气' >
                {getFieldDecorator('haveGas')(
                  <Select initialValue="1" disabled={!isEdit}>
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Form.Item label='燃气费' >
                {getFieldDecorator('gasCost')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入燃气费"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='地下车位数' >
                {getFieldDecorator('undergroundCarCount')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入地下车位数"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='是否有热水' >
                {getFieldDecorator('haveHotWater')(
                  <Select initialValue="1" disabled={!isEdit}>
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Form.Item label='热水费' >
                {getFieldDecorator('hotWaterCost')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入热水费"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='小区幼儿园' >
                {getFieldDecorator('communityKindergarten')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入小区幼儿园"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item label='是否有中水' >
                {getFieldDecorator('haveZhongshui')(
                  <Select initialValue="1" disabled={!isEdit}>
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <Form.Item label='中水费' >
                {getFieldDecorator('zhongshuiCost')(
                  <Input
                    disabled={!isEdit}
                    placeholder="请输入中水费"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
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


import React from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'antd';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { Breadcrumb } from 'antd';
import { Menu, Icon } from 'antd';
import { Pagination, Input, Collapse } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import Img from './Image/icon.jpg';
import 'antd/dist/antd.css';
import './style.css';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail'
    }
  };


  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled>
          <Icon type="appstore" />Navigation Two
        </Menu.Item>
        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item>
      </Menu>
    );
  }
}
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
const style = {
  width: '400px',
  margin: '30px',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  border: '1px solid #e8e8e8',
  margin: '50px auto'
};
const style1 = {
  width: '400px',
  height: '400px',
  border: '1px solid #e8e8e8'
}
const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}
const text = "ememememememememem";
function onChange(time, timeString) {
  console.log(time, timeString);
}
ReactDOM.render(
  <div>
    <App></App>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Card style={style} actions={[<a>操作一</a>, <a>操作二</a>, <a>操作三</a>]}>
      <Card.Meta
        avatar={<img
          alt=""
          style={{ width: '64px', height: '64px', borderRadius: '32px' }}
          src={Img}
        />}
        title="贝壳找房"
        description="张子健"
      />
    </Card>
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
    <Pagination defaultCurrent={1} total={50}></Pagination>
    <TodoList></TodoList>
    <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
    <div className="example-input">
      <Input size="large" placeholder="用户名" />
      <Input placeholder="密码" />
      <Input size="small" placeholder="验证码" />
      <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header="This is panel header 1" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3" disabled>
          <p>{text}</p>
        </Panel>
      </Collapse>
      <Toggle />
    </div>
  </div>,
  document.getElementById('root')
)



import React, { Component } from "react";
import { Table, Button, Tooltip } from 'antd';
import {HouseInstance} from '../../../common/request'
import {Link} from 'react-router-dom'

function renderLongText(string,maxWidth = 150) {
  return (
    <Tooltip title={string}>
      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: maxWidth + 'px'}}>
        {string}
      </div>
    </Tooltip>

  )
}
export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      followUpData: [],
      tagsMap: {},
      expandedRowKeys: [],
      tableData: []
    };
    this.columns = [
      {
        title: '建筑年代',
        dataIndex: 'buildingYear',
        align: 'center'
      },
      {
        title: '商圈',
        dataIndex: 'bizCicle',
        align: 'center'
      },
      {
        title: '是否完成',
        dataIndex: 'finish',
        align: 'center',
        render(finish, row){
          let type,text,disabled = true

          if(finish === 0){
            const to = '/detail/' + row.code
            disabled = false
            type = 'primary'
            text = <Link to={to}>去完成</Link>
          }else{
            type = 'error'
            text = '已完成'
          }
          return <Button type={type} disabled={disabled}>{text}</Button>
        }
      }
    ]
  }
  onChange = (pagination, filters, sorter) => {
    // console.log('params', pagination, filters, sorter);
  }
  componentDidMount() {
    HouseInstance.get('/house/task/list?code=123&userId=10').then(res => {
      this.setState({
        tableData: res.data.data
      })
    })
  };
  showList(row){
    // const {expandedRowKeys} = this.state
    // const expandId = expandedRowKeys[0]
    // if(row.id === expandId){
    //   this.setState({
    //     expandedRowKeys: []
    //   })
    // }else{
    //   this.setState({
    //     expandedRowKeys: [row.id]
    //   })
    // }
  }
  render() {
    const { followUpData, tableData, expandedRowKeys } = this.state;
    // const expandId = expandedRowKeys[0]
    const columns = [
      {
        title: '任务分类',
        dataIndex: 'type',
        key: 'type',
        width: 50,
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'Submenu',
            value: 'Submenu',
            children: [
              {
                text: 'Green',
                value: 'Green',
              },
              {
                text: 'Black',
                value: 'Black',
              },
            ],
          },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
        align: 'center'
      },
      {
        title: '任务状态',
        dataIndex: 'status',
        key: 'status',
        width: 50,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
        align: 'center'
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'taskName',
        width: 50,
        align: 'center'
      },
      {
        title: '任务规则',
        dataIndex: 'rule',
        key: 'rule',
        render(text){
          return renderLongText(text)
        },
        align: 'center'
      },
      {
        title: '奖励',
        dataIndex: 'price',
        key: 'price',
        render(text){
          return renderLongText(text)
        },
        align: 'center'
      },
      {
        title: '任务到期时间',
        dataIndex: 'time',
        key: 'time',
        maxWidth: 50,
        tooltip: true,
        align: 'center'
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, row) => <Button type="primary" onClick={() => this.showList(row)}>{row.id === expandId ? '关闭任务详情' : '查看任务详情'}</Button>,
        align: 'center'
      },
    ];
    const data = [
      {
        id: 1,
        type: '房源基本信息维护',
        status: '进行中',
        name: '补全10套房源的基本信息',
        rule: '一周内累计共补全10套房源的基本信息，则表示任务完成，并发放贝壳币奖励和"房源保护者"称号',
        price: '20个贝壳币和为期一周的"房源保护者称号"',
        time: '每周日23:59',
      },{
        id: 2,
        type: '房源基本信息维护',
        status: '进行中',
        name: '补全10套房源的基本信息',
        rule: '一周内累计共补全10套房源的基本信息，则表示任务完成，并发放贝壳币奖励和"房源保护者"称号',
        price: '20个贝壳币和为期一周的"房源保护者称号"',
        time: '每周日23:59',
      },
    ];
    return (
      <div className="task-list">
        <Table columns={this.columns} dataSource={tableData} rowKey="id"/>
      </div>
    );
  }
}

class ExpandRow extends Component{
  constructor(){
    super();
    this.columns = [
      {
        title: '标题图',
        dataIndex: 'biaotitu',
        align: 'center'
      },
      {
        title: '楼盘名称',
        dataIndex: 'loupan',
        align: 'center'
      },
      {
        title: '户型',
        dataIndex: '1',
        align: 'center'
      },
      {
        title: '面积',
        dataIndex: '2',
        align: 'center'
      },
      {
        title: '总价/单价',
        dataIndex: '3',
        align: 'center'
      },
      {
        title: '楼层',
        dataIndex: '4',
        align: 'center'
      },
      {
        title: '朝向',
        dataIndex: '5',
        align: 'center'
      },
      {
        title: '近30天带看',
        dataIndex: '6',
        align: 'center'
      },
      {
        title: '平分',
        dataIndex: '7',
        align: 'center'
      },
      {
        title: '挂牌',
        dataIndex: '8',
        align: 'center'
      },
      {
        title: '维护人',
        dataIndex: '9',
        align: 'center'
      }
    ]
    this.state = {
      isLoading: true
    }
  }
  componentDidMount(){
    const {id} = this.props
    // Instance.get('/api/')
  }
  componentDidUpdate(){
    console.log('updated')
  }
  render(){
    const {isLoading} = this.state
    return <Table columns={this.columns} loading={isLoading} rowKey="id"></Table>
  }
}
function expandedRowRender(record){
  return <ExpandRow id={record.id}></ExpandRow>
}
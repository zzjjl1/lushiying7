import React, { Component } from "react";
import { browserHistory } from "react-router";
import axios from 'axios'
import { Table, Button } from 'antd';
export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      followUpData:[],
      tagsMap:{},
    };
  }
  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }
  componentDidMount(){
    const params = {};
    axios.get('',params)
      .then(function (res) {
        this.setState({followUpData:res.data.followUpData,tagsMap:res.data.tagsMap});
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    const { followUpData, tagsMap } = this.state;
    const columns = [
      {
        title: '任务分类',
        dataIndex: 'type',
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
      },
      {
        title: '任务状态',
        dataIndex: 'status',
        width: 50,
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'taskName',
        width: 50,
      },
      {
        title: '任务规则',
        dataIndex: 'rule',
        key: 'rule',
        width: 50,
      },
      {
        title: '奖励',
        dataIndex: 'price',
        key: 'price',
        width: 50,
      },
      {
        title: '任务到期时间',
        dataIndex: 'time',
        key: 'time',
        width: 50,
      },
      {
        title: '操作',
        key: 'operation',
        render: () => <Button type="primary" onClick={this.showList}>查看任务详情</Button>
      },
    ];
    const data = [
      {
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
        <Table columns={columns} dataSource={data} onChange={this.onChange} />
      </div>
    );
  }
}

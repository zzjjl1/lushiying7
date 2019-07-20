import React, { Component } from "react";
import { browserHistory } from "react-router";
import axios from 'axios'
import { Timeline } from 'antd';

export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      followUpData:[],
      tagsMap:{},
    };
  }
  componentDidMount(){
    // const followUpData = [
    //   {
    //     followTime: '',
    //     followPerson: '',
    //     tagsInfo: {
    //       1: '周五下午可看',
    //       2: '是'
    //     }
    //   },{
    //     followTime: '',
    //     followPerson: '',
    //     tagsInfo: {
    //       1: '周五下午可看',
    //       2: '是'
    //     }
    //   },
    // ];
    // const tagsMap = {
    //   1:'看房时间',
    //   2:'满五唯一',
    // }
    // this.setState({followUpData:followUpData,tagsMap:tagsMap});
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
    return (
      <div className="follow-up-list-area">
        <Timeline>
        {followUpData.map(item=>{
          return (
            <Timeline.Item>
              <p>跟进人：{item.followPerson}</p>
              <p>跟进时间：{item.followTime}</p>
              {Object.getOwnPropertyNames(item.tagsInfo).map(key=>{
                return (
                  <p>{tagsMap[key]} ：{item.tagsInfo[key]}</p>
                )
              })}
            </Timeline.Item>
          )
        })}
        </Timeline>
      </div>
  );
  }
}

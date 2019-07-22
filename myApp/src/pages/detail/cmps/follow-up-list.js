import React, { Component } from "react";
import { browserHistory } from "react-router";
import { Timeline } from 'antd';
import moment from 'moment';
export default class Assignment extends Component {
  constructor() {
    super();
    this.state = {
      followUpData:[],
      tagsMap:{},
    };
  }
  render() {
    const { followUpData } = this.props;
    return (
      <div className="follow-up-list-area">
        <Timeline>
        {followUpData.map(item=>{
          return (
            <Timeline.Item key={item.followTime}>
              <p key="1">跟进人：{item.followPerson}</p>
              <p key="2">跟进时间：{moment(item.followTime).format('YYYY-MM-DD HH:mm:ss')}</p>
              {item.tagsInfo.map((tagInfo, index)=>{
                return (
                  <p key={tagInfo.key + '' + index}>{tagInfo.key} ：{tagInfo.value}</p>
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

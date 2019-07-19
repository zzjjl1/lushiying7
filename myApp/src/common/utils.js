import React from 'react'
import ReactDOM from 'react-dom'
import { Select, message } from 'antd'
import { addClass, removeClass } from './dom'


export const queryToJson = query => {
  let json = {};
  if (!query || typeof query !== "string") {
    return json;
  }
  if (query.indexOf("?") == 0) {
    query = query.substr(1);
  }
  let qarr = query.split("&");
  for (let i of qarr) {
    let item = i.split("=");
    json[item[0]] = item[1];
  }
  return json;
};

export const createRandomId = () => {
  return (
    (Math.random() * 10000000).toString(16).substr(0, 4) +
    new Date().getTime() +
    Math.random()
      .toString()
      .substr(2, 5)
  );
};

export const getElementByRef = (ref, type = 0) => {
  // console.log(ref, type)
  const dom = ReactDOM.findDOMNode(ref)
  // console.log(dom)
  if (type === 0) {
    return dom
  } else if (type === 1) {
    return dom.parentNode
  } else if(type ===2){
    return dom.childNodes[0]
  }
}

export const showError = (msg, dom, options = {}) => {
  options = Object.assign(
    {},
    {
      timeout: 3000,
      scrollIntoView: true
    },
    options
  )
  const { timeout, scrollIntoView } = options
  msg && message.error(msg, timeout / 1000)
  dom &&
    (function() {
      scrollIntoView &&
        dom.scrollIntoView &&
        dom.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      addClass(dom, 'has-error')
      window.setTimeout(() => {
        removeClass(dom, 'has-error')
      }, timeout)
    })(dom)
}

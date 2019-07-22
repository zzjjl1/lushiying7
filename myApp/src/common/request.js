import axios from "axios";

// export default function ajax(method, url, val) {
//   // 方法，路径，传送数据
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState == 4) {
//       // if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//       // } else {
//       //   // alert("Request was unsuccessful: " + xhr.status);
//       // }
//     }
//   };

//   xhr.open(method, url, true);
//   if (val)
//   // val = JSON.stringify(val);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     // xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.send(val);
// }

// const ajax = {
//   post: function(url, val) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//       if (xhr.readyState == 4) {
//         console.log(xhr.responseText)
//         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//         } else {
//           // alert("Request was unsuccessful: " + xhr.status);
//         }
//       }
//     };
//     xhr.open("POST", url, true);
//     if (val)
//      val = JSON.stringify(val);
//     // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(val);
//   }
// };


// export default ajax;


const instance = axios.create({
  baseURL: 'http://47.106.74.64:8888/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});
const HouseInstance = axios.create({
  baseURL: 'http://47.106.74.64:8888/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});
export {
  instance as Instance,
  HouseInstance
}
export default function ajax(url,data){
  instance.post(url,data)
}
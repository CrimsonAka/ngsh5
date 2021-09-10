import axios from 'axios';
// import url from './url';

const http = axios.create({
  // 设置超时时间
  timeout: 30000,
  // baseURL: 'http://localhost:8080'
  baseURL: 'http://localhost:52537'
  // 其他axios的配置详见：https://www.kancloud.cn/yunye/axios/234845
});

// 获取localstorage数据
// let token = JSON.parse(localStorage.getItem('token'))


// 添加请求拦截器
http.interceptors.request.use(
  config => {
    // 在请求发送前做些什么
    // 例如添加自定义请求头:
    // if(localStorage.token) config.headers['token'] = localStorage.token;
    let token = JSON.parse(localStorage.getItem('token'))
    if (token) {
      config.headers.Authorization = 'Bearer ' + token.access_token
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;

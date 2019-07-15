import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
// //请求拦截器
axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        const {method,data} = config
        if(method.toLowerCase() === 'post' && typeof data === 'object'){
            config.data = qs.stringify(data)
            // console.log(config.data)
        }
        return config;
      }
)

// //响应拦截器  在得到响应之前  成功与失败对应请求响应回调函数的成功与失败
axios.interceptors.response.use(function (response) {
    return response.data;//直接jiangdata返回，请求响应回调函数的成功函数中就不需要再处理数据了
  }, function (error) {
    message.error('请求错误'+error.message)
    return new Promise(() =>{})//返回一个pending状态的promise对象，用来中断promise链，在此处处理服务器错误信息，就不需要在请求响应函数的失败回调中再处理
  });
export default axios


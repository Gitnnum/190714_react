import ajax from './ajax'
import jsonp from 'jsonp' 
import { message } from 'antd';
// const BASE = 'http://localhost:5000'
const BASE = ''
// export const reqLogin = (username,password) =>(
//     ajax({
//         method:'post',
//         url:BASE+'/login',
//         data:{
//             username,
//             password
//         }
//     })
// )
//发送登录请求
export const reqLogin = (username,password) =>  ajax.post(BASE + '/login', {username, password})
//发送jsonp请求，接受天气信息
export const reqWeather = (city) => {
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error && data.error === 0){
                const {dayPictureUrl,weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                message.error('获取天气请求信息失败')
            }
        })
    })
    
}
  
// const name = 'liu'
// const pwd = '123'
// reqLogin(name,pwd)
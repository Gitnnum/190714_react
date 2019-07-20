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
//发送获取分类列表请求
export const reqCategorys = () => ajax(BASE + '/manage/category/list')

//发送添加分类的请求
export const reqAddCategory = (categoryName) =>ajax.post(BASE + '/manage/category/add',{categoryName})

//发送修改分类的请求
export const reqUpdateCategory = ({categoryId,categoryName}) =>ajax.post(BASE + '/manage/category/update',{categoryId,categoryName})

//发送获取分类列表请求
export const reqProducts = (pageNum,pageSize) => ajax(BASE + '/manage/product/list',{
    params:{
        pageNum,
        pageSize
    }
})
//根据Name/desc搜索产品分页列表
export const reqSearchProducts = ({pageNum,pageSize,searchType,searchName}) =>ajax(BASE +'/manage/product/search',{
    params:{
        pageNum,
        pageSize,
        [searchType]:searchName
    }
})

//更新商品上下架
export const reqUpdateStatus = (productId,status)=>ajax.post(BASE+'/manage/product/updateStatus',{productId,status})

//获取商品对应id的分类
export const reqCategoryById = (categoryId)=>ajax(BASE+'/manage/category/info',{
    params:{
        categoryId
    }
})

//删除图片
export const reqDeleteImg = (name) =>ajax.post(BASE +'/manage/img/delete',{name})

//添加或修改商品
export const reqAddUpdateProduct = (product)=>ajax.post(BASE +'/manage/product/'+(product._id?'update':'add'),product)

//获取角色列表
 export const reqRoles = () => ajax(BASE + '/manage/role/list')

 //添加角色
 export const reqAddRole = (roleName) =>ajax.post(BASE + 'manage/role/add',{roleName})
// const name = 'liu'
// const pwd = '123'
// reqLogin(name,pwd)
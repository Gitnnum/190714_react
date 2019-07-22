import {SET_HEADER_TITLE,LOGIN_SUCCESS,ERROR_MESSAGE,LOGOUT} from './action-type'
import storageUtills from '../utills/storageUtills'
import {reqLogin} from '../api/'
//设置头部标题的同步action
export const setHeaderTitle = (headerTitle) => ({type: SET_HEADER_TITLE, headerTitle});

export const loginSuccess = (user) =>({type:LOGIN_SUCCESS,user})
export const errorMessage = (error) =>({type:ERROR_MESSAGE,error})

export const logout = () =>{
    storageUtills.removeUser()
    return {type:LOGOUT}
}
export function login (username,password){
     return async dispatch =>{
        const result =await reqLogin(username,password)
        //登陆成功
        if(result.status === 0){
            const user = result.data
            storageUtills.saveUser(user)
            dispatch(loginSuccess(user))
        }else{
            //登陆失败
            const error = result.msg
            dispatch(errorMessage(error))
        }
     }
}
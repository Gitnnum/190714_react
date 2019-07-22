import {SET_HEADER_TITLE,LOGIN_SUCCESS,ERROR_MESSAGE, LOGOUT} from './action-type'
import {combineReducers} from 'redux'
import storageUtills from '../utills/storageUtills'
//设置头部标题
function headerTitle(state = '首页',action){
    switch (action.type) {
        case SET_HEADER_TITLE:
            return action.headerTitle
        default:
            return state
    }
}
const initState = storageUtills.getUser()
function user (state=initState,action){
    switch (action.type) {
        case LOGIN_SUCCESS:
            return action.user 
        case ERROR_MESSAGE:
            return {...state,error:action.error}
        case LOGOUT:
            return {}
        default:
            return state
    }
}

const reducer = combineReducers({
    headerTitle,
    user,
  })
  
export default reducer;
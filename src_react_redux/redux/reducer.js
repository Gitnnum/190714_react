/* 
真正管理状态数据的函数
作用: 根据老的state和action, 产生新的state
*/
import { 
  INCREMENT,
  DECREMENT
 } from "./action-types"
import {combineReducers} from '../lib/redux'

function count (state = 1, action) {
  console.log('count()', state, action)
  switch (action.type) {
    case INCREMENT:
      return state + action.number
    case DECREMENT:
      return state - action.number
    default: // 产生初始状态值
      return state
  }
}
function user(state={},action){
  switch (action.type) {
      // case INCREMENT:
      //     return state + action.number
      // case DECREMENT:
      //     return state - action.number
      default:
          return state
  }
}
export default combineReducers({
    count,
    user
})
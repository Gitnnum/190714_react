import {INCREMENT,DECREMENT} from './action-types'

export const decrement = (number) => ({type:DECREMENT,number})
export const increment = (number) => ({type:INCREMENT,number})
export function incrementAsync (number){
    return dispatch =>(
        setTimeout(()=>{
            dispatch(increment(number))
        },1000)
    )
}
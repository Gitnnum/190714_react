import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utills/memoryUtils'
export default class Admin extends Component{
    render(){
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memoryUtils.user
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return(
            <div>hellow {user.username}</div>
        )
    }
}
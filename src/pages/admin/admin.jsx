import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import storageUtills from '../../utills/storageUtills'
export default class Admin extends Component{
    render(){
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = storageUtills.getUser()
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return(
            <div>hellow {user.username}</div>
        )
    }
}
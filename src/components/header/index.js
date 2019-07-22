import React, { Component } from 'react'
import { Modal } from 'antd';
import {withRouter} from 'react-router-dom'
import{connect } from 'react-redux'

import{logout} from '../../redux/actions'
import {formateDate} from '../../utills/dateUtils'
import {reqWeather} from '../../api'
import LinkButton from '../link-button'
import './index.less'
class Header extends Component {
    state = {
        currentTime : formateDate(Date.now()),
        dayPictureUrl : '',
        weather : ''
    }
    componentDidMount(){
        this.timeId = setInterval(()=>{
            this.setState({
                currentTime : formateDate(Date.now())
            })
        },1000)
        // 发jsonp请求获取天气信息显示
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.timeId)
    }
    //天气信息
    getWeather = async () =>{
        const {dayPictureUrl,weather} = await reqWeather('北京')
        this.setState({dayPictureUrl,weather})
    }
    //退出
    logout = () => {
        Modal.confirm(
            {
                title: '您确认要退出吗?',
                onOk:() => {
                  this.props.logout()
                },
                onCancel() {
                  console.log('Cancel');
                },
              }
        )
    }
    //获取title
    // getTitle = () =>{
    //     const path = this.props.location.pathname
    //     let title = ''
    //     menuList.forEach((item)=>{
    //         if(item.key===path){
    //             title = item.title
    //         }else if(item.children){
    //             const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
    //             // const cItem = item.children.find((cItem)=>cItem.key === path)
    //             if(cItem){
    //                 title = cItem.title
    //             }
    //         }
    //     })
    //     return title
    // }
    render() {
        const { currentTime,dayPictureUrl,weather } = this.state
        const user = this.props.user
        const title = this.props.headerTitle
        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎，{user.username} &nbsp;&nbsp;
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{ currentTime }</span>
                        <img src={dayPictureUrl} alt='资源加载失败'></img>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({headerTitle:state.headerTitle,user:state.user}),
    {logout}
)(withRouter(Header))

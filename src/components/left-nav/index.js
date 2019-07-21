import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utills/memoryUtils'
const { SubMenu } = Menu;
class LeftNav extends Component {
    //显示导航之前先判断是否有权限看到导航条
    //admin用户全部可以看见   ||   有public属性的导航Item都可以看到   ||   有权限的与menus进行对比，有的才能显示看到
    hasAuth = (item)=>{
        const user = memoryUtils.user
        const menus = user.role.menus
        if(user.username === 'admin' || item.public || menus.indexOf(item.key)!==-1){
            return true
        }else if(item.children){
            const cItem = item.children.find((cItem)=>menus.indexOf(cItem.key)!==-1)
            return !!cItem
        }
        return false
    }
    //reduce +递归
    getMenuNodes2 = (menuList)=>{
        const path = this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if(this.hasAuth(item)){
                if(!item.children){
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                }else{
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    // const cItem  = item.children.find(cItem =>path.indexOf(cItem.key) === 0)
                    // const cItem = item.children.find( cItem => cItem.key === path) 
                    if(cItem){
                        this.openKey = item.key
                        // console.log(this.openKey)
                    }
                    pre.push((
                        <SubMenu
                            key={item.key}
                            title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                            }
                        >
                            {this.getMenuNodes2(item.children)}
                        </SubMenu> 
                    ))
                }
            }
            return pre
        },[])
    }
    //map+递归
    getMenuNodes = (menuList)=>{
        const path = this.props.location.pathname
        return menuList.map((item)=>{
            if(this.hasAuth(item)){
                if(!item.children){
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                }else{
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    // const cItem = item.children.find( cItem => cItem.key === path) 
                    if(cItem){
                        this.openKey = item.key
                        // console.log(this.openKey)
                    }
                    return(
                        <SubMenu
                            key={item.key}
                            title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                            }
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu> 
                    )
                }
            }
        })
    }
    componentWillMount(){
        //getMenuNodes2  与 getMenuNodes  两个实现目的一样，两种不同做法二选一
        this.menuNode = this.getMenuNodes(menuList)
    }
    render() {
        // 得到当前请求路径, 作为选中菜单项的key
        let selectKey = this.props.location.pathname // /product/xxx
            if (selectKey.indexOf('/product')===0) {
            selectKey = '/product'
        }
        return (
            <div className='left-nav'>
               <Link className='left-nav-link' to='/home'>
                    <img src={logo} alt='资源加载失败'></img>
                    <h1>硅谷后台</h1>
               </Link> 
               <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNode
                    }
                    {/* <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="/products"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>商品</span>
                        </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to="/category">
                                <Icon type="folder-open" />
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to="/product">
                                <Icon type="filter" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu> */}
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)
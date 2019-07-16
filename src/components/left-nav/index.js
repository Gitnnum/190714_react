import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
class LeftNav extends Component {
    //reduce +递归
    getMenuNodes2 = (menuList)=>{
        const path = this.props.location.pathname
        return menuList.reduce((pre,item)=>{
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
                const cItem = item.children.find( cItem => cItem.key === path) 
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
            return pre
        },[])
    }
    //map+递归
    getMenuNodes = (menuList)=>{
        const path = this.props.location.pathname
        return menuList.map((item)=>{
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
                const cItem = item.children.find( cItem => cItem.key === path) 
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
        })
    }
    componentWillMount(){
        //getMenuNodes2  与 getMenuNodes  两个实现目的一样，两种不同做法二选一
        this.menuNode = this.getMenuNodes(menuList)
    }
    render() {
        //路由组件才有location属性
        const selectKey = this.props.location.pathname
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
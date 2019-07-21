import React, { Component } from 'react'
import { Tree, Input,Form} from 'antd';
import PropTypes from 'prop-types'

import menuList from '../../config/menuConfig'
const { TreeNode } = Tree;
const {Item} = Form

export default class AddAuth extends Component {
    static propTypes = {
        role: PropTypes.object
    }
    state = {
        checkedKeys:[]
    }
    //获取权限树
    getTreeNodes = (menuList)=>{
        return menuList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key} >
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        },[])
    }
    //进行勾选操作时的回调
    //checkedKeys: 最新的所有勾选的node的key的数组
    onCheck = (checkedKeys) => {
        this.setState({
            checkedKeys
        })
    }

    //获取权限信息 为父组件收集信息做准备
    getMenus = ()=>this.state.checkedKeys

    componentWillMount(){
        this.treeNodes = this.getTreeNodes(menuList)
        const menus = this.props.role.menus
        this.setState({
            checkedKeys:menus
        })
    }
    // componentWillReceiveProps(nextProps){
    //     const menus = nextProps.role.menus
    //     console.log('menus',menus)
    //     this.setState({
    //         checkedKeys:menus
    //     })
    // }
    componentWillReceiveProps (nextProps) {
        console.log('componentWillReceiveProps()', nextProps)
        const menus = nextProps.role.menus
        this.setState({
          checkedKeys: menus
        })
      }
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }
        const role = this.props.role
        const {checkedKeys} = this.state
        return (
            <span>
                <Item label='角色名称' {...formItemLayout}>
                    <Input  value={role.name} disabled={true}></Input>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    // checkable
                    // defaultExpandAll
                    // checkedKeys={checkedKeys}
                    // onCheck={this.handleCheck}
                >
                   <TreeNode title="平台权限" key="all">
                        {
                        this.treeNodes
                        }
                    </TreeNode>
                </Tree>
            </span>
            
        )
    }
}

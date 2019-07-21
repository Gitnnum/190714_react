import React, { Component } from 'react'
import {Card,Button,Table,Modal, message} from 'antd'

import {PAGE_SIZE} from '../../utills/constants'
import LinkButton from '../../components/link-button'
import {reqRoles ,reqAddRole,reqUpdateRole} from '../../api'
import {formateDate} from '../../utills/dateUtils'
import memoryUtils from '../../utills/memoryUtils.js'
import AddForm from './add-form'
import AddAuth from './add-auth'
/**
 * 角色管理
 */
export default class Role extends Component {
  state={
    roles:[],
    isShowAdd:false,
    isShowAuth:false
  }

  authRef = React.createRef()
  //初始化columns
  initColumns = ()=>{
    this.columns = [
      {
        title:'角色名称',
        dataIndex: 'name'
      },
      {
        title:'创建时间',
        dataIndex: 'create_time',
        // render:(create_time)=>formateDate(create_time),
        render:formateDate//简写方式
      },
      {
        title:'授权时间',
        dataIndex: 'auth_time',
        // render:(auth_time)=>formateDate(auth_time),
        render:formateDate//简写方式
      },
      {
        title:'授权人',
        dataIndex: 'auth_name'
      },
      {
        title:'操作',
        render:(role)=>(<LinkButton onClick={()=>{
          this.role = role
          this.setState({isShowAuth:true})
        }
        }> 设置权限</LinkButton>)
      }
    ]
  }
  //获取角色
  getRoles = async ()=>{
    const result = await reqRoles()
    if(result.status === 0){
      const roles = result.data
      this.setState({
        roles
      })
    }
  }
  //添加角色，点击确定
  addRole =()=>{
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({isShowAdd:false})
        const roleName = values.roleName
        const result = await reqAddRole(roleName)
        if(result.status === 0){
          message.success('添加角色成功')
          this.getRoles()
        }else{
          message.error('添加角色失败')
        }
      }
    })
  }
  //添加角色中，点击取消
  addCancel = () => {
    this.setState({
      isShowAdd: false,
    });
  }
  //更新权限
  updateRole = async ()=>{
    this.setState({
      isShowAuth:false
    })
    const menus = this.authRef.current.getAuth()
    const name = memoryUtils.user.username
    const role = this.role
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = name
    const result = await reqUpdateRole(role)
    if(result.status === 0){
      message.success('更新权限成功')
      this.getRoles()
    }else{
      message.error('更新权限失败')
    }
  }

  componentWillMount(){
    this.initColumns()
  }

  componentDidMount(){
    this.getRoles()
  }
  render() {
    const title = (
      <Button type='primary' onClick={()=>this.setState({isShowAdd:true})}>
        创建角色
      </Button>
    )
    const role = this.role || {}
    const {roles ,isShowAdd ,isShowAuth} = this.state
    // console.log(isShowAdd,'isShowAdd')
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />  
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.addCancel}
        >
          <AddForm setForm = {(form)=>this.form = form}/>
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={()=>this.setState({
            isShowAuth:false
          })}
        >
          <AddAuth role = {role} ref = {this.authRef}/>
        </Modal>
        
        
      </Card>
    )
  }
}

import React, { Component } from 'react'
import {Card,Button,Table,Modal, message} from 'antd'

import {PAGE_SIZE} from '../../utills/constants'
import LinkButton from '../../components/link-button'
import {reqRoles ,reqAddRole} from '../../api'
import {formateDate} from '../../utills/dateUtils'
import AddForm from './add-form'
/**
 * 角色管理
 */
export default class Role extends Component {
  state={
    roles:[],
    isShowAdd:false,
    isShowAuth:false
  }
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
        render:()=>(<LinkButton> 设置权限</LinkButton>)
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
  handleCancel = () => {
    this.setState({
      isShowAdd: false,
    });
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
          onCancel={this.handleCancel}
        >
          <AddForm setForm = {(form)=>this.form = form}/>
        </Modal>
        
        
      </Card>
    )
  }
}

import React, { Component } from 'react'
import{Card,Button,Table,Modal, message} from 'antd'

import {PAGE_SIZE} from '../../utills/constants'
import {formateDate} from '../../utills/dateUtils'
import LinkButton from '../../components/link-button'
import {reqUsers,reqAddUser,reqUpdateUser,reqDeleteUser} from '../../api'
import AddUpdateUser from './add-update-user'
const {confirm} = Modal
/**
 * 用户管理
 */
export default class User extends Component {
  state = {
    users:[],
    roles:[],
    isShowAddOrUpdate:false,
  }
  //初始化列关系
  initColumns = ()=>{
    this.columns = [
      {
        title:'用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render:(role_id)=> this.roleName[role_id]
      },
      {
        title: '操作',
        render:(user)=>(
          <span>
            <LinkButton onClick={()=>{
              this.user = user
              this.setState({isShowAddOrUpdate:true})
            }}>修改</LinkButton>
            <LinkButton onClick={()=>{
              this.deleteUser(user)
            }} >删除</LinkButton>
          </span>
        )
      },
    ]
  }
  //删除用户
  deleteUser =(user)=>{
    confirm({
      title: '你确定要进行删除'+ user.username+'?',
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if(result.status === 0){
          message.success( `删除${user.username}成功`)
          this.getUsers()
        }else{
          message.error('删除失败')
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  //获取用户列表
  getUsers = async ()=>{
    const result = await reqUsers()
    if(result.status === 0){
      const {users,roles} = result.data
      //生成一个对象容器，存储role_id 对应的roles.name
      this.roleName = roles.reduce((pre,role)=>{
        pre[role._id] = role.name
        return pre
      },{})
      this.setState({
        users,
        roles
      })
    }
  }

  //添加或修改用户
  addOrUpdate =  ()=>{
    this.setState({isShowAddOrUpdate:false})
    this.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        let result 
        if(this.user){
          const _id = this.user._id
          const {username,phone,email,role_id} = values
          result = await reqUpdateUser(_id,username,phone,email,role_id)
        }else{
          const {username,password,phone,email,role_id} = values
          result = await reqAddUser(username,password,phone,email,role_id)
        }
        if(result.status === 0){
          const active = this.user ?'修改':'添加'
          message.success(active +'用户成功')
          this.getUsers()
        }else{
          message.error(result.msg)
        }
      }
    });
  }
  componentWillMount(){
    this.initColumns()

  }
  componentDidMount(){
    this.getUsers()
  }
  render() {
    const title = (
      <Button type='primary' onClick={()=>{
        this.user = null
        this.setState({isShowAddOrUpdate:true})
      }}>创建用户</Button> 
    )
    const {users,roles,isShowAddOrUpdate} = this.state
    const user = this.user || {}
    return (
      <Card title={title}>
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey='_id'
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShowAddOrUpdate}
          onOk={this.addOrUpdate}
          onCancel={()=>{
            this.form.resetFields()
            this.setState({isShowAddOrUpdate:false})}
          }
        >
          <AddUpdateUser user = {user} roles = {roles} setForm = {form => this.form = form}/>
        </Modal>
      </Card>
    )
  }
}

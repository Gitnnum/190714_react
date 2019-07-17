import React, { Component } from 'react'
import {Card,Button,Icon,Table, message,Modal} from 'antd'

import LinkButton from '../../components/link-button'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api'
import AddUpdateForm from './add-update-form'
/**
 * 分类管理
 */

export default class Category extends Component {
  state = {
    categorys:[], //所有分类的数组
    loading:false,
    showStatus:0, //0 对话框不显示 1 显示添加对话框 2 显示修改对话框
  }
  //获取分类列表信息
  getCategorys = async () =>{
    this.setState({loading:true})
    const result = await reqCategorys()
    this.setState({loading:false})
    if(result.status === 0){
      const  categorys = result.data
      this.setState({categorys})
    }else{
      message.error('获取分类信息失败')
    }
  }


  //初始化列
  initColumns =()=>{
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width:300,
        render: (category) =><LinkButton onClick={
          () =>{
            this.category = category
            this.setState({showStatus:2})
          }
        }>修改分类</LinkButton>//render的时候如果没有 dataIndex 属性，就得到的是整个数据对象
      },
    ];
  }
  //处理对话框确认取消
  handleOk = () => {
    //统一验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 验证通过后, 得到输入数据
        const { categoryName } = values
        const {showStatus} = this.state
        let result
        if(showStatus===1){
          result = await reqAddCategory(categoryName)
        }else{
          const categoryId = this.category._id
          result = await reqUpdateCategory({categoryId,categoryName})
        }

        //问题：修改后一条数据后。点击其他的会导致input框内的数据为最后一次输入的数据
        this.form.resetFields()//重置一组输入控件的值为 initialValue        ，如不传入参数，则重置所有组件

        this.setState({ showStatus:0})
        const action = showStatus===1?'添加':'修改'
        if(result.status===0){
          this.getCategorys()//重新获取列表信息，发送获取请求，就可以完成添加
          message.success(action + '分类成功')
          this.category = {}//////////////////////////////////////////////////////////////
        }else{
          message.error(action + '分类失败')
          this.category = {}////////////////////////////////////////////////////////////
        }
      }
    })  
  }

  handleCancel = () => {
    this.form.resetFields()
    this.category = {} ///////////////////////////////////////////////////////
    this.setState({
      showStatus:0,
    })
  }

  componentWillMount(){
    this.initColumns()
  }

  componentDidMount(){
    this.getCategorys()
  }

  render() {
    const { categorys, showStatus, loading } = this.state

    // 读取更新的分类名称
    const category = this.category || {}
    console.log(category)
    // Card右上角的结构
    const extra = (
      <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
        <Icon type="plus"/>
        添加
      </Button>
    )
    return (
      <Card extra={extra} >
        <Table
          rowKey="_id"
          columns={this.columns}
          dataSource={categorys}
          bordered={true}
          loading={loading}
          pagination={{ defaultPageSize: 4, showQuickJumper: true}}
        />
        <Modal
          title={showStatus === 1 ? '添加分类':'修改分类'}
          visible={showStatus !==0 }
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         <AddUpdateForm setForm = {form =>{this.form = form}} categoryName = {category.name}/>
        </Modal>
      </Card>
    )
  }
}

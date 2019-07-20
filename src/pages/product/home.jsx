import React, { Component } from 'react'
import {Card,Button,Icon,Input,message,Table,Select} from 'antd'
import throttle from 'lodash.throttle'

import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from "../../utills/constants";
import memoryUtils from '../../utills/memoryUtils.js';
const {Option} = Select

export default class ProductHome extends Component {
    state = {
        loading:false,
        products:[],
        total: 0, // 商品的总数量
        searchType:'productName',
        searchName:''
      }
      //更新上下架状态
      updateStatus = throttle(async (productId,status)=>{
        status = status===1?2:1
        // console.log(status)
        const result = await reqUpdateStatus(productId,status)
        if(result.status === 0){
          message.success('商品状态更新完成')
          this.getProducts(this.pageNum)
        }else{
          message.error('商品状态更新失败')
        }
      },2000)
      //获取表格columns关系
      initColumns =()=>{
        this.columns = [
          {
            title: '商品名称',
            dataIndex: 'name',
          },
          {
            title: '商品描述',
            dataIndex: 'desc',
          },
          {
            title: '价格',
            dataIndex: 'price',
            render:(price)=>'￥'+price
          },
          {
            title: '状态',
            render:({_id,status})=>{
              let butText = '下架'
              let text  = '出售'
              if(status===2){
                butText = '上架'
                text  = '已下架'
              }
              return(
                <span>
                  <Button type='primary' style={{margin:'0 20px'}} onClick={()=>{this.updateStatus(_id,status)}}>{butText}</Button>
                  <span>{text}</span>
                </span>
              )
            }
          },
          {
            title: '操作',
            render:(product)=>(
              <span>
                <LinkButton 
                onClick={()=>{
                  memoryUtils.product = product
                  this.props.history.push('/product/detail')
                }}
                >
                详情</LinkButton>  
                <LinkButton onClick={()=>{  
                  memoryUtils.product = product 
                  this.props.history.push('/product/addupdate')}}
                >
                修改</LinkButton>
              </span>
            )
          },
        ];
      }
      //获取商品列表
      getProducts = async (pageNum)=>{
        this.pageNum = pageNum
        const {searchName,searchType} = this.state
        this.setState({loading:true})
        let result
        if(!this.isSearch){
          result = await reqProducts(pageNum,PAGE_SIZE)
        }else{
          result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        }
       
        // console.log(result)
        this.setState({loading:false})
        if(result.status === 0){
          const {list,total} = result.data
          this.setState({
            products:list,
            total, 
          })
        }
      }
      componentWillMount(){
        this.initColumns()
      }
      componentDidMount(){
        this.getProducts(1)
      }
      render() {
        const {loading,products,total,searchType,searchName} = this.state
        const title = (
          <span>
            <Select value={searchType} style={{width:'200px'}} onChange={(value)=>this.setState({searchType:value})}>
              <Option value='productName'>按名称查找</Option>
              <Option value='productDesc'>按描述查找</Option>
            </Select>
            <Input placeholder='关键字' style={{width:'200px',margin:'0 10px'}} value={searchName} onChange={(event)=>this.setState({searchName:event.target.value})} />
            <Button type='primary' onClick={()=>{
              this.isSearch = true
              this.getProducts(1)
            }}
            >
            搜索</Button>
          </span>
        )
        const extra = (
          <span>
            <Button type='primary' onClick={()=>{
                  memoryUtils.product = {} 
                  this.props.history.push('/product/addupdate')}}>
            <Icon type='plus'/>
            添加商品</Button>
          </span>
        )
        
        return (
          <Card title={title} extra={extra}>
            <Table
              rowKey="_id"
              columns={this.columns}
              dataSource={products}
              bordered={true}
              loading={loading}
              pagination={{ total, current:this.pageNum,defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange:this.getProducts}}
            />
          </Card>
        )
      }
}

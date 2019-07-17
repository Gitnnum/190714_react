import React, { Component } from 'react'
import {Card,Button,Icon,Input,message,Table,Select} from 'antd'

import {reqProducts} from '../../api'
import LinkButton from '../../components/link-button'
const {Option} = Select

export default class ProductHome extends Component {
    state = {
        loading:false,
        products:[],
        total: 0, // 商品的总数量
      }
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
            dataIndex: 'status',
            render:(status)=>{
              let butText = '下架'
              let text  = '出售'
              if(status===2){
                butText = '上架'
                text  = '已下架'
              }
              return(
                <span>
                  <Button type='primary' style={{margin:'0 20px'}}>{butText}</Button>
                  <span>{text}</span>
                </span>
              )
            }
          },
          {
            title: '操作',
            render:(Product)=>(
              <span>
                <LinkButton>详情</LinkButton>  
                <LinkButton>修改</LinkButton>
              </span>
            )
          },
        ];
      }
      //获取商品列表
      getProducts = async (pageNum)=>{
        this.setState({loading:true})
        const result = await reqProducts(pageNum,2)
        console.log(result)
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
        const {loading,products,total} = this.state
        const title = (
          <span>
            <Select value='1' style={{width:'200px'}}>
              <Option value='1'>按名称查找</Option>
              <Option value='2'>按描述查找</Option>
            </Select>
            <Input placeholder='关键字' style={{width:'200px',margin:'0 10px'}} />
            <Button type='primary'>搜索</Button>
          </span>
        )
        const extra = (
          <span>
            <Button type='primary'>
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
              pagination={{ total, defaultPageSize: 2, showQuickJumper: true}}
            />
          </Card>
        )
      }
}

import React, { Component } from 'react'
import {Card,Icon,List} from 'antd'
import {Redirect} from 'react-router-dom'

import LinkButton from '../../components/link-button'
import memoryUtils from '../../utills/memoryUtils.js'
import {reqCategoryById} from '../../api'
import {BASE_IMG} from '../../utills/constants'
const Item  = List.Item
export default class ProductDetail extends Component {
    state={
        categoryName:''
    }
    //获取分类请求
    getCategoryId = async (categoryId)=>{
        const result = await reqCategoryById(categoryId)
        if(result.status === 0){
            const categoryName = result.data.name
            this.setState({
                categoryName
            })
        }
    }
    componentDidMount(){
        const product = memoryUtils.product
        if(product._id){//避免用户直接通过地址栏访问导致product没有值，报错
            this.getCategoryId(product.categoryId)
        }      
    }
    render() {
        const {categoryName} = this.state
        const product = memoryUtils.product
        if (!product || !product._id) {
        return <Redirect to="/product"/>
        }
        const title =(
            <span style={{fontSize:'20px'}}>
                <LinkButton style={{width:'20px',margin:'0 20px'}} onClick={()=>{this.props.history.goBack()}}>
                    <Icon type='arrow-left'></Icon>
                </LinkButton>
                商品详情
            </span>
        )
        return (
            <Card title={title} className='detail'>
                <List>
                    <Item>
                        <span className='default-left'>商品名称：</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className='default-left'>商品描述：</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className='default-left'>商品价格：</span>
                        <span>{product.price}元</span>
                    </Item>
                    <Item>
                        <span className='default-left'>商品分类：</span>
                        <span>{categoryName}</span>
                    </Item>
                    <Item>
                        <span className='default-left'>商品图片：</span>
                        <span>
                            {product.imgs.map(item => <img className="detail-img" key={item} src={BASE_IMG + item} alt="img" />)}
                        </span>
                    </Item>
                    <Item>
                        <span className='default-left'>商品详情：</span>
                        <div dangerouslySetInnerHTML={{ __html: product.detail}}></div>
                    </Item>
                </List>
            </Card>
        )
    }
}

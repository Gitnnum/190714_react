import React, { Component } from 'react'
import {Card,Icon,Form,Button,Select,Input} from 'antd'

import LinkButton from '../../components/link-button'
import memoryUtils from '../../utills/memoryUtils.js'
import PicturesWall from './pictureswall'
import {reqCategorys} from '../../api'
const Item  = Form.Item
const Option = Select.Option
class ProductAddUpdate extends Component {
    state = {
        categorys:[]
    }
    //获取分类信息
    getCategorys = async ()=>{
        const result  = await reqCategorys()
        if(result.status === 0){
            const categorys = result.data
            this.setState({
                categorys
            })
        }
    }
    //自定义价格验证规则
    validatePrice = (rule,value,callback)=>{
        if(value === ''){
            callback()
        }else if(value * 1 < 0){
            callback('价格不能为负值')
        }else{
            callback()
        }
    }
    //提交回调
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            //发送请求
            const {name, desc, price, categoryId} = values
            console.log('发送请求', name, desc, price, categoryId)
          }
        });
      };
    componentWillMount(){
        this.product = memoryUtils.product
        this.isUpdate = !!this.product._id//定义标识，如果是更新就是true
    }
    componentDidMount(){
        this.getCategorys();
    }
    render() {
        const product = this.product
        const {categorys} = this.state
        const title =(
            <span style={{fontSize:'20px'}}>
                <LinkButton style={{width:'20px',margin:'0 20px'}} onClick={()=>{this.props.history.goBack()}}>
                    <Icon type='arrow-left'></Icon>
                </LinkButton>
                {this.isUpdate?'修改商品':'添加商品'}             
            </span>
        )
        //Form布局
        const formLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
          }
        const {getFieldDecorator} = this.props.form 
        return (
            <Card title={title}>
                <Form {...formLayout} onSubmit={this.handleSubmit}>
                    <Item label = '商品名称'>
                        {getFieldDecorator('name', {
                        initialValue: product.name,
                        rules: [
                            { required: true, message: '必须输入商品名称!' }
                        ],
                        })(<Input placeholder="商品名称"/>)}
                    </Item>
                    <Item label="商品描述">
                        {getFieldDecorator('desc', {
                        initialValue: product.desc,
                        rules: [
                            { required: true, message: '必须输入商品描述!' }
                        ],
                        })(<Input placeholder="商品描述"/>)}
                    </Item>
                    <Item label="商品价格">
                        {getFieldDecorator('price', {
                        initialValue: product.price,
                        rules: [
                            { required: true, message: '必须输入价格!' },
                            { validator: this.validatePrice }
                        ],
                        })(<Input type="number" placeholder="商品价格" addonAfter="元"/>)}
                    </Item>
                    <Item label="商品分类">
                        {getFieldDecorator('categoryId', {
                        initialValue: product.categoryId || '',
                        rules: [
                            { required: true, message: '必须输入商品分类!' }
                        ],
                        })(
                        <Select>
                            <Option value=''>未选择</Option>
                            {
                                categorys.map (item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                            // categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                            }
                        </Select>
                        )}
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall />
                    </Item>
                    <Item label="商品详情">
                        <div>商品详情组件</div>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(ProductAddUpdate)
import React, { Component } from 'react'
import { Form,Input } from 'antd'
import PropTypes from 'prop-types'

class AddUpdateForm extends Component {
     //参数限定
     static propTypes = {
        setForm: PropTypes.func.isRequired,
        categoryName: PropTypes.string,
      }
     componentWillMount(){
         this.props.setForm(this.props.form)
     }
    render() {
        const { getFieldDecorator } = this.props.form
        const {categoryName} = this.props
        return (
            <Form>
                <Form.Item>
                    {getFieldDecorator('categoryName',{
                        initialValue:categoryName || '',
                        rules:[{required: true, message: '商品名称必填' }]
                    })(
                        <Input placeholder='请输入分类名称'/>
                    )}                  
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddUpdateForm)
import React, { Component } from 'react'
import {Form, Input,Select} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option
class AddUpdateUser extends Component {
    static propTypes = {
        setForm:PropTypes.func.isRequired,
        user:PropTypes.object,
        roles:PropTypes.array
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const formItemLayout={
            labelCol: { span: 4 },
            wrapperCol: { span: 15 },     
        }
        const {user,roles} = this.props
        // console.log('user',user)
        const {getFieldDecorator} = this.props.form
        return (
            <Form {...formItemLayout}>
                <Item label="用户名">
                {
                    getFieldDecorator('username', {
                    initialValue: user.username,
                    rules: [
                        { required: true, message: '必须输入用户名' }
                    ]
                    })(
                    <Input placeholder='请输入用户名'/>
                    )
                }
                </Item>
                {!user._id ?  <Item label="密码">
                {
                    getFieldDecorator('password', {
                    initialValue: user.passwod,
                    rules: [
                        { required: true, message: '必须输入密码' }
                    ]
                    })(
                    <Input type='password' placeholder='请输入密码'/>
                    )
                }
                </Item> : null}
                <Item label="手机号">
                {
                    getFieldDecorator('phone', {
                    initialValue: user.phone,
                    rules: [
                        { required: true, message: '必须输入手机号' }
                    ]
                    })(
                    <Input placeholder='请输入手机号'/>
                    )
                }
                </Item>
                <Item label="邮箱">
                {
                    getFieldDecorator('email', {
                    initialValue: user.email,
                    rules: [
                        { required: true, message: '必须输入邮箱' }
                    ]
                    })(
                    <Input placeholder='请输入邮箱'/>
                    )
                }
                </Item>
                <Item label="角色">
                {
                    getFieldDecorator('role_id', {
                    initialValue: user.role_id || '',
                    rules: [
                        { required: true, message: '必须输入角色' }
                    ]
                    })(
                    <Select >
                        <Option value=''>未选择</Option>
                        {roles.map((role)=> <Option key={role._id} value={role._id}>{role.name}</Option>)}
                    </Select>
                    )
                }
                </Item>
            </Form>  
        )
    }
}
export default  Form.create()(AddUpdateUser)

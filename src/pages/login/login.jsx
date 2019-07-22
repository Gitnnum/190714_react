import React,{Component} from 'react'
import { Form, Icon, Input, Button  } from 'antd';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import './login.less'
import logo from '../../assets/images/logo.png'
import {login} from '../../redux/actions'
class Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields( async (err, {username,password}) => {
            if (!err) {
              this.props.login(username,password)
            }
        })
      };
    validatePwd = (rule,value,callback) =>{
        value = value.trim()
        if(!value){
            callback('密码为必填')
        }else if(value.length < 4){
            callback('密码不能小于4位')
        }else if(value.length > 12){
            callback('密码不能大于12位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字或下划线组成')
        }else{
            callback()//验证通过
        }
    }
    render(){
        // const user = JSON.parse(localStorage.getItem('user_key')  || '{}')
        // const user = storageUtills.getUser()
        const user = this.props.user
        if(user._id){
            return <Redirect to='/home'/>
        }
        const error = user.error
        const { getFieldDecorator } = this.props.form
        return(
            <div className='login'>
                <div className="login-header">
                    <img src={logo} alt="资源加载失败"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    {error ? <div>{error}</div>:null}
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {
                            getFieldDecorator('username',{
                                initialValue:'',//默认值设定
                                rules:[{required:true,whitespace:true,message:'用户名必填'},
                                {min:4,message:'用户名不能小于4位'},
                                {max:12,message:'用户名不能大于12位'},
                                {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'},
                            ]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />
                            )
                        }                           
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    initialValue:'',
                                    rules:[{validator:this.validatePwd}]
                                })(
                                    <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                                )      
                            }                    
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                    );
                </div>
            </div>
        )
    }
}
const WrapperForm = Form.create()(Login)
export default connect(
    state=>({user:state.user}),
    {login}
)(WrapperForm)
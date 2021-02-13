import React, { useState } from 'react'
import { Button, Card, Input, Spin, message } from 'antd';
import 'antd/dist/antd.css';
import '../Static/css/Login.css';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios'
import servicePath from '../config/apiUrl'

export default function Login(props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    setIsLoading(true)
    //判断用户名,密码是否为空
    if (!userName) {
      setTimeout(() => {
        message.error('用户名不能为空')
        setIsLoading(false)
      }, 500)
      return false
    } else if (!password) {
      setTimeout(() => {
        message.error('密码不能为空')
        setIsLoading(false)
      }, 500)
      return false
    }
    let dataProps = {
      'userName': userName,
      'password': password
    }

    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
    }).then(
      res => {
        setIsLoading(false)
        if (res.data.data === '登录成功') {
          localStorage.setItem('openId', res.data.openId)
          props.history.push('/index')
        } else {
          message.error('用户名密码错误')
        }
      }
    )
  }

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Yang's Blog  System" bordered={true} style={{ width: 400, textAlign: "center" }} >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <br /><br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<EditOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <br /><br />
          <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
        </Card>
      </Spin>
    </div>
  )
}

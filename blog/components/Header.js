import React, { useState } from 'react'
import '../static/style/components/header.css'
import Router from 'next/router'
import Link from 'next/link'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, FieldTimeOutlined, FolderOpenOutlined } from '@ant-design/icons';
const Header = () => {
  // const handleClick = (e) => {
  //   // current = e.key
  //   if (e.key == 'home') {
  //     Router.push('/')
  //   }
  //   if (e.key == 'classify') {
  //     Router.push('/list')
  //   }
  // }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">yang</span>
          <span className="header-txt">ceshi测试测试啥所所</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={14} lg={9} xl={6}>
          <Menu mode="horizontal"
          // onClick={handleClick}
          >
            <Menu.Item key="home">
              <HomeOutlined />
              <Link href='/'> 首页</Link>
            </Menu.Item>
            <Menu.Item key="classify">
              <FolderOpenOutlined />
              <Link href='/classify'> 分类</Link>
            </Menu.Item>
            <Menu.Item key="time">
              <FieldTimeOutlined />
              <Link href='/directory'> 时间线</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header
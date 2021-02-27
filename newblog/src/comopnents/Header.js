import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom' //引入withRouter
import '../static/style/components/header.css'
import { Row, Col, Menu, Drawer } from 'antd'
import { HomeOutlined, FieldTimeOutlined, FolderOpenOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import SearchContent from '../comopnents/Search'

const Header = (props) => {
  const [visible, setVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false) // 抽屉加载

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleMwnu = (item) => {
    console.log(item)
    if (item.key === "/search") {
      handleOnopen()
      console.log('111')
    } else {
      console.log('222')
      props.history.push(item.key)
      onClose()
    }
  }
  const handleOnClose = () => {
    setSearchVisible(false)
  }
  const handleOnopen = () => {
    setSearchVisible(true)
  }
  const enterDetail = () => {
    setSearchVisible(false)
    setVisible(false)
  }
  return (
    <div className="header">
      <Row >
        <Col xs={18} sm={18} md={10} lg={10} xl={10} className="header_main">
          <span className="header-logo">yang</span>
          <span className="header-txt">杨雨翔的小站</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={10} lg={10} xl={10} offset={3}>
          <Menu mode="horizontal" onClick={handleMwnu}
          >
            <Menu.Item key="/">
              <HomeOutlined />首页
            </Menu.Item >
            <Menu.Item key="/classify">
              <FolderOpenOutlined />分类
            </Menu.Item>
            <Menu.Item key="/time">
              <FieldTimeOutlined />时间线
            </Menu.Item>
            <Menu.Item key="/search" >
              <SearchOutlined /> 站内搜索
          </Menu.Item>
          </Menu>
        </Col>
        <div className="menu_image">
          <MenuOutlined className="menu_image" onClick={showDrawer} />
        </div>
      </Row>
      <Drawer
        title="导航"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Menu
          // defaultSelectedKeys={['1']}
          mode="inline"
          onClick={handleMwnu}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            首页
          </Menu.Item>
          <Menu.Item key="/classify" icon={<FolderOpenOutlined />}>
            分类
          </Menu.Item>
          <Menu.Item key="/time" icon={<FieldTimeOutlined />}>
            时间线
          </Menu.Item>
          <Menu.Item key="/search" icon={<SearchOutlined />}>
            站内搜索
          </Menu.Item>
        </Menu>
      </Drawer>
      <SearchContent value={searchVisible} onClose={handleOnClose} enterDetail={enterDetail} />
    </div>
  )
}

export default withRouter(Header)
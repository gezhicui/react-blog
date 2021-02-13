import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom' //引入withRouter
import '../static/style/components/header.css'
import { Row, Col, Menu, Drawer } from 'antd'
import { HomeOutlined, FieldTimeOutlined, FolderOpenOutlined, MenuOutlined } from '@ant-design/icons';
const Header = (props) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleMwnu = (item) => {
    console.log(item)
    props.history.push(item.key)
    onClose()
  }
  return (
    <div className="header">
      <Row >
        <Col xs={18} sm={18} md={10} lg={10} xl={10} className="header_main">
          <span className="header-logo">yang</span>
          <span className="header-txt">杨雨翔的博客小站</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={10} lg={10} xl={10} offset={3}>
          <Menu mode="horizontal"
          >
            <Menu.Item key="home">
              <HomeOutlined />
              <Link to='/'>首页</Link>
            </Menu.Item>
            <Menu.Item key="classify">
              <FolderOpenOutlined />
              <Link to='/classify'>分类</Link>
            </Menu.Item>
            <Menu.Item key="time">
              <FieldTimeOutlined />
              <Link to='/time'>时间线</Link>
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
        </Menu>
      </Drawer>

    </div>
  )
}

export default withRouter(Header)
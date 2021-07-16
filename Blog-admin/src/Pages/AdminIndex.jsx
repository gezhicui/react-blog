import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import '../Static/css/AdminIndex.scss';
import { SettingOutlined, PieChartOutlined, FolderOpenOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Route } from "react-router-dom";
import ArticleList from './ArticleList'
import AddArticle from './AddArticle';
import PhotoBucket from './PhotoBucket'



const { Content, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props) {
  console.log(props);
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };
  const handleClickMenu = e => {
    console.log(e);
    // if (e.key === 'addArticle') {
    //   props.history.push('/index/add')
    // } else {
    //   props.history.push('/index/list')
    // }
    props.history.push(e.key)
  }
  const handleEditSystem = () => {
    sessionStorage.removeItem('token')
    props.history.push('/')
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="2"
            onClick={handleClickMenu}
            title={
              <span>
                <SettingOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="/index/add">添加文章</Menu.Item>
            <Menu.Item key="/index/list">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="/index/upload" onClick={handleClickMenu}>
            <FolderOpenOutlined />
            <span>图床</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className="admin-main">
          <div className="admin-breadcrumb">
            <Breadcrumb style={{ margin: '8px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <Button
              onClick={handleEditSystem}
              icon={<PoweroffOutlined />}
              shape="round"
            >注销</Button>
          </div>
          <div className="admin-main-content">
            <div>
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/add" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list" exact component={ArticleList} />
              <Route path="/index/upload" exact component={PhotoBucket} />
            </div>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>yangyuxiang.ltd</Footer> */}
      </Layout>
    </Layout>
  )

}

export default AdminIndex

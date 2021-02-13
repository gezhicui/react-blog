import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, List, Affix, Breadcrumb, Spin, Pagination } from 'antd'
import { FolderOpenOutlined, FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import 'markdown-navbar/dist/navbar.css';
import marked from 'marked'
import hljs from "highlight.js";
import '../static/style/pages/home.css'

import servicePath from '../config/apiUrl'
import Author from '../comopnents/Author'


const Home = (props) => {
  const [mylist, setMylist] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotel] = useState(0)
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  useEffect(() => {
    let typeId = props.match.params.id
    async function getData() {
      setLoading(true)
      await axios({
        method: 'get',
        url: servicePath.getPagingTypeIdArticle + typeId,
        params: {
          pageNum: currentPage
        }
      }).then((res) => {
        setMylist(res.data.data)
        setTotel(res.data.count)
        setLoading(false)
      })
    }
    getData()
  }, [currentPage, props.match.params.id])
  const paginationChange = (page) => {
    console.log(page);
    setCurrentPage(page)
  }
  return (
    <div>
      <Spin spinning={loading}>
        <Row type="flex" justify="center">
          <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Affix offsetTop={60}>
              <Author></Author>
            </Affix>
          </Col>
          <Col className="comm-right" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <Breadcrumb className="bread-crumb">
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item><a href="/classify">分类</a></Breadcrumb.Item>
              <Breadcrumb.Item>{mylist[0] ? mylist[0].typeName : ''}</Breadcrumb.Item>
            </Breadcrumb>
            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link to={{ pathname: '/detail/' + item.id }}>
                      {item.title}
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><FieldTimeOutlined />{item.addTime}</span>
                    <span><FolderOpenOutlined /> {item.typeName}</span>
                    <span><UserOutlined />{item.view_count}人</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                </List.Item>
              )}
            />
            <div className='pagination'>
              <Pagination
                current={currentPage}
                responsive={true}
                onChange={paginationChange}
                showSizeChanger={false}
                pageSize={5}
                total={total} />
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  )
}


export default Home
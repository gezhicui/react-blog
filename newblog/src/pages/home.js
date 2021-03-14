import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, List, Affix, Breadcrumb, Button, Tag, Spin, Pagination } from 'antd'
import { FolderOpenOutlined, FieldTimeOutlined, UserOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import 'markdown-navbar/dist/navbar.css';
import marked from 'marked'
import hljs from "highlight.js";
import '../static/style/pages/home.css'
import servicePath from '../config/apiUrl'
import Author from '../comopnents/Author'
import 'animate.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
const Home = (props) => {
  const [mylist, setMylist] = useState()
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
    async function getPageData() {
      setLoading(true)
      await axios({
        method: 'get',
        url: servicePath.getPagingArticleList,
        params: {
          pageNum: currentPage
        }
      }).then((res) => {
        console.log(res.data.data)
        setMylist(res.data.data)
        setTotel(res.data.count)
        setLoading(false)
      })
    }
    getPageData()
  }, [currentPage])
  const readMore = (item) => {
    props.history.push('/detail/' + item.id)
  }
  const paginationChange = (page) => {
    setCurrentPage(page)
    document.documentElement.scrollTop = 0
  }
  return (
    <div>
      {/* 主体区域 */}
      <Spin spinning={loading}>
        <Row type="flex" justify="center" className='comm-row'>

          <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4}>
            <ReactCSSTransitionGroup
              transitionEnter={true}
              transitionLeave={true}
              transitionEnterTimeout={2500}
              transitionLeaveTimeout={1500}
              transitionName="animated"
            >
              <div key="amache" className="animate__animated animate__fadeInLeft">

                <Affix>
                  <div >
                    <Author></Author>
                  </div>
                </Affix>
              </div>
            </ReactCSSTransitionGroup>
          </Col>

          <Col xs={24} sm={24} md={16} lg={18} xl={14}  >
            <ReactCSSTransitionGroup
              transitionEnter={true}
              transitionLeave={true}
              transitionEnterTimeout={2500}
              transitionLeaveTimeout={1500}
              transitionName="animated"
            >
              <div key="amache" className="animate__animated animate__fadeInRight comm-right">
                <Breadcrumb className="bread-crumb">
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>最新日志</Breadcrumb.Item>
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
                      <div className="list-icon center">
                        <span><FieldTimeOutlined />{item.addTime}</span>
                        <span><FolderOpenOutlined /> {item.typeName}</span>
                        <span><UserOutlined />{item.view_count}人</span>
                        {
                          item.status && item.status === 1 ?
                            <span><Tag color="magenta" icon={<VerticalAlignTopOutlined />}>置顶</Tag></span>
                            : ''
                        }
                      </div>
                      <div className="list-context"
                        dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                      ></div>
                      <div className="list-button">
                        <Button onClick={() => readMore(item)}>阅读全文</Button>
                      </div>
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
              </div>
            </ReactCSSTransitionGroup>
          </Col>
        </Row>
      </Spin>
    </div>
  )
}


export default Home
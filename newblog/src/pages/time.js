import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Affix, Breadcrumb, Timeline, Spin, Tag, message } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons';

import servicePath from '../config/apiUrl'
import Author from '../comopnents/Author'

import 'animate.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Home = (props) => {
  const List = useRef([])
  const Page = useRef(1)
  const [mylist, setMylist] = useState(List.current)
  const [state, setstate] = useState(1)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getProjectList()
    document.documentElement.scrollTop = 0
    document.addEventListener('scroll', onScrollHandle)
    return outScrollHandle;
  }, [])
  function getProjectList() {
    setstate(0)
    setLoading(true)
    axios({
      url: servicePath.getArticleTimeList,
      params: {
        pageNum: Page.current
      }
    }).then((res) => {
      if (res.data.data.length === 0) {
        message.warning('暂时没有更多了~');
        setLoading(false)
        return
      }
      let list = [...List.current, ...res.data.data]
      List.current = list
      Page.current = Page.current + 1
      setMylist(List.current)
      setLoading(false)
      setstate(1)
    })
  }
  function onScrollHandle() {
    let scroll = document.documentElement.scrollTop + document.documentElement.clientHeight
    let height = document.documentElement.scrollHeight - 1
    if (scroll > height && state) {
      console.log('到底部了')
      getProjectList()
    }
  }
  function outScrollHandle() {
    document.removeEventListener('scroll', onScrollHandle)
  }
  return (
    <div>
      <Spin spinning={loading}>
        <Row type="flex" justify="center">
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
                  <Author></Author>
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
                  <Breadcrumb.Item>时间线</Breadcrumb.Item>
                </Breadcrumb>
                <Timeline mode="alternate" style={{ 'marginTop': '20px' }}>
                  {
                    mylist.map((item, index) => {
                      return (
                        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />} color="gray" key={index}>
                          {item.addTime}
                          {
                            item.status ? <Tag color="magenta" style={{ margin: 10 }}>置顶</Tag> : ''
                          }
                          <br />
                          <Link
                            to={'/detail/' + item.id
                            }>
                            {item.title}
                          </Link>

                        </Timeline.Item>
                      )
                    })}

                </Timeline>
              </div>
            </ReactCSSTransitionGroup>
          </Col>
        </Row>
      </Spin>
    </div >
  )
}


export default Home
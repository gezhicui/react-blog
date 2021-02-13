import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Affix, Breadcrumb, Timeline, Spin, Tag } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons';

import servicePath from '../config/apiUrl'
import Author from '../comopnents/Author'

import 'animate.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Home = (props) => {
  const [mylist, setMylist] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getProjectList() {
      setLoading(true)
      await axios({
        url: servicePath.getArticleList,
      }).then((res) => {
        setMylist(res.data.data)
        setLoading(false)
      })
    }
    getProjectList()
  }, [])
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
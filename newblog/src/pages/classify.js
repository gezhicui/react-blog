import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Affix, Card, Breadcrumb, Spin } from 'antd'

import '../static/style/pages/classify.css'

import servicePath from '../config/apiUrl'
import Author from '../comopnents/Author'


import 'animate.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const { Meta } = Card;
const Home = (props) => {
  const [typelist, setTypelist] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function getData() {
      await axios({
        method: 'get',
        url: servicePath.getTypeInfo,
      }).then((res) => {
        setTypelist(res.data.data)
        setLoading(false)
      })
    }
    getData()
  }, [])
  const selectType = (item) => {
    props.history.push('/classifyart/' + item.id)
  }
  return (
    <div>
      <Spin spinning={loading}>
        {/* 主体区域 */}
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
                  <Breadcrumb.Item>分类</Breadcrumb.Item>
                </Breadcrumb>
                <div className="card">
                  {

                    typelist.map(item => {
                      return (
                        <Card
                          hoverable
                          style={{ width: 230 }}
                          cover={<img alt="example" src={item.imgUrl} />}
                          className="card-item"
                          onClick={() => selectType(item)}
                          key={item.id}
                        >
                          <Meta title={item.typeName} style={{ 'textAlign': 'center' }} />
                        </Card>
                      )
                    })

                  }
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
import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios'
import { Row, Col, List, Affix } from 'antd'
import { FolderOpenOutlined, FieldTimeOutlined, UserOutlined } from '@ant-design/icons';

import servicePath from '../config/apiUrl'

import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

const Home = (list) => {
  const [mylist, setMylist] = useState(list.data)
  return (
    <div>
      <Head>
        <title>Yang's Blog</title>
      </Head>

      {/* 头部导航栏 */}
      <Header />

      {/* 主体区域 */}
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Affix offsetTop={60}>
            <Author></Author>
          </Affix>
        </Col>
        <Col className="comm-right" xs={24} sm={24} md={16} lg={18} xl={14}  >
          时间线
        </Col>
      </Row>

      {/* 底部区域 */}
      <Footer></Footer>
    </div>
  )
}
Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        // console.log('远程获取数据结果:', res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home
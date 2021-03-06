import React, { useState, useEffect } from 'react';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { List, Row, Col, Modal, message, Button, Spin } from 'antd';
import '../Static/css/ArticleList.css'



const { confirm } = Modal

function ArticleList(props) {

  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotel] = useState(0)
  const [loading, setLoading] = useState(false)

  const [list, setList] = useState([])
  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  //得到文章列表
  const getList = () => {
    setLoading(true)
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      params: {
        pageNum: currentPage
      }
    }).then(
      res => {
        console.log(res)
        setList(res.data.list)
        setTotel(res.data.count)
        setLoading(false)
      }
    )
  }

  //删除文章
  const delArticle = id => {
    confirm({
      title: '确定删除吗？',
      content: '文章将会被永久删除，无法恢复！',
      onOk() {
        axios(servicePath.delArticle + id).then(
          res => {
            message.success('文章删除成功')
            getList()
          }
        )
      },
      onCancel() {
        message.success('取消成功')
      },
    })
  }

  // 修改文章的跳转方法
  const updateArticle = (id) => {
    props.history.push('/index/add/' + id)
  }
  // 更改页面
  const paginationChange = (page) => {
    setCurrentPage(page)
    document.documentElement.scrollTop = 0
  }
  return (
    <div>
      <Spin spinning={loading}>
        <List
          pagination={{
            current: currentPage,
            responsive: true,
            onChange: paginationChange,
            showSizeChanger: false,
            pageSize: 10,
            total: total,
          }}
          //列表头
          header={
            <Row className="list-item">
              <Col span={8}>
                <b>标题</b>
              </Col>
              <Col span={3}>
                <b>类别</b>
              </Col>
              <Col span={3}>
                <b>发布时间</b>
              </Col>
              <Col span={3}>
                <b>浏览量</b>
              </Col>
              <Col span={4}>
                <b>操作</b>
              </Col>
              <Col span={2}>
                <b>状态</b>
              </Col>
            </Row>

          }
          bordered            //列表显示边框
          dataSource={list}   //数据源
          renderItem={item => (
            <List.Item>
              <Row className="list-item">
                <Col span={8}>
                  {item.title}
                </Col>
                <Col span={3}>
                  {item.typeName}
                </Col>
                <Col span={3}>
                  {item.addTime}
                </Col>
                <Col span={3}>
                  {item.view_count}
                </Col>

                <Col span={4}>
                  <Button type="primary" onClick={() => updateArticle(item.id)}>修改</Button>&nbsp;

                              <Button onClick={() => delArticle(item.id)}>删除</Button>
                </Col>
                <Col span={2}>
                  {item.status ? '置顶' : '未置顶'}
                </Col>
              </Row>

            </List.Item>
          )}
        />
        {/* <div className='pagination'>
          <Pagination
            current={currentPage}
            responsive={true}
            onChange={paginationChange}
            showSizeChanger={false}
            pageSize={10}
            total={total} />
        </div> */}
      </Spin>
    </div>

  )

}

export default ArticleList
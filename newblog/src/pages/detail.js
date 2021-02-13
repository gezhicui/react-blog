import React, { useState, useEffect } from 'react'
import { Row, Col, Breadcrumb, Affix, Spin } from 'antd'
import { FolderOpenOutlined, FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios'
import 'markdown-navbar/dist/navbar.css';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import servicePath from '../config/apiUrl'

import Tocify from '../comopnents/tocify.tsx'
import Author from '../comopnents/Author'
import '../static/style/pages/detail.css'

const Detail = (props) => {
  const [articleContent, setArticleContent] = useState()
  const [loading, setLoading] = useState(false)

  const tocify = new Tocify(props.match.params.id)
  const renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
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
  const addViewCount = async () => {
    await axios({
      method: 'post',
      url: servicePath.addArticleViewCount,
      data: {
        id: articleContent.id
      },
      // header: { 'Access-Control-Allow-Origin': '*' },
    }).then(res => {
      console.log(res)
    })

  }
  if (articleContent !== undefined) {
    addViewCount()
  }
  useEffect(() => {
    setLoading(true)
    async function getData() {
      let id = props.match.params.id
      console.log(props.match.params.id)
      await axios({
        method: 'get',
        url: servicePath.getArticleById + id,
      }).then((res) => {
        console.log(res.data.data)
        setArticleContent(res.data.data[0])
        setLoading(false)
      })
    }
    getData()
  }, [props.match.params.id])
  let html
  if (articleContent !== undefined) {
    html = marked(articleContent.article_content)
  }

  return (
    <>
      <Spin spinning={loading}>
        <Row type="flex" justify="center">

          <Col className="comm-left" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <br />
            <Affix offsetTop={70}>
              <div className="detailed-nav comm-box">
                <div className="nav-title">文章目录</div>
                {tocify && tocify.render()}
              </div>
            </Affix>
          </Col>
          <Col className="comm-right" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <Breadcrumb className="bread-crumb">
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>最新日志</Breadcrumb.Item>
                <Breadcrumb.Item>{articleContent && articleContent.title}</Breadcrumb.Item>
              </Breadcrumb>
              <div>
                <div className="detailed-title">
                  {articleContent && articleContent.title}
                </div>

                <div className="list-icon center">
                  <span><FieldTimeOutlined />  {articleContent && articleContent.addTime}</span>
                  <span><FolderOpenOutlined />  {articleContent && articleContent.typeName}</span>
                  <span><UserOutlined /> {articleContent && articleContent.view_count + 1}人</span>
                </div>

                <div className="detailed-content"
                  dangerouslySetInnerHTML={{ __html: html }}>
                </div>

              </div>

            </div>
          </Col>

        </Row>
      </Spin>
    </>
  )
}

export default Detail
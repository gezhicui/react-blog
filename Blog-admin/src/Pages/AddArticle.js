import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../Static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message, Drawer, Switch } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import moment from 'moment'
const { Option } = Select
const { TextArea } = Input

export default function AddArticle(props) {
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  // const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState('选择类别') //选择的文章类别
  const [status, setStatus] = useState(0) //文章是否置顶
  const [visible, setVisible] = useState(false) //抽屉显示
  useEffect(() => {
    console.log(showDate)
    console.log((new Date(showDate).getTime()).toString().length)
  }, [showDate])
  useEffect(() => {
    getTypeInfo()
    // 获取文章id
    let tmpId = props.match.params.id
    if (tmpId) {
      console.log('hhaha')
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = e => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }
  const changeIntroduce = e => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }
  const switchChange = e => {
    if (e) {
      setStatus(1)
    } else {
      setStatus(0)
    }
  }
  //从中台得到文章类别信息
  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
    }).then(
      res => {
        if (res.data.data === "没有登录") {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          console.log(res.data.data)
          setTypeInfo(res.data.data)
        }
      }
    )
  }
  // 选择文章类别
  const selectTypeHandler = (value) => {
    console.log(value)
    setSelectType(value)
  }

  const saveArticle = () => {
    if (!selectedType) {
      message.error('请选择文章类型')
      return false
    } else if (!articleTitle) {
      message.error('请输入文章名')
      return false
    } else if (!articleContent) {
      message.error('请输入文章内容')
      return false
    } else if (!introducemd) {
      message.error('请输入文章简介')
      return false
    } else if (!showDate) {
      message.error('请输入发布日期')
      return false
    }
    let dataProps = {}    //传递到接口的参数
    const addTime = new Date(showDate).getTime()
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    dataProps.addTime = addTime.toString().length > 10 ? addTime / 1000 : addTime//把字符串转换成时间戳
    dataProps.status = status
    if (articleId === 0) {
      // console.log('articleId=:'+articleId)
      dataProps.view_count = 0
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps
      }).then(
        res => {
          setArticleId(res.data.insertId)
          if (res.data.isSuccess) {
            message.success('文章添加成功')
            closeDrawer()
          } else {
            message.error('文章添加失败')
          }
        }
      )
    } else {
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        header: { 'Access-Control-Allow-Origin': '*' },
        data: dataProps
      }).then(
        res => {
          if (res.data.isSuccess) {
            message.success('文章修改成功')
            closeDrawer()
          } else {
            message.error('文章修改失败')
          }
        }
      )
    }
  }

  const getArticleById = id => {
    axios(servicePath.getArticleById + id, {
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(
      res => {
        let articleInfo = res.data.data[0]
        setArticleTitle(articleInfo.title)
        setArticleContent(articleInfo.article_content)
        console.log(articleInfo);
        let html = marked(articleInfo.article_content)
        setMarkdownContent(html)
        setIntroducemd(articleInfo.introduce)
        let tmpInt = marked(articleInfo.introduce)
        setIntroducehtml(tmpInt)
        setShowDate(articleInfo.addTime)
        setSelectType(articleInfo.typeId)
        setStatus(articleInfo.status)
      }
    )
  }

  const openDrawer = () => {
    setVisible(true)
  }
  const closeDrawer = () => {
    setVisible(false)
  }

  return (
    <div>
      <Row gutter={10}>
        <Col span={24}>
          <Row gutter={10} >
            <Col span={16}>
              <Input
                placeholder="博客标题"
                value={articleTitle}
                onChange={e => setArticleTitle(e.target.value)} />
            </Col>
            <Col span={8}>
              <Select value={selectedType} onChange={selectTypeHandler} className='button-margin'>
                {
                  typeInfo.map((item, index) => {
                    return <Option key={item.id} value={item.id}>{item.typeName}</Option>
                  })
                }
              </Select>
              <Button type="primary" onClick={openDrawer}>前往发布</Button>
            </Col>

          </Row>
          <br />
          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                className="markdown-content"
                value={articleContent}
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
                onPressEnter={changeContent}
              />
            </Col>
            <Col span={12}>
              <div className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}>
              </div>

            </Col>
          </Row>
        </Col>

      </Row>


      <Drawer
        title="发布文章"
        width={720}
        onClose={closeDrawer}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'left',
            }}
          >
            <Button onClick={closeDrawer} className='button-margin'>
              取消
              </Button>
            <Button onClick={closeDrawer} className='button-margin'>
              暂存草稿
              </Button>
            <Button type="primary" onClick={saveArticle} >
              发布文章
              </Button>
          </div>
        }
      >
        <Row>
          <Col span={24}>
            <br />
            <TextArea
              value={introducemd}
              onChange={changeIntroduce}
              onPressEnter={changeIntroduce}
              rows={4}
              placeholder="文章简介"
              className="text-input"
            ></TextArea>
            <br />
            <div className="introduce-html text-input"
              dangerouslySetInnerHTML={{ __html: introducehtml }}>
            </div>
          </Col>

          <Col span={12}>
            <div className="date-select">
              <DatePicker
                onChange={(date, dateString) => setShowDate(dateString)}
                defaultValue={showDate ? moment(showDate * 1000) : ''}
                placeholder="发布日期"
                size="default"
              />
            </div>

          </Col>
          <Col span={12}>
            <div className="date-select switch-input">
              <span style={{ marginRight: 20 }}>是否置顶</span>
              <Switch defaultChecked={status} onChange={switchChange} />
            </div>
          </Col>
        </Row>
      </Drawer>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { List, Input, Drawer } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

import servicePath from '../config/apiUrl'
import '../static/style/components/search.css'

const { Search } = Input

const SearchContent = (props) => {
  const [searchlist, setSearchList] = useState()
  const [placement] = useState()
  const [mylist, setMyList] = useState()
  const onClose = () => {
    props.onClose()
  }
  const handleSearch = (e) => {
    let value = e.target.value
    let a = mylist.filter((item, index, arr) => {
      let reg = '/' + value + '/i'
      let title_boolean = item.title.search(eval(reg)) !== -1
      let article_content_boolean =
        item.content.search(eval(reg)) !== -1
      // let length = document.querySelectorAll('.search_title').length - 1
      // if (arr.length === index + 1) {
      //   for (var j = 0; j <= length; j++) {

      //     document.querySelectorAll('.search_content')[
      //       j
      //     ].innerHTML = document
      //       .querySelectorAll('.search_content')
      //     [j].innerHTML.replace(
      //       /<b style="color:#1e90ff;">|<\/b>/gi,
      //       ""
      //     )
      //       .replace(/#/g, "")
      //       .replace(
      //         eval(reg),
      //         '<b style="color:#1e90ff;">' + value + '</b>'
      //       )
      //     document.querySelectorAll('.search_content')[
      //       j
      //     ].innerHTML = document
      //       .querySelectorAll('.search_content')
      //     [j].innerHTML.substring(
      //       document
      //         .querySelectorAll('.search_content')
      //       [j].innerHTML.search(
      //         '<b style="color:#1e90ff;">'
      //       ) - 3
      //     )
      //   }
      // }
      // if (arr.length === index + 1) {
      //   for (var i = 0; i <= length; i++) {
      //     document.querySelectorAll('.search_title')[
      //       i
      //     ].innerHTML = document
      //       .querySelectorAll('.search_title')
      //     [i].innerHTML.replace(
      //       /<b style="color:#1e90ff;">/gi,
      //       ''
      //     )
      //       .replace(/<\/b>/gi, '')
      //       .replace(
      //         eval(reg),
      //         '<b style="color:#1e90ff;">' + value + '</b>'
      //       )
      //   }
      // }

      return title_boolean || article_content_boolean
    })

    setSearchList(a)

  }
  useEffect(() => {
    async function getProjectList() {
      await axios({
        url: servicePath.getArticleList,
      }).then((res) => {
        console.log(res)
        setMyList(res.data.data)
      })
    }
    getProjectList()
  }, [])
  return (
    <div>
      <Drawer
        title={
          <div>
            <Search
              placeholder="请输入查找内容"
              onSearch={(value) => console.log(value)}
              onChange={handleSearch}
              className="search_input"
            />
          </div>
        }
        placement={placement}
        closable={false}
        onClose={onClose}
        visible={props.value}
        key={placement}

        width="650px"
      >
        <List
          itemLayout="horizontal"
          dataSource={searchlist}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<Link
                  to={{
                    pathname: '/detail/' + item.id,
                    query: { id: item.id },
                  }} >{item.title}</Link>}
                description={item.content}
              />
            </List.Item>
          )}
        />,
      </Drawer>
    </div>
  )
}
export default SearchContent
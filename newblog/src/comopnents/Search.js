import React, { useState } from 'react'
import { List, Input, Drawer } from 'antd'

import { Link } from 'react-router-dom'
import axios from 'axios'

import servicePath from '../config/apiUrl'
import '../static/style/components/search.css'

const { Search } = Input

const SearchContent = (props) => {
  const [searchlist, setSearchList] = useState()
  const [loading, setLoading] = useState(false)
  const [placement] = useState()

  const onClose = () => {
    props.onClose()
  }

  const enterDetail = () => {
    props.enterDetail()
  }
  const searchValue = (value) => {
    setLoading(true)
    axios({
      url: servicePath.getArticleListByValue,
      params: {
        value: value
      }
    }).then((res) => {
      setLoading(false)
      setSearchList(res.data.data)
    }).catch(err => {
      setLoading(false)
    })
  }
  return (
    <div>
      <Drawer
        title={
          <div>
            <Search
              placeholder="请输入查找内容"
              onSearch={searchValue}
              // onChange={handleSearch}
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
          loading={loading}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<Link
                  to={{
                    pathname: '/detail/' + item.id,
                    query: { id: item.id },
                  }}
                  onClick={enterDetail}
                >{item.title}</Link>}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  )
}
export default SearchContent
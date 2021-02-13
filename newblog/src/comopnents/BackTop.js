import React from 'react'
import { BackTop } from 'antd'
import { VerticalAlignTopOutlined } from '@ant-design/icons';
const Home = () => {
  const style = {
    height: 35,
    width: 35,
    lineHeight: '35px',
    borderRadius: 4,
    backgroundColor: '#88c5f7',
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  };
  return (
    <BackTop style={{ position: "absolute" }}>
      <div style={style} ><VerticalAlignTopOutlined /></div>
    </BackTop >
  )
}
export default Home
import { Avatar, Divider } from 'antd'
import '../static/style/components/author.css'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
const Author = () => {

  return (
    <div className="author-div comm-box">
      <div> <Avatar size={100} src="https://gitee.com/yang_yu_xiang/BlogImages/raw/master/img/psb.jpg" /></div>
      <div className="author-name">
        杨雨翔
      </div>
      <div className="author-introduction">
        测试测试测试测试测试， 测试测试测试测试测试 测试测试测试测试测试， 测试测试测试测试测试
        <Divider>社交账号</Divider>
        <Avatar size={28} icon={<GithubOutlined />} className="account" />
        <Avatar size={28} icon={<QqOutlined />} className="account" />
        <Avatar size={28} icon={<WechatOutlined />} className="account" />
      </div>
    </div>
  )

}

export default Author
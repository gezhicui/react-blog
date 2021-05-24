/* eslint-disable react/jsx-no-target-blank */
import { Avatar, Divider, Tooltip } from 'antd'
import '../static/style/components/author.css'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons';
const Author = () => {

  return (
    <div className="author-div comm-box">
      <div> <Avatar size={100} src="https://gitee.com/xiang0515/BlogImages/raw/master/img/author.jpg" /></div>
      <div className="author-name">
        杨雨翔
      </div>
      <div className="author-introduction">
        永远年轻，永远热泪盈眶
        <Divider>社交账号</Divider>
        <Tooltip
          placement="top"
          title="https://gitee.com/xiang0515"
        >
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
        </Tooltip>

        <Tooltip placement="top" title="QQ:1372201820">
          <Avatar size={28} icon={<QqOutlined />} className="account" />
        </Tooltip>

        <Tooltip placement="top" title="weChat:simple3015">
          <Avatar size={28} icon={<WechatOutlined />} className="account" />
        </Tooltip>
      </div>
      <Divider>友情链接</Divider>
      <ul className='friend-url'>
        <li>
          <a
            href="http://xiang0515.gitee.io/myblog"
            target="_blank"
            rel="noopener noreferer"
          >Yang's Blog(旧)</a>
        </li>
        <li> <a
          href="https://blog.csdn.net/qq_43185206"
          target="_blank"
          rel="noopener noreferer"
        >阿呆的小鸡仔</a>
        </li>
        <li> <a
          href="http://www.shezhiwei.top/"
          target="_blank"
          rel="noopener noreferer"
        >佘智伟的博客</a>
        </li>
        <li> <a
          href="https://cloudhao.top/#/"
          target="_blank"
          rel="noopener noreferer"
        >陈昀昊的小屋</a>
        </li>
      </ul>
    </div>
  )

}

export default Author
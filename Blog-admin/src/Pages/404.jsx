import ErrorImg from '../Static/image/404.png'
import React from 'react'
import '../Static/css/404.css'

export default function ErrorPage(props) {
  return (
    <div>
      <img style={{ height: '100vh', width: '100vw' }} src={ErrorImg} alt=''></img>
    </div>
  )
}

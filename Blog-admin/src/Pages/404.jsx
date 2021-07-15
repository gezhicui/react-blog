import ErrorImg from '../Static/image/404.png'
import React from 'react'

export default function ErrorPage() {
  return (
    <div>
      <img style={{ height: '100vh', width: '100vw' }} src={ErrorImg} alt=''></img>
    </div>
  )
}

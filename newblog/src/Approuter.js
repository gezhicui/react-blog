import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './static/style/pages/index.css'
import './static/style/pages/comm.css'

import Header from './comopnents/Header'
import Home from './pages/home'
import Classify from './pages/classify'
import Detail from './pages/detail'
import Footer from './comopnents/Footer'
import ClassifyArt from './pages/classifyArt'
import Time from './pages/time'


function AppRouter() {
  return (
    <Router>
      <Header></Header>
      <div className="comm-main">
        <Route path="/" exact component={Home} />
        <Route path="/classify" exact component={Classify} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/classifyart/:id" component={ClassifyArt} />
        <Route path="/time" component={Time} />
      </div>
      <Footer></Footer>
    </Router>
  )
}
export default AppRouter
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Loading from './comopnents/loading'
import Loadable from 'react-loadable'

import './static/style/pages/index.css'
import './static/style/pages/comm.css'

// import Header from './comopnents/Header'
// import Home from './pages/home'
// import Classify from './pages/classify'
// import Detail from './pages/detail'
// import Footer from './comopnents/Footer'
// import ClassifyArt from './pages/classifyArt'
// import Time from './pages/time'
let Header = Loadable({
  loader: () => import('./comopnents/Header'),
  loading: Loading
})
let Home = Loadable({
  loader: () => import('./pages/home'),
  loading: Loading
})
let Classify = Loadable({
  loader: () => import('./pages/classify'),
  loading: Loading
})
let Detail = Loadable({
  loader: () => import('./pages/detail'),
  loading: Loading
})
let Footer = Loadable({
  loader: () => import('./comopnents/Footer'),
  loading: Loading
})
let ClassifyArt = Loadable({
  loader: () => import('./pages/classifyArt'),
  loading: Loading
})
let Time = Loadable({
  loader: () => import('./pages/time'),
  loading: Loading
})
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
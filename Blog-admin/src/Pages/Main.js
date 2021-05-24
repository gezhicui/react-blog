import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
import ErrorPage from './404'
import FrontendAuth from '../config/frontendAuth'

const routerObj = [
  { path: '/', name: 'login', component: Login },
  { path: '/index', name: 'index', component: AdminIndex, auth: true },
  { path: '/404', name: '404', component: ErrorPage }
]
export default function Main() {
  return (
    <Router>
      {/* <Route path='/' exact component={Login} />
      <Route path='/index' component={AdminIndex} /> */}
      <Switch>
        <FrontendAuth routerConfig={routerObj} />
      </Switch>
    </Router>
  )
}
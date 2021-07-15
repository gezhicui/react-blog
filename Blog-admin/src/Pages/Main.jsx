import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
import ErrorPage from './404'
import PrivateRoute from '../config/privateRoute'

export default function Main() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <PrivateRoute path='/index' component={AdminIndex} />
        {/* <Route path='/index' component={AdminIndex} /> */}
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  )
}
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//高阶组件
const PrivateRoute = ({ component: Component, ...props }) => {
  console.log(props);
  return (
    <Route
      {...props}
      render={(router) => {
        const isLogin = sessionStorage.getItem('token')
        console.log(isLogin);
        if (isLogin && isLogin !== 'undefined') {
          return <Component {...router}></Component>
        } else {
          alert('您还没有登录')
          return <Redirect to={{ pathname: "/" }}></Redirect>
        }
      }}
    >
    </Route>
  )
}
export default PrivateRoute;

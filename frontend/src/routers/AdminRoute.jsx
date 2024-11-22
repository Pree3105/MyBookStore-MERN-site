import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({children}) => {
//when the admin logins, the token gets generated,
  const token = localStorage.getItem('token');
  //if the token is not there
  if(!token) {
    return <Navigate to="/admin"/>  //navigate to admin page
  }
  //if token is there
  return children ? children :<Outlet/>;
}

export default AdminRoute
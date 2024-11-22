import React from 'react'
import {useAuth} from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

//user has to be logged in to go to the checkout page
//if user isnt there then navigate to login page

const PrivateRoute = ({children}) => {
    const {currentUser, loading}=useAuth();

    if(loading){
      return <div>Loading...</div>
    }

    if(currentUser){
        return children;
    }
    return <Navigate to="/login" replace/>   
  return (
    <div>
      
    </div>
  )
}

export default PrivateRoute

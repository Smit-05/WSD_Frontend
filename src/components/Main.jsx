import React from 'react'
import AllProducts from './AllProducts'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../storage';

function Main() {
  const navigate = useNavigate();
  if(!checkUser()){
    navigate('/', { state: { refreshForUpdate: 1 } })
  }
  return (
    <div>
        <NavBar/>
        <AllProducts/>
    </div>
  )
}

export default Main
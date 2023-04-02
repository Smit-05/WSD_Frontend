import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {RouterProvider} from 'react-router-dom'
import router from './router'
import NavBar from './components/NavBar'
import Loader from './components/Loader'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>  
      <RouterProvider router={router} />
    </>
  )
}

export default App

import React from 'react'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { UserProvider } from './UserContext';
const App = () => {
  return (
  <UserProvider>
   <BrowserRouter>
        <Routes>
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register/>} />
        </Routes>
   </BrowserRouter>
   </UserProvider> 
  )
}

export default App
import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import HomeComponent from './components/pages/home/Home';
import LoginComponent from './components/pages/auth/Login';
import NewAccount from './components/pages/auth/NewAccount';

const FrontEndRoutes = () => {
  return (
    <div className='main-container'>
    <Routes>
      <Route path='/' element={<HomeComponent />} />
      <Route path='/home' element={<HomeComponent />} />
      <Route path='/projects' element={<HomeComponent />} />
      <Route path='/codeSnips' element={<HomeComponent />} />
      <Route path='/aboutMe' element={<HomeComponent />} />
      <Route path='/contact' element={<HomeComponent />} />
      <Route path='/casino' element={<HomeComponent />} />
      <Route path='/login' element={<LoginComponent />} />
      <Route path='/signup' element={<NewAccount />} />
      <Route path='/logout' element={<HomeComponent />} />

      {/* Redirects */}
      <Route path='*' element={<HomeComponent />}/>
    </Routes>
    </div>
  )
}

export default FrontEndRoutes

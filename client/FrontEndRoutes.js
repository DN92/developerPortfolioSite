import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import HomeComponent from './components/Home';

const FrontEndRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeComponent />} />
      <Route path='/home' element={<HomeComponent />} />
      <Route path='/projects' element={<HomeComponent />} />
      <Route path='/codeSnips' element={<HomeComponent />} />
      <Route path='/aboutMe' element={<HomeComponent />} />
      <Route path='/contact' element={<HomeComponent />} />
      <Route path='/login' element={<HomeComponent />} />

      {/* Redirects */}
      <Route path='*' element={<HomeComponent />}/>
    </Routes>
  )
}

export default FrontEndRoutes

import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import PlaceHolder from "./components/PlaceHolder";
import HomeComponent from './components/Home';

const FrontEndRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeComponent />} />
      <Route path='/home' element={<HomeComponent />} />

      {/* Redirects */}
      <Route path='*' element={<HomeComponent />}/>
    </Routes>
  )
}

export default FrontEndRoutes

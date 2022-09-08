import React from 'react';
import { Routes, Route} from 'react-router-dom';
import HomeComponent from './components/pages/home/Home';
import LoginComponent from './components/pages/auth/Login';
import NewAccount from './components/pages/auth/NewAccount';
import ProjectIndex from './components/pages/projects/ProjectIndex';
import SnippetsIndex from './components/pages/snippets/SnippetsIndex';
import SnippetIndividualFull from './components/pages/snippets/SnippetIndividualFull';
import AboutMeIndex from './components/pages/aboutMe/AboutMeIndex';
import ContactIndex from './components/pages/contact/ContactIndex';

const FrontEndRoutes = () => {
  return (
    <div className='main-container'>
    <Routes>
      <Route path='/' element={<ProjectIndex />} />
      <Route path='projects'element={<ProjectIndex />} />
      <Route path='codeSnips' element={<SnippetsIndex />} />
      <Route path='codeSnips/single/:id' element={<SnippetIndividualFull />} />
      <Route path='/aboutMe' element={<AboutMeIndex />} />
      <Route path='/contact' element={<ContactIndex />} />
      <Route path='/login' element={<LoginComponent />} />
      <Route path='/signup' element={<NewAccount />} />
      <Route path='/logout' element={<HomeComponent />} />

      {/* Redirects */}
      {/* <Route path='*' element={<HomeComponent />}/> */}
    </Routes>
    </div>
  )
}

export default FrontEndRoutes

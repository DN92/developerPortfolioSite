import React, {useMemo, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import useWindowSize from '../../customHooks/useWindowSize'

const NavMainBody = () => {

  const {width : windowWidth} = useWindowSize();

  let location = useLocation();
  const focusedPage = useMemo(() => {
    if(location.pathname.length > 1) {
      const path = location.pathname.substring(1, location.pathname.length)
      const idx = path.search('/')
      if (idx === -1) {
        return '.nav-main__' + path
      } else {
        return '.nav-main__' + path.substring(0, idx)
      }
    }
  }, [location])

  useEffect(() => {
    const mainNav = document.querySelector('.nav-main')
    if(focusedPage) {
      const focusLink = document.querySelector(focusedPage);
      if(focusLink && mainNav) {
        mainNav.childNodes.forEach(child => {
          child.setAttribute('id', '')
        })
        focusLink.setAttribute('id', 'nav-main__selected')
      } else {
        mainNav?.childNodes.forEach(child => {
          child.setAttribute('id', '')
        })
      }
    }
  }, [focusedPage])

  return (
    <div className='header-container__body'>
      <div className='nav-h1-wrapper'>
        <Link to='/home'>
          <h1 id='h1'>Title Here</h1>
        </Link>
      </div>
      <nav className='nav-main'>
        <Link className='nav-main__projects' to='/projects'>Projects</Link>
        <Link className='nav-main__codeSnips' to='/codeSnips'>{windowWidth > 800 ? 'Code Examples' : 'Code'}</Link>
        <Link className='nav-main__aboutMe' to='/aboutMe'>{windowWidth > 800 ? 'About Me' : 'About'}</Link>
        <Link className='nav-main__contact' to='/contact'>Contact</Link>
      </nav>

    </div>
  )
}

export default NavMainBody

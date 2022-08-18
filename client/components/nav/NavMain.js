import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavMain = () => {

  let location = useLocation();
  const [focusedPage, setFocusedPage] = useState(null)

  useEffect(() => {
    if(location.pathname.length > 1) {
      const linkToFocus = location.pathname.substring(1, location.pathname.length)
      setFocusedPage(`.nav-main__${linkToFocus}`)
    }
  }, [location]);

  useEffect(() => {
    if(focusedPage) {
      const mainNav = document.querySelector('.nav-main')
      const focusLink = document.querySelector(focusedPage);
      if(focusLink && mainNav) {
        mainNav.childNodes.forEach(child => {
          child.setAttribute('id', '')
        })
        focusLink.setAttribute('id', 'nav-main__selected')
      }
    }
  }, [focusedPage])

  return (
    <div className='header-container'>
      <div className='nav-h1-wrapper'>
        <Link to='/home'>
          <h1 id='h1'>Anatoly Tsinker</h1>
        </Link>
      </div>
      <nav className='nav-main'>
        <Link className='nav-main__projects' to='/projects'>Projects</Link>
        <Link className='nav-main__codeSnips' to='/codeSnips'>Code Examples</Link>
        <Link className='nav-main__aboutMe' to='/aboutMe'>About Me</Link>
        <Link className='nav-main__contact' to='/contact'>Contact</Link>
        <Link className='nav-main__games' to='/casino'>Games</Link>
        <Link className='nav-main__login' to='/login'>Login</Link>
      </nav>

    </div>
  )
}

export default NavMain

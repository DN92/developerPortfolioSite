import React from 'react'
import { Link } from 'react-router-dom'

const NavMain = () => {

  return (
    <div className='header-container'>
      <div className='nav-h1-wrapper'>
        <Link to='/home'>
          <h1 id='h1'>Anatoly Tsinker</h1>
        </Link>
      </div>
      <nav className='nav-main'>
        <Link to='/projects'>Projects</Link>
        <Link to='/codeSnips'>Code Examples</Link>
        <Link to='/aboutMe'>About Me</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/casino'>Games</Link>
        <Link to='/login'>Login</Link>
      </nav>

    </div>
  )
}

export default NavMain

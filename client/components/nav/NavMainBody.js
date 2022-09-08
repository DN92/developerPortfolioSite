import React, {useMemo, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import useWindowSize from '../../customHooks/useWindowSize'
import useMousePosition from '../../customHooks/useMousePosition'
import EyeBall from './EyeBall'

const NavMainBody = () => {

  const {width : windowWidth} = useWindowSize();
  const mousePosition = useMousePosition()

  // const colorCode1 = useMemo(() => {
  //   return Math.floor(Math.abs(181 - mousePosition.x % 20 )) % 255
  // }, [mousePosition.x])
  // const colorCode2 = useMemo(() => {
  //   return Math.floor(Math.abs(213 + mousePosition.y % 20)) % 255
  // }, [mousePosition.y])
  // const colorCode3 = useMemo(() => {
  //   return Math.floor(Math.abs(232 + (mousePosition.x * 0.1 * mousePosition.y * 0.1) % 20 )) % 255
  // }, [mousePosition.x, mousePosition.y])

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

  // useEffect(() => {
  //   console.log(colorCode1, colorCode2, colorCode3)
  // }, [mousePosition])

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
      <div className='nav-h1-wrapper' style ={{
        // background: `rgb(${colorCode1},${colorCode2},${colorCode3})`
      }}>
        <EyeBall />
        <h1 style={{
          // color: `rgb(${colorCode1},${colorCode2},${colorCode3})`,
          // background: `linear-gradient(rgb(${colorCode1},${colorCode2},${colorCode3}), rgb(${colorCode2},${colorCode3},${colorCode1}))`
          }}
          id='h1'>Anatoly Tsinker</h1>
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

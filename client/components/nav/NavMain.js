import React, {useMemo, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavMainBody from './NavMainBody'
import NavFooter from './NavFooter'

const NavMain = () => {

  return (
    <div className='header-container'>
      <NavMainBody />
      <NavFooter viewClass='thin-view-only' />
    </div>
  )
}

export default NavMain

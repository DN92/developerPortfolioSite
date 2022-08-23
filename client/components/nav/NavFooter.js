import React, {useContext} from 'react'
import MeContext from '../../MeContextProvider'
import { Link } from 'react-router-dom'
import LogoutButton from '../LogoutButton'
import LoginButton from '../LoginButton'

const NavFooter = ({viewClass}) => {

  const {id, email} = useContext(MeContext)

  return (
    <div className={'nav-footer-container ' + viewClass}>
      <div className='nav-footer__inner'>
        {email ? <span>Logged in as {email}</span> : <span>Login to see a welcome message</span>}
      </div>
      {id ?
        <LogoutButton classNames={['button3', 'margin-right-halfRem']}/>
        :
        <LoginButton classNames={['button3', 'margin-right-halfRem']} />
      }

    </div>
  )
}

export default NavFooter

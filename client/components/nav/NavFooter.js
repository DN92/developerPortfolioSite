import React, {useContext, useMemo  } from 'react'
import MeContext from '../../MeContextProvider'
import LogoutButton from '../LogoutButton'
import LoginButton from '../LoginButton'

const NavFooter = ({viewClass}) => {

  const {id, email} = useContext(MeContext)
  const shortenedEmail = useMemo(() => (
    email?.includes('@') ? email.split('@')[0] : email
  ), [email])

  return (
    <div className={'nav-footer-container ' + viewClass}>
      <div className='nav-footer__inner'>
        {email ? <span>Welcome {shortenedEmail}</span> : <span>Login to see a welcome message</span>}
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

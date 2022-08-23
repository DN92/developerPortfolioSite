import React from 'react'
import { Link } from "react-router-dom"

const LoginButtonWrapper = ({classNames = []}) => {

  return (
    <div className='login-button-wrapper'>
      <Link to="/login">
      <button className={classNames.join(' ')}
      >Log In</button>
      </Link>
    </div>
  )

}

export default LoginButtonWrapper

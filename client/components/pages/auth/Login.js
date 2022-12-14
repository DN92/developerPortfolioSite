import React, { useState, useMemo, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MeContext from '../../../MeContextProvider'
import LogoutButtonWrapper from '../../LogoutButton'
import LoginForm from './LoginForm'

const LoginComponent = () => {

  const {id, email, permissions} = useContext(MeContext)
  const {setId, setEmail, setPermissions} = useContext(MeContext)
  const [error, setError] = useState(null)
  const [logoutStatusCode, setLogoutStatusCode] = useState(null)
  const alreadyLoggedIn = useMemo(()=> (id && email && permissions), [id, email, permissions])

  return (
    <>
      <div className='login-container'>
        <div className='login__wrapper'>
          {alreadyLoggedIn ?
            <>
            <h2 className='login__h2'>Already logged in as :</h2>
            <h2 className='login__h2'>{email}</h2>
            </>
            :
            <h2>Login</h2>
          }
          {alreadyLoggedIn &&
            <div className='buttons-wrapper-two'>
              <Link to='/home'>
              <button className='button1'>Home</button>
              </Link>
              <LogoutButtonWrapper classNames={['button1']}
                nullSetters={[setEmail, setId, setPermissions]}
                statusCodeSetter={setLogoutStatusCode}
              />
            </div>
          }
          {!alreadyLoggedIn &&
            <>
              <LoginForm error={error} setError={setError}/>
              <div className='login__sign-up'>
                <p>Don't have an account? </p>
                <button className='button2'>Sign Up</button>
              </div>
            </>
          }
        </div>
        <div className='login__description'>
          <p>Why Create an account and log in?</p>
          <p>Creating an account gets you :</p>
          <ul>
            <li>An email with my contact info</li>
            <span> {'\u00A0'}{'\u00A0'}{'\u00A0'} with node mailer (Just One)</span>
            <li>A hashed Password with Bcrypt</li>
            <li>A cookie for your browser from Express Sessions! Yum</li>
            <li>A user id with UUIDV4 from Sequelize</li>
            <li>A welcome message on the home page</li>
            <br />
            <li>And it lets me know someone visited :)</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default LoginComponent

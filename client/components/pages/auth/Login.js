import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { fetchEffect } from '../../../axios/fetchEffect'
import handleFormChange from '../../../eventHandlers/handleFormChange'
import MeContext from '../../../MeContextProvider'

const LoginComponent = () => {
  const [error, setError] = useState(null)
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [rememberMe, setRememberMe] = useState(false)

  const handleRememberMe = () => {
    setRememberMe(prevState => {
      return !prevState
    })
  }

  const handleChange = (event) => {
    handleFormChange(event, setLoginInfo)
  }

  const handleSubmit = () => {
    fetchEffect(
      [setLoginInfo, setError],
      `post`,
      `/auth/login`,
      loginInfo
    )
  }

  return (

    <>
      <div className='login-container'>
        <p>Why Create an account and log in?</p>
        <div className='login__description'>
          <p>Creating an account gets you :</p>
          <ul>
            <li>A thank you email to your provided email with node mailer (Just One, I promise)</li>
            <li>A hashed Password with Bcrypt</li>
            <li>A cookie for your browser from Express Sessions! Yum</li>
            <li>A user id with UUIDV4 from Sequelize</li>
            <li>A welcome message on the home page</li>
            <br />
            {/* <li>Some Persistant data storage for your score for any small games on this app</li> */}
            <li>And it lets me know someone visited :)</li>
          </ul>
        </div>
        <h2 className=''>Login</h2>
        <div >
          {error && <h6 className='required'>Email or Password is incorrect. Try Again</h6>}
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <div className='login__container'>
              <div className='login__container__div'>
                <div className='input-labels-wrapper'>
                  <label htmlFor="eMailLogin" className='required'>Email Address</label>
                </div>
                <div className='login__input-wrapper'>
                  <input id='eMailLogin'
                    name="email"
                    type="email"
                    value={loginInfo.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className='login__container__div'>
                <div className='input-labels-wrapper'>
                  <label htmlFor="passwordLogin" className='required'>Password</label>

                    Forgot Password?

                </div>
                <input id='passwordLogin'
                  name="password"
                  type="password"
                  value={loginInfo.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='remMe-wrapper'>
                <input id='rememberMe' className='auth__remMe__checkbox' onChange={handleRememberMe} type="checkbox" name="rememberMe" checked={rememberMe}/>
                <label htmlFor="auth__remMe" className='auth__remMe'>Remember Me</label>
              </div>
              <div className='login-container__div'>
                <button id='sign-in-button' className='buttonStyle3' type='submit'>Sign In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='login-wrapper no-account'>
        <p>Don't have an account? <Link id='signUp-link' to='/signup'>Sign Up</Link></p>
      </div>
    </>
  )
}

export default LoginComponent

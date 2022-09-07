import React, { useState, useEffect, useContext } from 'react'
import { fetchEffect } from '../../../axios/fetchEffect'
import handleFormChange from '../../../eventHandlers/handleFormChange'
import MeContext from '../../../MeContextProvider'
import { useNavigate } from 'react-router'

const LoginForm = ({error, setError}) => {

  const {id, email, permissions} = useContext(MeContext)
  const {setId, setEmail, setPermissions} = useContext(MeContext)
  const [user, setUser] = useState(null)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (event) => {
    handleFormChange(event, setLoginInfo)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchEffect(
      [setUser, setError],
      `post`,
      `/auth/login`,
      loginInfo
    )
  }

  const writeAutoLoginToLocalStore= (stateVal) => {
    if(stateVal) {
      localStorage.setItem('autoLogin', 'true')
    } else {
      localStorage.removeItem('autoLogin')
    }
  }

  useEffect (() => {
    if(user) {
      writeAutoLoginToLocalStore(rememberMe)
      setEmail(user.email)
      setPermissions(user.permissions)
      setId(user.id)
      navigate('/projects', {replace: true})
    }
  }, [user])

  return (
    <div>
       <form className='login__wrapper-inner' onSubmit={handleSubmit} onChange={handleChange}>
              {error && <h6 className='red'>Email or Password is incorrect. Try Again</h6>}
              <div className='login__container'>
                <div className='input-labels-wrapper'>
                  <label htmlFor="eMailLogin" className='required'>Email Address</label>
                  <div className='login__remMe-wrapper'>
                    <input id='rememberMe'
                      className='auth__remMe__checkbox'
                      onChange={() => {
                        setRememberMe(prevState => {
                          return !prevState
                        })
                      }}
                      type="checkbox"
                      name="rememberMe"
                      checked={rememberMe}/>
                    <label htmlFor="auth__remMe" className='auth__remMe'>Remember Me</label>
                  </div>
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
                <div className='login__input-wrapper'>
                  <div className='input-labels-wrapper'>
                    <label htmlFor="passwordLogin" className='required'>Password</label>
                    <span>
                        Forgot Password?
                      </span>
                  </div>
                  <input id='passwordLogin'
                    name="password"
                    type="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='login__submit-wrapper'>
                  <button id='sign-in-button'
                  className='button1'
                  type='submit'>Sign In</button>
                </div>
              </div>
            </form>
    </div>
  )
}

export default LoginForm

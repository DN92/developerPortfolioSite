import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchEffect } from '../../../axios/fetchEffect'
import handleFormChange from '../../../eventHandlers/handleFormChange'
import MeContext from '../../../MeContextProvider'

const NewAccount = () => {

  const navigate = useNavigate()
  const {setEmail, setType, setId} = useContext(MeContext)

  const accountPreset = {
    email: '',
    password: '',
    passwordConfirm: '',
  }

  const [newAccountForm, setNewAccountForm] = useState(accountPreset)
  const [user, setUser] = useState(null)
  const [formError, setFromError] = useState('')
  const [formValid, setFormValid] = useState(false)
  const [error, setError] = useState('')
  const [isShowPass, setIsShowPass] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (event) => {
    setFromError('')
    setError('')
    handleFormChange(event, setNewAccountForm)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    validateForm(newAccountForm)
  }

  const validateForm = (form) => {
    let error = ''
    for(const key in form) {
      if(!form[key]) {
        error = error + `${key} field may not be empty; `
      }
    }
    if(error) {
      setFromError(error)
      return
    }
    if(form.password !== form.passwordConfirm) {
      error = error + 'Password field do not match'
      setFromError(error)
      return
    }
    setFormValid(true)
  }

  useEffect(() => {
    localStorage.removeItem('autoLogin')
  }, [])

  useEffect(() => {
    rememberMe ?
      localStorage.setItem('autoLogin', true) :
      localStorage.removeItem('autoLogin')

      console.log(localStorage)
  }, [rememberMe])

  useEffect(() => {
    if(formValid) {
      fetchEffect(
        [setUser, setError],
        `post`,
        `/auth/signup`,
        newAccountForm,
      )
    }
  }, [formValid])

  useEffect(() => {
    if(!user) return
    //  some api logics send back status 200 with a msg and a fail flag upon failed attempts
    //  if fail tag exists, account creation failed.
    if(user?.fail) {
      setError(user.msg);
      setUser(null)
      return
    }
    console.log('USER: ', user)
    const {type, email, id} = user
    setType(type)
    setEmail(email)
    setId(id)
    navigate('/home')
  }, [user])

  return (
    <div className='create-account-container'>
      {error && <h6 className='create-account-error red'>Error: {error}</h6>}
      <form onSubmit={handleSubmit}>
        <div className='input-wrapper'>
          {formError && <h6 className='create-account-error red'>{formError}</h6>}
          <label htmlFor="create-account__email">Email</label>
          <input id='create-account__email'
            name="email"
            type="email"
            value={newAccountForm.email}
            onChange={handleChange}
          />
        </div>
        <div className='input-wrapper'>
          <label htmlFor="create-account__password">Password</label>
          <input id='create-account__password'
            name="password"
            type={isShowPass ? 'text' : 'password'}
            value={newAccountForm.password}
            onChange={handleChange}
          />
        </div>
        <div className='input-wrapper'>
          <input id='create-account__show-password'
            className='create-account__show-password'
            onChange={() => {
              setIsShowPass(prev => !prev)
            }}
            type="checkbox"
            name="showPass"
            checked={isShowPass}/>
          <label htmlFor="create-account__show-password">ShowPassword</label>
        </div>
        <div className='input-wrapper'>
          <label htmlFor="create-account__password-confirm">Confirm Password</label>
          <input id='create-account__password-confirm'
            name="passwordConfirm"
            type={isShowPass ? 'text' : 'password'}
            value={newAccountForm.passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <div className='input-wrapper'>
          <input id='rememberMe'
            className='create-account__remember-me'
            onChange={()=> {
              setRememberMe(prev => !prev)
            }}
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}/>
          <label htmlFor="auth__remMe" className='auth__remMe'>Remember Me</label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default NewAccount

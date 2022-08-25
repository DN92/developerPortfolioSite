import React, {useState, useEffect, createContext,} from 'react'
import { fetchEffect } from './axios/fetchEffect'

const MeContext = createContext()

export const MeProvider = ({children}) => {

  const autoLogin = localStorage.hasOwnProperty('autoLogin')
  const [haveAttemptedLogin, setHaveAttemptedLogin] = useState(false)
  const [me, setMe] = useState(null)
  const [email, setEmail] = useState(me?.email)
  const [type, setType] = useState(me?.type)
  const [id, setId] = useState(me?.id)

  useEffect(() => {
    if (autoLogin && !me && !haveAttemptedLogin) {
      setHaveAttemptedLogin(true)
      fetchEffect(
        [setMe],
        'get',
        `/auth/me`
      )
    }
  }, [])

  useEffect(() => {
    setEmail(me?.email || null)
    setType(me?.type || null)
    setId(me?.id || null)
  }, [me])

  return (
    <MeContext.Provider value={{
      email,
      type,
      id,
      setEmail,
      setType,
      setId,
    }}>
      {children}
    </MeContext.Provider>
  )
}

export default MeContext

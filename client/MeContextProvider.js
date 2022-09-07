import React, { useState, useEffect, createContext, useReducer } from 'react'
import { fetchEffect } from './axios/fetchEffect'

const MeContext = createContext()

export const MeProvider = ({children}) => {

  const autoLogin = localStorage.hasOwnProperty('autoLogin')
  const [haveAttemptedLogin, setHaveAttemptedLogin] = useState(false)
  const [me, setMe] = useState(null)
  const [email, setEmail] = useState(me?.email)
  const [permissions, setPermissions] = useState(me?.permissions)
  const [id, setId] = useState(me?.id)
  const [initialized, setInitialized] = useState(false)
  const [liked, dispatchLiked] = useReducer((state, action) => {
    switch(action.type) {
      case 'init' : {
        return Array.isArray(me?.likedSnippets) ? me.likedSnippets : []
      }
      case 'addLike' : {
        if(state.includes(action.snippetId)) return [...state]
        return [...state, action.snippetId]
      }
      case 'removeLike' : {
        return state.filter(id => id !== action.snippetId)
      }
      default:
        return [...state]
    }
  }, [])

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
    setPermissions(me?.permissions || null)
    setId(me?.id || null)
    dispatchLiked({permissions: 'init'})
    setInitialized(true)
  }, [me])

  return (
    <MeContext.Provider value={{
      email,
      permissions,
      id,
      liked,
      initialized,
      setEmail,
      setPermissions,
      setId,
      dispatchLiked,
    }}>
      {children}
    </MeContext.Provider>
  )
}

export default MeContext

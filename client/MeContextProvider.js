import React, { useState, useEffect, createContext, useReducer } from 'react'
import { fetchEffect } from './axios/fetchEffect'

const MeContext = createContext()

export const MeProvider = ({children}) => {

  const autoLogin = localStorage.hasOwnProperty('autoLogin')
  const [haveAttemptedLogin, setHaveAttemptedLogin] = useState(false)
  const [me, setMe] = useState(null)
  const [email, setEmail] = useState(me?.email)
  const [type, setType] = useState(me?.type)
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
    setType(me?.type || null)
    setId(me?.id || null)
    dispatchLiked({type: 'init'})
    setInitialized(true)
  }, [me])

  useEffect(() => {
    console.log(`liked:: `, liked)
  }, [liked])

  return (
    <MeContext.Provider value={{
      email,
      type,
      id,
      liked,
      initialized,
      setEmail,
      setType,
      setId,
      dispatchLiked,
    }}>
      {children}
    </MeContext.Provider>
  )
}

export default MeContext

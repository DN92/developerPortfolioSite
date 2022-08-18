import React from 'react'
import { createContext, useState} from 'react'

const MeContext = createContext()

export const MeProvider = ({children}) => {

  let me = null  // the user

  if (localStorage.hasOwnProperty('autoLogin') && localStorage.hasOwnProperty('me')) {
    me = JSON.parse(localStorage.getItem('me'))
  }

  const [email, setEmail] = useState(me ? me.email : null)
  const [type, setType] = useState(me ? me.type : null)
  const [id, setId] = useState(me ? me.id : null)

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

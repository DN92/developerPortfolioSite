import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router'
import { fetchEffect } from '../axios/fetchEffect'
import MeContext from '../MeContextProvider'

const PathTracker = ({children}) => {

  const { pathname } = useLocation()
  const [pathStack, setPathStack] = useState([pathname.toLowerCase()])
  const { liked, initialized } = useContext(MeContext)

  useEffect(() => {
    if (!pathStack.length || pathname !== pathStack[pathStack.length - 1]) {
      setPathStack(prev => [...prev, pathname.toLowerCase()])
    }
  }, [pathname])

  useEffect(() => {
    if(pathStack[pathStack.length - 1] === '/codesnips' && initialized) {
      fetchEffect(
        [],
        'post',
        `/api/users/updateLikes`,
        liked
      );
    }
  }, [pathname])

  return (
    <>
      {children}
    </>
  )
}

export default PathTracker

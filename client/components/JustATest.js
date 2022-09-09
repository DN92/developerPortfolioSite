import React, { useEffect } from 'react'


const X = () => {
  useEffect(() => {
    console.log('ran')
  }, [])
  return (
    <div>test</div>
  )
}

export default X

import React, {useContext} from 'react'
import MeContext from '../MeContextProvider'

const Footer = () => {

  const meContext = useContext(MeContext) || {}

  const logMeContext = () => {
    console.log("id: ", meContext.id)
    console.log("email: ", meContext.email)
    console.log("permissions:", meContext.permissions)
  }

  return (
    <div className='footer-container'>
      <p>This site was built with React, React-Router, Express, Sequelize(PSQL) </p>
      <button className='button3' onClick={logMeContext}>log 'me'</button>
    </div>
  )
}

export default Footer

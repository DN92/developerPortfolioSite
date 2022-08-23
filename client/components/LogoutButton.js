import React, {useContext} from 'react'
import logout from '../customHooks/logout'
import MeContext from '../MeContextProvider'

const LogoutButtonWrapper = ({classNames = [], nullSetters = [], statusCodeSetter}) => {

  const {setId, setEmail, setType} = useContext(MeContext)

  return (
    <div className='logout-button-wrapper'>
      <button className={classNames.join(' ')}
        onClick={()=>logout(
          [setId, setEmail, setType, ...nullSetters],
          statusCodeSetter
        )}
      >Sign Out</button>
    </div>
  )

}

export default LogoutButtonWrapper

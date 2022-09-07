import React, {useContext} from 'react'
import logout from '../customHooks/logout'
import MeContext from '../MeContextProvider'
import { useNavigate } from 'react-router'

const LogoutButtonWrapper = ({classNames = [], nullSetters = [], statusCodeSetter}) => {

  const {setId, setEmail, setPermissions} = useContext(MeContext)
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout(
      [setId, setEmail, setPermissions, ...nullSetters],
      statusCodeSetter
    );
    navigate('/login')
  }

  return (
    <div className='logout-button-wrapper'>
      <button className={classNames.join(' ')}
        onClick={handleSignOut}
      >Sign Out</button>
    </div>
  )

}

export default LogoutButtonWrapper

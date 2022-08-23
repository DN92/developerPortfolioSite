import axios from '../axios'

const useLogout = async(settersArrayToNull, statusSetter) => {

  settersArrayToNull.forEach(setter => {
    setter(null)
  })
  localStorage.removeItem('autoLogin')
  const {status} = await axios.delete(`/auth/logout`)
  if(statusSetter) statusSetter(status)
  return status
}

export default useLogout

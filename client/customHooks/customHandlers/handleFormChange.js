const handleControlledValueFieldToState = (event, setterFunc) => {
  setterFunc(prevClientInfo => {
    return {...prevClientInfo, [event.target.name] : event.target.value}
  })
}

export default handleControlledValueFieldToState

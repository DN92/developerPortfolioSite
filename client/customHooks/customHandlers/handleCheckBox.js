const checkBoxHandler  = (event, setterFunc, attName) => {

  //  this function handles setState for nested Obj state - checkBoxes
  //  attName (string) is the name of the custom tag with the id of the model that needs to be updated


  setterFunc(prev => {
    const {name, checked} = event.target
    const IdToUpdate = event.target.getAttribute(attName)
    return {...prev,
      [name]: {
        ...prev[name],
        [IdToUpdate]: checked
    }}
  })

  }

  export default checkBoxHandler

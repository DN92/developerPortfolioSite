export const putTokenOnHeader = () => {
  const token = window.localStorage.getItem("psfToken");
  if(token) {
    return {
      headers: {
        authorization: token,
      },
    }
  } else {
    return {}
  }
}

export default putTokenOnHeader

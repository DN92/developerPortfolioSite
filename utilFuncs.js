const axios = require('axios')

const myUtilFuncs = {}

//  for uncontrolled components only!!
myUtilFuncs.resetForm = (event) => {
  try {
    document.getElementById(event.nativeEvent.srcElement.id).reset()
  } catch (err) {
    console.err(err)
    console.log(err.stack)
  }
}

myUtilFuncs.convertToPhoneNumber = (number) => {
  number = number.split('')
    .filter(char => char !== "-" && char !== " ")
    .join('')
  if(number.length < 4) {
    return number
  }
  if(number.length < 7) {
    return number.slice(0,3) + ' - ' + number.slice(3)
  }
  return number.slice(0,3) + ' - ' + number.slice(3, 6) + ' - ' + number.slice(6,10)  //  will discard any digits after the tenth
}

myUtilFuncs.objectKeysToLowerCase = (object) => {
  try {
    Object.keys(object).forEach(key => {
      if(typeof object[key] === string) {
        object[key] = object[key].toLowerCase()
      }
    })
  } catch (err) {
    console.error('Utility Function objectKeysToLowerCase failed')
    console.error(err)
    console.log(error.stack)
  }
}

myUtilFuncs.getUserIP = async () => {
  try{
    const { data } = await axios.get('https://geolocation-db.com/json/')
    return data.IPv4
  } catch (err) {
    console.log('failed to get IP, no worries')
    console.log(err)
  } finally {
    return
  }
}

myUtilFuncs.getWordsFromArrayOfKeys = (arrayOfWords) => {

  // this is the callback function for the map function we will run on the words array.
  const convertObjKeyIntoWord = (word) => {
    if(!word.length) {
      return word
    }
    const arrayOfLetters = word.split('')
    arrayOfLetters[0] = arrayOfLetters[0].toUpperCase()
    return arrayOfLetters.map((letter, index) => {
      if(index == 0) {
        return letter
      }
      // check if the letter is uppercase, the letter before it is not upperCase, and there is no space before the letter // then adds a space if all that is true. Should handle most but not all camelCase obj keys
      if(letter == letter.toUpperCase() && word[index-1] == word[index-1].toUpperCase() && word[index-1] != ' ') {
        return (' ' + letter)
      }
      return letter

    })
    .join('')
    }

  if(!arrayOfWords.length) {
    return arrayOfWords
  }
  return arrayOfWords.map(word => (convertObjKeyIntoWord(word)))
}

//  compares 2 objects, and return the number of key value pairs that match
myUtilFuncs.getObjMatches = (obj1, obj2) => {
  let counter = 0
  const obj1ToS = Object.entries(obj1).map(key => (JSON.stringify(key)))
  const obj2ToS = Object.entries(obj2).map(key => (JSON.stringify(key)))
  obj1ToS.forEach(key => {
    if(obj2ToS.includes(key)) {
      counter++
    }
  })
  return counter
}

module.exports = myUtilFuncs

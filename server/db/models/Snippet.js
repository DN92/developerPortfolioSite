const Sequelize = require('sequelize')
const db = require('..')

const generateRan = (min = 10, max = 100) => {
  return Math.floor((Math.random()* (max - min) + min))
}

const Snippet = db.define('snippet', {
  name: Sequelize.STRING,
  linkToPage: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  description: Sequelize.TEXT,
  codeSnippet: Sequelize.TEXT,
  aboutPre: Sequelize.TEXT,
  aboutPost: Sequelize.TEXT,
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})


Snippet.beforeCreate(snippet => {
  snippet.likes = generateRan()
})

module.exports = Snippet

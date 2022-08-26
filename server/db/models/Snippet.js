const Sequelize = require('sequelize')
const db = require('..')

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
    defaultValue: Math.floor((Math.random()* (100 -10) + 10))
  }
})

module.exports = Snippet

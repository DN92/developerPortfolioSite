const Sequelize = require('sequelize')
const db = require('../../db')
const { userTypes }= require('../../../myConfig')

const User = db.define("user", {
  type: {
    type: Sequelize.ENUM(userTypes),
    defaultValue: userTypes[0]
  },
  eMail: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
})

module.exports = User

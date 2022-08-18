const Sequelize = require('sequelize')
const db = require('../../db')
const { userTypes }= require('../../../myConfig')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

const User = db.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: Sequelize.ENUM(userTypes),
    defaultValue: userTypes[1]
  },
  email: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
})



const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.password && user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 6);
  }
};

const emailToLowerCase = async (user) => {
  if(user.email) {
    user.email = user.email.toLowerCase()
  }
}

User.beforeCreate((user) => {
  hashPassword(user);
  emailToLowerCase(user);
});
User.beforeUpdate((user) => {
  hashPassword(user);
  emailToLowerCase(user);
});
User.beforeBulkCreate(users => {
  users.forEach(user => {
    hashPassword(user);
    emailToLowerCase(user);
  })
})
User.beforeBulkUpdate(users => {
  users.forEach(user => {
    hashPassword(user);
    emailToLowerCase(user);
  })
})

module.exports = User

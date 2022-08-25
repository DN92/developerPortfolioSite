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
  permissions: {
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

User.prototype.verifyPassword = async function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return await bcrypt.compare(candidatePwd, this.password);
};


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

User.beforeCreate(async user => {
  await hashPassword(user);
  emailToLowerCase(user);
});
User.beforeUpdate(async user => {
  await hashPassword(user);
  emailToLowerCase(user);
});
User.beforeBulkCreate(async users => {
  await Promise.all(users.map(user => {
    emailToLowerCase(user);
    return hashPassword(user);
  }))
})
User.beforeBulkUpdate(async users => {
  await Promise.all(users.map(user => {
    emailToLowerCase(user);
    return hashPassword(user);
  }))
})

module.exports = User

const Sequelize = require('sequelize')
const db = require('../../db')

const Session = db.define("session", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  sess: Sequelize.TEXT,
  expire: Sequelize.DATE,
},
{
  freezeTableName: true,
  timestamps: false
});

module.exports = Session

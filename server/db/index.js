const Sequelize = require('sequelize')

let config = {}

config = {
  database: process.env.DATABASE_NAME,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false,
  pool: {
    min: 1,
    max: 5,
    idle: 10000,
    maxUses: 10000,
  }


}

const db = new Sequelize(
  process.env.DATABASE_URL,
  config
)

module.exports = db

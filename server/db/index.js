const Sequelize = require('sequelize')

let config = {}

config = {
  logging: false,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/my-dev-site', config
)

module.exports = db

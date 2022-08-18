const Sequelize = require('sequelize')

let config = {}

// config = {
//   logging: false,
//   ssl: true,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// }

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

console.log(process.env.DATABASE_URL)

const db = new Sequelize(
  process.env.DATABASE_URL,
  config
)

module.exports = db

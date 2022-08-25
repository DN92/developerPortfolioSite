const Sequelize = require('sequelize')
const db = require("..")

const Link = db.define('link', {
  githubUrl: Sequelize.STRING,
  websiteUrl: Sequelize.STRING,
  videoMainUrl: Sequelize.STRING,
  videoAsEmbed: Sequelize.STRING,
  imageMainSrc: Sequelize.STRING,
  backgroundImg: Sequelize.STRING,
})

module.exports = Link

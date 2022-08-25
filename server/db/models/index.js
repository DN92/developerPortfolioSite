// all models go here to be exported together
const User = require('./User')
const Session = require("./Session")
const Project = require("./Project")
const Link = require("./Link")

Link.hasOne(Project)
Project.belongsTo(Link)

const models = {
User,
Session,
Project,
Link,
}

module.exports = models

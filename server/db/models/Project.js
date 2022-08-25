const Sequelize = require('sequelize')
const db = require("../../db")

const Project = db.define('project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  collaborators: Sequelize.TEXT,
  status: Sequelize.STRING,
})


//  hooks  //


const projectParse = (project) => {
  if(typeof project.collaborators === 'string') {
    if(!Array.isArray(JSON.parse(project.collaborators))) {
      throw new Error('Input to Collaborators table of type: string was not a valid JSON array')
    }
    return
  }
  if(Array.isArray(project.collaborators)) {
    project.collaborators = JSON.stringify(project.collaborators)
    return
  }
  throw new Error('Unexpected input: Project.beforeCreate while attempting to stringify input to Collaborators')
}

Project.beforeValidate(projectParse)
Project.beforeBulkCreate((projects) => (projects.forEach(proj => {
  projectParse(proj)
})))

module.exports = Project

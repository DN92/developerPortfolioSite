const router = require('express').Router()
const { Project }= require('../db/models')
const { Link } = require('../db/models')

//  /api/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      include: [Link]
    })
    projects.forEach(project => {
      if(typeof project.collaborators === 'string') {
        project.collaborators = JSON.parse(project.collaborators)
      }
    })
    res.send(projects)
  } catch (err) {
    next(err)
  }
})

module.exports = router

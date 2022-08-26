const router = require('express').Router()

//  /api

router.use('/users', require('./users'))
router.use('/projects', require('./projects'))
router.use('/snippets', require('./snippets'))

// error endpoint
router.use((req, res, next) => {
  const error = new Error('Not Found --auth index.js')
  error.status = 404
  next(error)
})

module.exports = router

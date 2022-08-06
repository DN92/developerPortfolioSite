const router = require('express').Router()
const db = require('../db')

//  api/


// error endpoint
router.use((req, res, next) => {
  const error = new Error('Not Found --api index.js')
  error.status = 404
  next(error)
})

module.exports = router

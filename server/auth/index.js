const router = require('express').Router()
const { User } = require("../db/models")

//  /auth

router.post('/login', async (req, res, next) => {
  try {
    //  throw back no and null passwords
    if(req.body.password) {
      // set up login methodology
      res.send({msg:'password check has not yet been created' });
    } else {
      throw new Error('bad password')
    }
  } catch (err) {
    next(err)
  }
})

router.post('signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)

    // sign up methodology here

  } catch (error) {
    if(err.name == 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next (err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    // get user code here

    res.send({msg:'code block for this route is empty'})
  } catch (err) {
    next(err)
  }
})

module.exports = router

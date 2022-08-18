const router = require('express').Router()
const User = require("../db/models/User")

//  /auth

router.post('/signup', async (req, res, next) => {

  try {
    if(req.session.user) {
      res.send({fail: true, msg: 'Already logged in => session user already exists'})
      console.log(req.sessionID)
      return
    }
    const user = await User.create(req.body)
    if(user) {
      req.session.user = { user_id: user.id, email: user.email, type: user.type}
      const {id, type, email} = user
      res.send({id, type, email})
    }

    console.log(req.sessionID)
  } catch (error) {
    if(error.name == 'SequelizeUniqueConstraintError') {
      res.status(401).send('User or Email already exists')
    } else {
      next (error)
    }
  }
})

router.post('/login', async (req, res, next) => {

  try {
    if(req.session.user) {
      res.send({msg: 'Already logged in => session user already exists'})
      console.log(req.sessionID)
      return
    }
    const user = await User.findOne({
      where: {email: req.body.email}
    })
    if(!req.body.password || !user) {
      res.send({msg: 'bad email or password provided'})
      return
    }
    if(user.password === req.body.password) {
      req.session.user = { user_id: user.id, email: user.email, type: user.type}
      res.send({msg:'password correct. ENTER' });
      console.log(req.sessionID)
      return
    } else {
      res.send({msg: 'password Incorrect, BEGONE'})
    }
  } catch (err) {
    next(err)
  }
})

router.post('logout', async (req, res, next) => {
  try {
    if(!req.session.user) {
      res.send({fail: true, msg:'No User Session'})
      return
    }

  } catch (err) {
    next(err)
  }
})

router.get('/me', async (req, res, next) => {
  try {
    // get user code here
    if(!req.session.user) {
      res.send({fail: true, msg: 'No User Associated to Session'})
      return
    }
    const user = await user.findByPk(req.session.user.user_id)
    if(!user) {
      res.send({fail: true, msg: `No User with id:${req.session.user.user_id} found in database`})
      return
    }
    const {id, email, type} = user
    res.send({id, email, type})
  } catch (err) {
    next(err)
  }
})

// error endpoint
router.use((req, res, next) => {
  const error = new Error('Not Found --api index.js')
  error.status = 404
  next(error)
})

module.exports = router

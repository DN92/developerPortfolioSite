const router = require('express').Router()
const User = require("../db/models/User")
const Session = require("../db/models/Session")

//  /auth

router.post('/signup', async (req, res, next) => {

  try {
    if(req.session.user) {
      res.send({fail: true, msg: 'Already logged in => session user already exists'})
      return
    }
    const user = await User.create(req.body)
    if(user) {
      req.session.user = { user_id: user.id, email: user.email, type: user.type}
      const {id, type, email} = user
      res.send({id, type, email})
    }

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
    if(req.session.user) req.session.user = {}
    const user = await User.findOne({
      where: {email: req.body.email},
    })
    if(!req.body.password || !user) {
      res.send({msg: 'bad email or password provided'})
      return
    }
    const passwordVerified = await user.verifyPassword(req.body.password)
    if(passwordVerified) {
      req.session.user = {
        user_id: user.id,
        email: user.email,
        type: user.type,
        password: req.body.password
      }
      const {id, email, type} = user
      res.send({id, email, type});
      return
    }
    res.send({msg: 'password Incorrect, BEGONE'})
  } catch (err) {
    next(err)
  }
})

router.get('/me', async (req, res, next) => {
  try {
    if(!req.session?.user) {
      res.status(401).send({fail: true, msg: 'No User Associated to Session'})
      return
    }
    const user = await User.findByPk(req.session.user.user_id)
    if(!user) {
      res.status(400).send({fail: true, msg: `No User with id:${req.session.user.user_id} found in database`})
      return
    }
    const passwordVerified = await user.verifyPassword(req.session.user.password)
    if(!passwordVerified) {
      res.status(401).send({fail: true, msg: 'Bad Password from session'})
    }
    user.likedSnippets ? user.likedSnippets = JSON.parse(user.likedSnippets) : []
    const {id, email, permissions, likedSnippets} = user
    res.send({id, email, permissions, likedSnippets})
  } catch (err) {
    next(err)
  }
})

router.delete('/logout', async (req, res, next) => {
  try {
    if(!req.session?.user) {
      res.status(400).send({fail: true, msg:'No User Session'})
      return
    }
    const session = await Session.findByPk(req.sessionID)
    if(session) {
      await session.destroy()
    } else {
      res.status(400).send({msg: 'could not find session'})
      return
    }
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// error endpoint
router.use((req, res, next) => {
  const error = new Error('Not Found --auth index file')
  error.status = 404
  next(error)
})

module.exports = router

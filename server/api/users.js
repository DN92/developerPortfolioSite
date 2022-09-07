const router = require('express').Router()
const User = require('../db/models/User')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (err) {
    next(err)
  }
})

router.post('/updateLikes', async (req, res, next) => {
  try {
    console.log('request body ', req.body)
    if(!Array.isArray(req.body)) {
      throw Error('updateLikes expects an array, instead got ' + typeof req.body)
    }
    const user = await User.findByPk(req.session.user.user_id)
    if(!user) {
      res.sendStatus(401)
      return
    }
    await User.upsert({
      id: req.session.user.user_id,
      likedSnippets: req.body
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router


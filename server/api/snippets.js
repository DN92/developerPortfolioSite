const router = require('express').Router();
const { Snippet } = require('../db/models')

router.get('/', async (req, res, next ) => {
  try {
    const snippets = await Snippet.findAll();
    res.send(snippets)
  } catch (err) {
    next(err)
  }
})

router.get('/single', async (req, res, next) => {
  try {
    if(!req.query.id) {
      res.sendStatus(400);
      return
    }
    const snippet = await Snippet.findByPk(req.query.id)
    console.log("SNIPPET ::: ", snippet)
    snippet ?
    res.send(snippet):
    res.sendStatus(400)
  } catch (err) {
    next(err)
  }
})

router.post('/updateLikes', async (req, res, next) => {
  try {
    console.log('PASSED ALL CHECKS IN UPDATE LIKES')
    Promise.all(req.body.map(async snippet => {
      const fromDb = Snippet.findByPk(snippet.id)
      if(Math.abs(fromDb.likes - snippet.likes) < 2) {
        Snippet.upsert({
          id: snippet.id,
          likes: Number(snippet.likes),
        })
      }
    }))
  } catch (err) {
    next(err)
  }
})

module.exports = router

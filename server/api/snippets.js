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

module.exports = router

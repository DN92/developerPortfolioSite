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

module.exports = router

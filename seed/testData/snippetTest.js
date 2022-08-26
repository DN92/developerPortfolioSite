const snippet1 = {
  name: 'Test snippet 1',
  // linkToPage: 'testSnippet/1'
  description: ' This is the description',
  codeSnippet: `const Sequelize = require('sequelize')
  const db = require('..')

  const Snippet = db.define('snippet', {
    name: Sequelize.STRING,
    linkToPage: Sequelize.STRING,
    description: Sequelize.TEXT,
    codeSnippet: Sequelize.TEXT,
    about: Sequelize.TEXT,
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: Math.floor((Math.random()* (100 -10) + 10))
    }
  })

  module.exports = Snippet
  `,
  about: `THIS IS SAMPLE TEXT:: This component will re-render whenever the user moves the mouse. This can be dozens and dozens of times a second.

  Originally, this hook included “throttle” functionality, which would limit the updates to a user-specified interval. In testing, though, it seemed to make performance worse. No matter how hard I tried, I couldn't come up with a contrived scenario where the throttle actually improved performance (while still updating often enough for smooth animations).

  That said, you do still need to be a bit careful where you use this hook. It shouldn't be used in a top-level component like App or Homepage, since that will cause a huge chunk of your React tree to re-render very often. Use this hook in the small “leaf node” components near the bottom of the tree.

  For maximum performance, you can use a library like React Spring or Framer Motion, which will allow you to update values without triggering React renders. In my experience, though, as long as you're using this hook on smaller components that don't have a big DOM impact, you should be just fine.`,
}

module.exports = [snippet1]

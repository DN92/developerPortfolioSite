require('dotenv').config()

const db = require ('../server/db')
const models = require('../server/db/models')

/**
 *  seed - this function clears the database, updates tables to
 *    match our models, and populates the database
 */

const {User, Project, Link, Snippet} = models

const usersTestData = require('./testData/usersTest')
const projectTestData = require('./testData/projectTest')
const projectActualData = require('./actualData/projectActual')
const snippetTestData = require('./testData/snippetTest')

 async function seed() {
  console.log('sync db')
  await db.drop({force:true, cascade:true})
  await db.sync({force: true})  //  clears the db and matches models to tables
  console.log('begin seed')
  await Promise.all([
    //  import and then ..
    //  seed dummy / actual data here

    Promise.all(usersTestData.map(user => {
      return User.create(user)
    })),
    Promise.all(projectActualData.map(async project => {
      const links = await Link.create(project.links)
      const newProject = await Project.create(project)
      await newProject.setLink(links)
    })),
    Promise.all(snippetTestData.map( async snippet => {
      return Snippet.create(snippet)
    }))
  ])
}

// runSeed isolates error handling and exit trapping.

async function runSeed(seedFunc) {
  try {
    console.log("Running database seed function")
    await seedFunc()
    console.log("Seed was successful")
  } catch (err) {
    console.log("Database seed failed")
    console.error(err)
    console.log(err.stack)
  } finally {
    console.log("Closing db connection")
    await db.close()
    console.log("DB connection closed")
  }
}

// execute our runSeed IF we ran this directly from Node ('node seed')

if (module === require.main) {
  runSeed(seed);
}

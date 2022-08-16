require('dotenv').config()
const express = require('express')
const db = require('./db')
const session = require('express-session');
const { Session } = require('./db/models')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')
const app = express()
const { v4: uuidv4 } =require('uuid')
const SessionStore = require('express-session-sequelize')(session.Store)

// logging middleware
app.use(morgan('dev'))

//  body parsers
app.use(express.json());
// app.use(express.urlencoded());

app.use(
  session({
    secret: process.env.EXPRESS_SESSIONS_KEY,
    store: new SessionStore({
      db: db,
      table: Session,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: (1000 * 60 * 60 * 24), // 1 day,
      httpOnly: true,
      sameSite: true,
      secure: app.get('env') === 'production',
      genid: uuidv4(),
      name: 'planet-scottish-fold',
      rolling: true,
      unset: 'keep',
    }
  })
);

// compression middleware
app.use(compression())

// api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

// file serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// send index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})


//  app endpoint
app.use((req, res, next) => {
  const error = new Error('Not Found --api index.js')
  error.status = 404
  next(error)
})

// error handlers
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Endpoint Server Error')
})

function bootStartApp() {
  console.log('create app')
  if (require.main === module) {
    return (startServer())
  }
}

const startServer = () => {
  syncDb()
  // start listening and creates a server object
  return app.listen(process.env.PORT, () => {
    console.log(`App initializing. Now running on Port ${process.env.PORT}`)
  })
}


const syncDb = async () => {
  await db.sync()
}

const server = bootStartApp()

module.exports = server

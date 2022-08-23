require('dotenv').config()
const express = require('express')
const db = require('./db')
const pg = require('pg')
const session = require('express-session')
const path = require('path')
const morgan = require('morgan')
const compression = require('compression')
const { v4: uuidv4 } = require('uuid')

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const pgStore = require('connect-pg-simple')(session)
const app = express()

// logging middleware
app.use(morgan('dev'))

//  body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// compression middleware
app.use(compression())

app.use(
  session({
    secret: process.env.EXPRESS_SESSIONS_KEY,
    store: new pgStore({createTableIfMissing: true, pool: pool}),
    resave: false,
    saveUninitialized: false,
    genid: () => uuidv4(),
    createTableIfMissing: true,
    cookie: {
      maxAge: (1000 * 60 * 60 * 24), // 1 day,
      sameSite: true,
      secure: app.get('NODE_ENV') === 'production',
      rolling: true,
      unset: 'keep',
    }
  })
);

// routers
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
});

// file serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// remaining requests with an extension (.js, .css, other) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error(`File Could not be located: ${req.path}`)
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// send index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// error handlers
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Endpoint Server Error')
})

function bootStartApp() {
  console.log('Creating Server: ' + (process.env.DATABASE_NAME || 'no name provided'))
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

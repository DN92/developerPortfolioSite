import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import connectPg from 'connect-pg-simple'
import pg from 'pg'
import argon from 'argon2'
import * as db from 'zapatos/db'

if (! process.env.DATABASE_URL) throw new Error('Missing DATABASE_URL environment variable')
if (! process.env.SECRET) throw new Error('Missing SECRET environment variable')

const DAY = 86400000
const PgStore = connectPg(session)
const port = Number(process.env.PORT) || 3000
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
  rolling: true,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 7 * DAY,
    httpOnly: true,
    sameSite: 'lax',
    secure: 'auto',
  },
  store: new PgStore({ pool, schemaName: 'hidden', tableName: 'sessions' }),
  secret: process.env.SECRET,
}))

app.post('/register', async (req, res) => {
  if (req.session.user) return res.redirect('/')
  const { username, password } = req.body
  try {
    const password_hash = await argon.hash(password)
    const user = await db.insert('users', { username, password_hash }, { returning: ['user_id'] }).run(pool)

    req.session.user = { user_id: user.user_id, username }
    res.redirect('/')
  } catch {
    res.status(403).send('username already exists')
  }
})

app.post('/login', async (req, res) => {
  if (req.session.user) return res.redirect('/')
  const { username, password } = req.body
  try {
    const user = await db.selectExactlyOne('users', { username }).run(pool)
    const matches = await argon.verify(user.password_hash, password)
    if (! matches) throw new Error()

    req.session.user = { user_id: user.user_id, username: user.username }
    res.redirect('/')
  } catch {
    res.status(403).send('invalid username or password')
  }
})

app.listen(port, () => console.log(`listening on port ${port}`))

require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const normal = require('./routes/normal')
// const member = require('./routes/member')

console.log('mode: ' + process.env.mode)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/', normal)
// app.use('/', member)

app.get('/hello', (req, res, next) => {
  res.status(200).json('Hello Nuxt!')
})

module.exports = app

const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(8000, function () {
  console.log('running 8000...')
})

module.exports = app
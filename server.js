const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const { connect } = require('./config/rabbitmq')
const PORT = process.env.PORT || 5000

connect()

const app = express()

// Dev logging middleware 'morgan'
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/rabbitmq', require('./routes/rabbitmqRoutes'))

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
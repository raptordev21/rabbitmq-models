const express = require('express')
const router = express.Router()
const {
  getMqData,
  setMqData,
} = require('../controllers/rabbitmqController')

router
  .route('/publish')
  .post(setMqData)

router
  .route('/consume')
  .get(getMqData)

module.exports = router

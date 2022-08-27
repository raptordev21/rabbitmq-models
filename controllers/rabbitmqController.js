const { getConnection } = require('../config/rabbitmq')
let channel = null

// @desc    Consume from RabbitMQ
// @route   GET /api/rabbitmq/consume
// @access  Public
const getMqData = async (req, res) => {
  try {
    // let data
    // let dataArr = []
    // if (channel == null) {
    //   channel = await getConnection().createChannel()
    // }
    // await channel.assertQueue("jobs")
    // await channel.consume("jobs", message => {
    //   data = JSON.parse(message.content.toString())
    //   dataArr.push(data)
    //   console.log(data)
    //   // dataArr.push(data)
    //   channel.ack(message)
    // })
    // res.status(200).json(dataArr)

    console.log('Client connected')
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Access-Control-Allow-Origin', '*')

    let data1
    let newdata
    if (channel == null) {
      channel = await getConnection().createChannel()
    }
    await channel.assertQueue("jobs")
    await channel.consume("jobs", message => {
      data1 = JSON.parse(message.content.toString())
      console.log(data1)
      // res.write(JSON.stringify(data))
      newdata = JSON.stringify(data1)
      res.write(`data: ${newdata}\n\n`)
      channel.ack(message)
    })

    res.on('close', () => {
      console.log('Client closed connection')
      res.end()
    })

  } catch (error) {
    console.error(error)
  }
}

// @desc    Publish to RabbitMQ
// @route   POST /api/rabbitmq/publish
// @access  Public
const setMqData = async (req, res) => {
  try {
    let dataToPublish = {
      name: req.body.name,
      message: req.body.message
    }

    const channel = await getConnection().createChannel()
    await channel.assertQueue("jobs")
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(dataToPublish)))
    await channel.close()

    res.status(200).json({ msg: "Data Published Successfully" })
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  getMqData,
  setMqData,
}

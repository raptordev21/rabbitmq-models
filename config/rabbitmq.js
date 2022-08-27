const amqp = require("amqplib")

let connection = {}
const connect = async () => {
  try {
    const amqpServer = "amqp://localhost:5672"
    connection = await amqp.connect(amqpServer)
  }
  catch (error) {
    console.error(error)
  }
}

const getConnection = () => {
  return connection
}

module.exports = {
  connect,
  getConnection,
}
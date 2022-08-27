# RabbitMQ Publisher-Consumer Models

> RabbitMQ Publisher-Consumer Models built using JavaScript, Express and Node.js

> Model 1: Console application with publisher.js and subscriber.js

> Model 2: Web application with frontend and backend server.

## Install dependencies

```
npm install

# Other dev packages needed are nodemon and serve, please install them globally or as dev dependencies.
```

## How to run web model
```
# Run backend server
npm run server

# Run frontend server
serve client

# Publish message to RabbitMQ using API:
# Open postman or thunder client
# hit POST 127.0.0.1:5000/api/rabbitmq/publish
# Body: {"name":"any name", "message":"any message"}

# Open Frontend in browser: localhost:3000
# Now you will see your message and whatever message
# sent next through postman will automatically appear
# on webpage.

# Server side events are used here to automatically
# get the data from backend api which is:
# GET 127.0.0.1:5000/api/rabbitmq/consume
```
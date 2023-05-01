const { Data, initDatabase } = require('../model/data');
const redisClient = require('../database/redis');
const startApiServer = require('../../api/api');
const { connectRabbitMQ, sendMessage } = require('../rabbitmq/rabbitmq');

(async () => {
  // Initialize the database
  await initDatabase();

  // Connect to RabbitMQ and consume messages
  connectRabbitMQ(async (msg, ack) => {
    const rowData = JSON.parse(msg.content.toString());
    console.log('Received message:', rowData);

    // Save the data to PostgreSQL
    const data = await Data.create(rowData);

    // Save the data to Redis
    redisClient.set(`data:${data.id}`, JSON.stringify(data));

    // Acknowledge the message
    ack();
  });

  // Start the API server
  startApiServer();
})();


const amqp = require('amqplib/callback_api');

function connectRabbitMQ() {
  return new Promise((resolve, reject) => {
    const rabbitMQUrl = 'amqp://localhost';

    // Connect to RabbitMQ
    amqp.connect(rabbitMQUrl, (err, connection) => {
      if (err) {
        console.error('Failed to connect to RabbitMQ:', err);
        reject(err);
      }

      // Create a channel
      connection.createChannel((err, channel) => {
        if (err) {
          console.error('Failed to create a channel:', err);
          reject(err);
        }

        // Declare the queue
        const queue = 'csv_data';
        channel.assertQueue(queue, { durable: false });

        resolve(channel);
      });
    });
  });
}

function sendMessage(channel, message) {
  const queue = 'csv_data';
  channel.sendToQueue(queue, Buffer.from(message));
}

module.exports = {
  connectRabbitMQ,
  sendMessage,
};

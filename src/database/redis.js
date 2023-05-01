const { createClient } = require('redis');

const redisClient = createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

redisClient.connect().then(() => {
  console.log('Connected to Redis.');
}).catch((error) => {
  console.error('Unable to connect to Redis:', error);
  process.exit(1);
});

module.exports = redisClient;

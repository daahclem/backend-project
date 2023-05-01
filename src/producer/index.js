const fs = require('fs');
const csvParser = require('csv-parser');
const rabbitmq = require('../rabbitmq/rabbitmq');


const sendCsvToQueue = async (csvPath, channel) => {
  try {
    const csvReadStream = fs.createReadStream(csvPath);
    const csvParseStream = csvParser({ separator: ',' });

    csvReadStream
      .pipe(csvParseStream)
      .on('data', async (row) => {
        // Parse the CSV row and create a message object
        const message = {
          field1: row.field1,
          field2: row.field2,
          field3: row.field3,
        };

        // Send the message to the RabbitMQ queue
        await rabbitmq.sendMessage(channel, JSON.stringify(message));
      })
      .on('end', () => {
        console.log('CSV file processing completed.');
      });
  } catch (error) {
    console.error('Error processing CSV file:', error);
  }
};

const init = async () => {
  const channel = await rabbitmq.connectRabbitMQ();
  await sendCsvToQueue('./fruits.csv', channel);
};

init();

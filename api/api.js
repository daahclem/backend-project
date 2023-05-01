const express = require('express');
const { Data } = require('../src/model/data');


// API setup
const app = express();
const port = 3000;

// API endpoint to get data
app.get('/data', async (req, res) => {
  // Query data from PostgreSQL
  const data = await Data.findAll({ where: req.query });
  res.json(data);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

// Start the API server
function startApiServer() {
  app.listen(port, () => {
    console.log(`Consumer API listening at http://localhost:${port}`);
  });
}

module.exports = startApiServer;

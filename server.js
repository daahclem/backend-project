const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const data = [];
const clients = new Set();

app.post('/data', (req, res) => {
  const newData = {
    id: uuidv4(),
    ...req.body
  };

  data.push(newData);

  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(newData)}\n\n`);
  });

  res.status(201).json(newData);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
  });
  

app.get('/data', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.add(res);

  req.on('close', () => {
    clients.delete(res);
  });
});

app.listen(port, () => {
  console.log(`Consumer API listening at http://localhost:${port}`);
});

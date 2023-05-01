const request = require('supertest');
const { startApiServer } = require('../api/api');
const Data = require('../src/model/data');
const app = startApiServer();

describe('API Tests', () => {
  // Test the GET /data route
  test('GET /data should return an array of data objects', async () => {
    const response = await request(app).get('/data');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Test adding a new data item and retrieving it using the API
  test('Adding and retrieving a data item', async () => {
    // Create a new data item
    const newItem = await Data.create({
      field1: 'Test Field 1',
      field2: 'Test Field 2'
    });

    // Query the API for the newly created item
    const response = await request(app).get('/data').query({ id: newItem.id });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].field1).toBe('Test Field 1');
    expect(response.body[0].field2).toBe('Test Field 2');
  });
});

// Add more tests as needed

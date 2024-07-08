const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../../app');  
const User = require('../models/User');

jest.setTimeout(30000);  

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await User.deleteMany();  
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();  
  });

  let refreshToken;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register') 
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('message', 'User registered successfully');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login') 
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data).toHaveProperty('refreshToken');
    refreshToken = res.body.refreshToken;
  });

});

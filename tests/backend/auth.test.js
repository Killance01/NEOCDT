// tests/backend/auth.test.js
jest.mock('@resend/client', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      sendEmail: jest.fn().mockResolvedValue({ id: 'fake-id' })
    }))
  };
});

require('dotenv').config();
const request = require('supertest');
const app = require('../../backend/src/app');
const mongoose = require('mongoose');


const testUser = {
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'password123'
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Endpoints', () => {
  let token;

  test('POST /api/auth/register -> debería registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(testUser.email);
  });

  test('POST /api/auth/login -> debería loguear un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    token = res.body.token; // guardar token para otros tests
  });

  test('POST /api/auth/forgot-password -> debería enviar email', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: testUser.email })
      .expect(200);

    expect(res.body).toHaveProperty('message');
  });

  test('POST /api/auth/reset-password -> debería resetear password', async () => {
    // Para este test necesitaríamos un token de reseteo, puedes mockearlo
  });
});

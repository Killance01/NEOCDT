// tests/backend/auth.test.js
require('dotenv').config({ path: './backend/.env' }); // ruta relativa desde donde ejecutas jest


const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../backend/src/app');
const User = require('../../backend/src/Models/Usuario');

const testUser = {
  email: 'testuser@example.com',
  password: 'Password123!'
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany({ email: testUser.email });
});

afterAll(async () => {
  await User.deleteMany({ email: testUser.email });
  await mongoose.disconnect();
});

describe('Auth Endpoints', () => {
  let token = '';
  let resetToken = '';

  it('POST /api/auth/register -> debería registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe(testUser.email);
  });

  it('POST /api/auth/login -> debería loguear un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(testUser)
      .expect(200);

    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('POST /api/auth/forgot-password -> debería generar token de recuperación', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')
      .send({ email: testUser.email })
      .expect(200);

    expect(res.body).toHaveProperty('message');
    // Normalmente tu backend enviaría email, aquí solo verificamos respuesta
  });

  it('POST /api/auth/reset-password -> debería resetear password', async () => {
    // Para test real, se necesita token de reset real que normalmente llega por email
    // Si tu backend permite token simulado, úsalo aquí:
    const newPassword = 'NewPassword123!';
    const res = await request(app)
      .post('/api/auth/reset-password')
      .send({ token: 'token-de-prueba', password: newPassword })
      .expect(200);

    expect(res.body).toHaveProperty('message');
  });
});

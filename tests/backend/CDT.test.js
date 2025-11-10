const request = require('supertest');
const app = require('../../backend/src/app');
const mongoose = require('mongoose');
require('dotenv').config();

let token; // token del usuario

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Login para obtener token
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ email: 'testuser@example.com', password: 'password123' });

  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('CDT Endpoints', () => {
  let cdtId;

  test('POST /api/cdts -> debería crear un CDT', async () => {
    const newCDT = { monto: 1000000, plazo: 6 };
    const res = await request(app)
      .post('/api/cdts')
      .set('Authorization', `Bearer ${token}`)
      .send(newCDT)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    cdtId = res.body._id;
  });

  test('GET /api/cdts -> debería listar los CDTs del usuario', async () => {
    const res = await request(app)
      .get('/api/cdts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  test('DELETE /api/cdts/:id -> debería eliminar un CDT', async () => {
    const res = await request(app)
      .delete(`/api/cdts/${cdtId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/eliminado/i);
  });
});

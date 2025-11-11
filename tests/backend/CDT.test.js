// tests/backend/CDT.test.js

require('dotenv').config({ path: './backend/.env' }); // ruta relativa desde donde ejecutas jest


const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../backend/src/app');
const CDT = require('../../backend/src/Models/CDT');
const User = require('../../backend/src/Models/Usuario');

const testUser = { email: 'testuser@example.com', password: 'Password123!' };
let token = '';
let cdtId = '';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Login para obtener token
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send(testUser)
    .expect(200);

  token = loginRes.body.token;
});

afterAll(async () => {
  // Limpia CDT creado en test
  if (cdtId) await CDT.deleteOne({ _id: cdtId });
  await mongoose.disconnect();
});

describe('CDT Endpoints', () => {
  it('POST /api/cdts -> debería crear un CDT', async () => {
    const newCDT = { monto: 1000000, plazo: 12 };
    const res = await request(app)
      .post('/api/cdts')
      .set('Authorization', `Bearer ${token}`)
      .send(newCDT)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    cdtId = res.body._id;
    expect(res.body.monto).toBe(newCDT.monto);
  });

  it('GET /api/cdts -> debería listar los CDTs del usuario', async () => {
    const res = await request(app)
      .get('/api/cdts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(cdt => cdt._id === cdtId)).toBe(true);
  });

  it('DELETE /api/cdts/:id -> debería eliminar un CDT', async () => {
    if (!cdtId) return;
    const res = await request(app)
      .delete(`/api/cdts/${cdtId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/eliminado/i);
    cdtId = '';
  });
});

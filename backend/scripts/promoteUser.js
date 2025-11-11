require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('../src/Models/Usuario');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ No se encontró MONGO_URI en .env');
  process.exit(1);
}

const [,, correo, nuevoRol] = process.argv;
if (!correo || !nuevoRol) {
  console.error('Uso: node scripts\\promoteUser.js <correo> <NuevoRol>');
  console.error('Ejemplo: node scripts\\promoteUser.js agente@ejemplo.com Agente');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Conectado a Mongo');
    const user = await Usuario.findOne({ correo });
    if (!user) {
      console.error('Usuario no encontrado para correo:', correo);
      process.exit(1);
    }

    user.rol = nuevoRol;
    await user.save();
    console.log(`Usuario ${correo} actualizado a rol: ${nuevoRol}`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error conectando a Mongo:', err.message);
    process.exit(1);
  });

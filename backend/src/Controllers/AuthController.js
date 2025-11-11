const Usuario = require('../Models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);
const User = Usuario;

// 🔹 Verificar variables de entorno
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ definida' : '❌ no definida');
console.log('EMAIL_FROM:', process.env.EMAIL_FROM || '❌ no definida');

// 🟢 Registro de usuario
exports.register = async (req, res) => {
  const { nombreUsuario, nombreCompleto, correo, contrasena, rol } = req.body;

  try {
    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) return res.status(400).json({ error: "Correo ya registrado" });

    const nuevoUsuario = new Usuario({ nombreUsuario, nombreCompleto, correo, contrasena, rol });
    await nuevoUsuario.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Login
exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const user = await Usuario.findOne({ correo });
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) return res.status(400).json({ error: 'Credenciales inválidas' });

    user.fechaUltimoIngreso = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, rol: user.rol, nombreUsuario: user.nombreUsuario },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ 
      token, 
      rol: user.rol, 
      nombreUsuario: user.nombreUsuario 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟦 Recuperar contraseña (envía enlace con Resend)
exports.forgotPassword = async (req, res) => {
  const { correo } = req.body; // cambiamos email → correo

  try {
    const user = await User.findOne({ correo });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    // Token temporal (15 min)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    // Enviar correo con Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: correo,
      subject: 'Recupera tu contraseña - NEOCDT',
      html: `
        <p>Hola ${user.nombreCompleto || 'usuario'},</p>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p><i>El enlace caduca en 15 minutos.</i></p>
      `,
    });

    if (error) throw error;

    console.log('📨 Correo de recuperación enviado:', data?.id || '(sin ID)');
    res.json({ message: 'Correo de recuperación enviado correctamente.' });
  } catch (err) {
    console.error('❌ Error al enviar correo con Resend:', err);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
};

// 🟦 Restablecer contraseña
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    user.contrasena = newPassword;
    await user.save();
    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.status(400).json({ message: 'Token inválido o expirado.' });
  }
};



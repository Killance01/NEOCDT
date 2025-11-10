const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

// Rutas existentes
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// 🔹 Nuevas rutas
router.post('/forgot-password', authCtrl.forgotPassword);
router.post('/reset-password', authCtrl.resetPassword);

module.exports = router;


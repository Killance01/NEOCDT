const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/AuthMiddleware');
const {
  crearCDT,
  actualizarCDT,
  listarCDTs,
  listarTodosCDTs,
  actualizarEstado,
  eliminarCDT,
  detalleCDT,
} = require('../Controllers/CDTController');

// =======================
// Rutas para clientes
// =======================

// Crear un nuevo CDT
router.post('/', authMiddleware, crearCDT);
// Editar CDT
router.put('/:id', authMiddleware, actualizarCDT);

// Listar los CDTs propios del cliente
router.get('/', authMiddleware, listarCDTs);

// Eliminar CDT (solo si está pendiente)
router.delete('/:id', authMiddleware, eliminarCDT);

// =======================
// Rutas para agentes / admin
// =======================

// Listar todos los CDTs
router.get('/all', authMiddleware, listarTodosCDTs);

// Actualizar estado de un CDT
router.put('/:id/status', authMiddleware, actualizarEstado);

// Obtener detalle de un CDT
router.get('/:id', authMiddleware, detalleCDT);

module.exports = router;

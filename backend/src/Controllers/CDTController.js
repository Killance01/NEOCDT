const CDT = require('../Models/CDT');
const Usuario = require('../Models/Usuario');

// Crear un nuevo CDT (cliente)
const crearCDT = async (req, res) => {
  const { monto, plazo, renovacionAutomatica } = req.body;
  const usuarioId = req.usuarioId;

  try {
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + Number(plazo));

    const nuevoCDT = new CDT({
      usuarioId,
      monto,
      plazo,
      fechaVencimiento,
      renovacionAutomatica,
      estado: 'Pendiente',
      fechaCreacion: new Date(),
    });

    await nuevoCDT.save();
    res.status(201).json({ message: 'Solicitud de apertura de CDT enviada', cdt: nuevoCDT });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar CDTs de un cliente (usuario normal)
const listarCDTs = async (req, res) => {
  const usuarioId = req.usuarioId; // viene del authMiddleware

  try {
    const cdts = await CDT.find({ usuarioId }); // solo los del usuario
    res.json(cdts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos los CDTs (solo agentes y admins)
const listarTodosCDTs = async (req, res) => {
  const usuarioId = req.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId);
    const rol = (usuario?.rol || '').toLowerCase();
    if (!['agente', 'admin', 'administrador'].includes(rol)) {
      return res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
    }

    const cdts = await CDT.find();
    res.json(cdts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar estado del CDT
const actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const usuarioId = req.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId);
    const rol = (usuario?.rol || '').toLowerCase();
    if (!['agente', 'admin', 'administrador'].includes(rol)) {
      return res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
    }

    const cdt = await CDT.findById(id);
    if (!cdt) return res.status(404).json({ error: 'CDT no encontrado' });

    const estadosPermitidos = ['Pendiente', 'Aprobado', 'Activo', 'Rechazado', 'Cancelado'];
    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }

    cdt.estado = estado;
    await cdt.save();

    res.json({ message: 'Estado actualizado correctamente', cdt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar CDT (solo si está pendiente)
const eliminarCDT = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuarioId;

  try {
    const cdt = await CDT.findById(id);
    if (!cdt) return res.status(404).json({ error: 'CDT no encontrado' });

    const usuario = await Usuario.findById(usuarioId);
    const rol = (usuario?.rol || '').toLowerCase();

    // Solo el dueño del CDT o agentes/admins pueden eliminar
    if (rol === 'cliente') {
      if (cdt.usuarioId.toString() !== usuarioId) {
        return res.status(403).json({ error: 'No puedes eliminar este CDT' });
      }
      if (cdt.estado !== 'Pendiente') {
        return res.status(400).json({ error: 'Solo se pueden eliminar CDTs pendientes' });
      }
    } else if (!['agente', 'admin', 'administrador'].includes(rol)) {
      return res.status(403).json({ error: 'No tienes permisos para eliminar' });
    }

    await CDT.deleteOne({ _id: id });
    res.json({ message: 'CDT eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Obtener detalle de CDT
const detalleCDT = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId);
    const rol = (usuario?.rol || '').toLowerCase();
    if (!['agente', 'admin', 'administrador'].includes(rol)) {
      return res.status(403).json({ error: 'No tienes permisos para ver el detalle' });
    }

    const cdt = await CDT.findById(id);
    if (!cdt) return res.status(404).json({ error: 'CDT no encontrado' });

    res.json(cdt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exportar todas las funciones
module.exports = {
  crearCDT,
  listarCDTs,
  listarTodosCDTs,
  actualizarEstado,
  eliminarCDT,
  detalleCDT,
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CDTSchema = new Schema({
  usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  monto: { type: Number, required: true },
  plazo: { type: Number, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaVencimiento: { type: Date },
  fechaActualizacion: { type: Date },
  estado: { 
    type: String, 
    enum: ['Pendiente', 'Aprobado', 'Activo', 'Rechazado'], 
    default: 'Pendiente' 
  },
  renovacionAutomatica: { type: Boolean, default: false }
});

module.exports = mongoose.model('CDT', CDTSchema);


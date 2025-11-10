const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No autorizado' });

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Tomamos userId del payload, que coincide con lo que pusimos en login
    req.usuarioId = payload.userId;

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};


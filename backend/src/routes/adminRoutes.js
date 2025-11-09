const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  obtenerUsuarios,
  obtenerContenidos,
  obtenerEstadisticas
} = require('../controllers/adminController');

// 🛡️ Todas las rutas protegidas por JWT
router.get('/usuarios', auth, obtenerUsuarios);
router.get('/contenido', auth, obtenerContenidos);
router.get('/estadisticas', auth, obtenerEstadisticas);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { obtenerProgresoUsuario } = require('../controllers/progresoController');

// Ruta protegida: requiere JWT
router.get('/:id_usuario', auth, obtenerProgresoUsuario);

module.exports = router;

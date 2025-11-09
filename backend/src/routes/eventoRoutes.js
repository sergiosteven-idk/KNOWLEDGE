const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { obtenerEventos, registrarEvento } = require('../controllers/eventoController');

router.get('/', obtenerEventos);
router.post('/registrar', auth, registrarEvento);

module.exports = router;

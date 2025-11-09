const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { crearFeedback, obtenerFeedbackPorContenido } = require('../controllers/feedbackController');

// Enviar feedback (requiere autenticación)
router.post('/', auth, crearFeedback);

// Obtener feedback por contenido
router.get('/:id_contenido', obtenerFeedbackPorContenido);

module.exports = router;

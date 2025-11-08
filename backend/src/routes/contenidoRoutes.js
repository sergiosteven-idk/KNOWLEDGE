const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  crearContenido,
  obtenerContenidos,
  obtenerContenidoPorId,
  actualizarContenido,
  eliminarContenido
} = require('../controllers/contenidoController');

// CRUD de contenido
router.post('/', auth, crearContenido);           // Crear contenido (protegido)
router.get('/', obtenerContenidos);               // Ver todos los publicados
router.get('/:id', obtenerContenidoPorId);        // Ver uno por ID
router.put('/:id', auth, actualizarContenido);    // Actualizar contenido (protegido)
router.delete('/:id', auth, eliminarContenido);   // Eliminar contenido (protegido)

module.exports = router;

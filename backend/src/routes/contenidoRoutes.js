const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  crearContenido,
  obtenerContenidosAprobados,
  obtenerPorUsuario,
} = require("../controllers/contenidoController");

// Subida de contenido (usuarios)
router.post("/", auth, upload.single("archivo"), crearContenido);

// Feed público
router.get("/aprobados", obtenerContenidosAprobados);

// Contenido por usuario
router.get("/mis/:id", auth, obtenerPorUsuario);

module.exports = router;

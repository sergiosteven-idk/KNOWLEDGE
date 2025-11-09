// ==============================
// 🛣️ RUTAS ADMINISTRATIVAS — KNOWLEDGE
// ==============================
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  obtenerContenidos,
  aprobarContenido,
  rechazarContenido,
  eliminarContenido,
  obtenerUsuarios,
  obtenerEstadisticas,
} = require("../controllers/adminController");

// 📂 Gestión de contenidos
router.get("/contenido", auth, obtenerContenidos);
router.put("/contenido/:id/aprobar", auth, aprobarContenido);
router.put("/contenido/:id/rechazar", auth, rechazarContenido);
router.delete("/contenido/:id", auth, eliminarContenido);

// 👥 Usuarios
router.get("/usuarios", auth, obtenerUsuarios);

// 📊 Estadísticas
router.get("/estadisticas", auth, obtenerEstadisticas);

module.exports = router;

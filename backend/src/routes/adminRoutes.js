const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  obtenerUsuarios,
  obtenerContenidos,
  obtenerEstadisticas,
  aprobarContenido,
  rechazarContenido,
} = require("../controllers/adminController");

// 🛡️ Rutas protegidas
router.get("/usuarios", auth, obtenerUsuarios);
router.get("/contenido", auth, obtenerContenidos);
router.get("/estadisticas", auth, obtenerEstadisticas);

// ✅ Nuevas rutas de aprobación / rechazo
router.put("/contenido/:id/aprobar", auth, aprobarContenido);
router.put("/contenido/:id/rechazar", auth, rechazarContenido);

module.exports = router;

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

// Middleware opcional para verificar rol de admin/docente
const verificarRolAdmin = (req, res, next) => {
  const user = req.user;
  if (!user || !["super_admin", "docente"].includes(user.tipo_usuario)) {
    return res.status(403).json({ message: "Acceso denegado: privilegios insuficientes." });
  }
  next();
};

// ===================================
// 📂 Gestión de Contenidos
// ===================================
router.get("/contenidos", auth, verificarRolAdmin, obtenerContenidos);
router.put("/contenido/:id/aprobar", auth, verificarRolAdmin, aprobarContenido);
router.put("/contenido/:id/rechazar", auth, verificarRolAdmin, rechazarContenido);
router.delete("/contenido/:id", auth, verificarRolAdmin, eliminarContenido);

// ===================================
// 👥 Gestión de Usuarios
// ===================================
router.get("/usuarios", auth, verificarRolAdmin, obtenerUsuarios);

// ===================================
// 📊 Estadísticas del Sistema
// ===================================
router.get("/estadisticas", auth, verificarRolAdmin, obtenerEstadisticas);

module.exports = router;

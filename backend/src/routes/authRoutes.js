const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  register,
  login,
  obtenerPerfil,
  actualizarPerfil,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// 🔐 Recuperación de contraseña (RF-06)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// 👤 Perfil
router.get("/me/:id", auth, obtenerPerfil);
router.put("/update/:id", auth, actualizarPerfil);

module.exports = router;

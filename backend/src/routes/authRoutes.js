const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  register,
  login,
  obtenerPerfil,
  actualizarPerfil,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// 👤 Perfil
router.get("/me/:id", auth, obtenerPerfil);
router.put("/update/:id", auth, actualizarPerfil);

module.exports = router;

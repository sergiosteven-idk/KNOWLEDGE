// ==============================
// 🌐 KNOWLEDGE BACKEND SERVER
// ==============================
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

// Rutas importadas
const authRoutes = require("./routes/authRoutes");
const contenidoRoutes = require("./routes/contenidoRoutes");
const progresoRoutes = require("./routes/progresoRoutes");
const adminRoutes = require("./routes/adminRoutes");
const eventoRoutes = require("./routes/eventoRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const donacionRoutes = require("./routes/donacionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================
// 🧩 MIDDLEWARES
// ==============================
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ==============================
// 🚦 RUTAS PRINCIPALES
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/contenido", contenidoRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/eventos", eventoRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/donaciones", donacionRoutes);

// ==============================
// 🩺 RUTA DE SALUD
// ==============================
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Knowledge API is running",
    timestamp: new Date().toISOString(),
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Handler de errores
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});

// ==============================
// 🚀 INICIAR SERVIDOR
// ==============================
app.listen(PORT, () => {
  console.log(`🎓 Knowledge Backend running on port ${PORT}`);
});

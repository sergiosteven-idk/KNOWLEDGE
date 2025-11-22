// ==============================
// 🌐 KNOWLEDGE BACKEND SERVER
// ==============================

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("./config/db");

// ==============================
// 📦 IMPORTAR RUTAS
// ==============================
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

// Obtener la IP local para configuración dinámica
const os = require("os");
const networkInterfaces = os.networkInterfaces();
let localIP = "localhost";

// Encontrar la IP de la red local
Object.keys(networkInterfaces).forEach((interfaceName) => {
  const interfaces = networkInterfaces[interfaceName];
  interfaces.forEach((iface) => {
    if (iface.family === "IPv4" && !iface.internal) {
      localIP = iface.address;
    }
  });
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      `http://${localIP}:5173`,
      `http://${localIP}:3000`,
      // Permitir cualquier origen en la red local para desarrollo móvil
      /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d+$/,
      /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$/,
      /^http:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}:\d+$/,
    ],
    credentials: true,
  })
);
app.use(express.json());

// 🖼️ Servir archivos subidos (videos, PDFs, etc.)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

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
// 🩺 RUTA DE SALUD (STATUS API)
// ==============================
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "🎓 Knowledge API is running successfully",
    database: db ? "Connected ✅" : "Disconnected ❌",
    timestamp: new Date().toISOString(),
  });
});

// ==============================
// ⚠️ MANEJO DE ERRORES
// ==============================

// Ruta no encontrada (404)
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Errores generales del servidor
app.use((err, req, res, next) => {
  console.error("❌ Error en el servidor:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Error interno del servidor" });
});

// ==============================
// 🚀 INICIAR SERVIDOR
// ==============================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`
  ==============================
  🎓 Knowledge Backend Server
  ✅ Running on port: ${PORT}
  🌐 Local: http://localhost:${PORT}
  📱 Network: http://${localIP}:${PORT}
  📦 Uploads: /uploads
  ==============================
  `);
});

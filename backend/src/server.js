// ==============================
// 🌐 KNOWLEDGE BACKEND SERVER
// ==============================

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // conexión a MySQL
const authRoutes = require('./routes/authRoutes'); // rutas de autenticación
const contenidoRoutes = require('./routes/contenidoRoutes'); // ✅ rutas de contenido educativo

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================
// 🧩 MIDDLEWARES
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// 🚦 RUTAS PRINCIPALES
// ==============================

// Autenticación
app.use('/api/auth', authRoutes);

// Contenido educativo (CRUD)
app.use('/api/contenido', contenidoRoutes); // ✅ agrega esta línea

// Ruta de salud / verificación del servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Knowledge API is running',
    timestamp: new Date().toISOString(),
  });
});

// ==============================
// 🚀 INICIAR SERVIDOR
// ==============================
app.listen(PORT, () => {
  console.log(`🎓 Knowledge Backend running on port ${PORT}`);
});

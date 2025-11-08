// ==============================
// 🌐 KNOWLEDGE BACKEND SERVER
// ==============================

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

// Rutas importadas
const authRoutes = require('./routes/authRoutes');
const contenidoRoutes = require('./routes/contenidoRoutes');
const progresoRoutes = require('./routes/progresoRoutes'); // ✅ progreso

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
app.use('/api/auth', authRoutes);        // Autenticación
app.use('/api/contenido', contenidoRoutes); // Contenido educativo
app.use('/api/progreso', progresoRoutes);   // Progreso del usuario

// ==============================
// 🩺 RUTA DE SALUD (test rápido)
// ==============================
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

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
const progresoRoutes = require('./routes/progresoRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const eventoRoutes = require('./routes/eventoRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const donacionRoutes = require('./routes/donacionRoutes');


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

// 🔐 Autenticación (login / registro)
app.use('/api/auth', authRoutes);

// 📚 Contenido educativo (CRUD)
app.use('/api/contenido', contenidoRoutes);

// 📊 Progreso del usuario (Dashboard)
app.use('/api/progreso', progresoRoutes);

// 🧑‍💼 Administración del sistema (usuarios, contenido, estadísticas)
app.use('/api/admin', adminRoutes);

// ==============================
// 🩺 RUTA DE SALUD (verificación rápida)
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

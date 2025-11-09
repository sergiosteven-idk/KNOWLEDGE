// ==============================
// 📁 MIDDLEWARE DE SUBIDA DE ARCHIVOS — KNOWLEDGE
// ==============================
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Crear carpeta si no existe
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${unique}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["video/mp4", "application/pdf"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Formato no permitido. Solo MP4 y PDF."));
};

module.exports = multer({ storage, fileFilter });

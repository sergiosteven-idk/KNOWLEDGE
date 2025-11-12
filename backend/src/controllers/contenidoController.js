const db = require("../config/db");
const path = require("path");

// 🧩 Crear nuevo contenido (con o sin archivo)
exports.crearContenido = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      tipo,
      url_contenido,
      id_autor,
      nivel_dificultad,
    } = req.body;

    if (!titulo || !tipo)
      return res.status(400).json({ message: "Título y tipo son obligatorios" });

    let archivo_url = null;
    if (req.file) {
      archivo_url = `/uploads/${req.file.filename}`;
    }

    const [result] = await db.query(
      `INSERT INTO ContenidoEducativo 
       (titulo, descripcion, tipo, url_contenido, archivo_url, id_autor, nivel_dificultad, estado, fecha_publicacion)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pendiente', NOW())`,
      [
        titulo,
        descripcion || "",
        tipo,
        url_contenido || null,
        archivo_url,
        id_autor || null,
        nivel_dificultad || "principiante",
      ]
    );

    res.status(201).json({
      message: "✅ Contenido enviado para revisión.",
      id: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error al crear contenido:", error);
    res.status(500).json({ message: "Error al crear contenido." });
  }
};

// 🔍 Obtener contenidos aprobados (feed público)
exports.obtenerAprobados = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id_contenido, titulo, descripcion, tipo, url_contenido, archivo_url, nivel_dificultad, fecha_publicacion 
       FROM ContenidoEducativo WHERE estado = 'aprobado' ORDER BY fecha_publicacion DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener contenidos aprobados." });
  }
};

// 📚 Obtener contenidos de un usuario
exports.obtenerPorUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      `SELECT * FROM ContenidoEducativo WHERE id_autor = ? ORDER BY fecha_publicacion DESC`,
      [id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener contenidos del usuario." });
  }
};

// ==============================
// 📚 Obtener contenidos aprobados para el Home
// ==============================
exports.obtenerContenidosAprobados = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
       id_contenido,
       titulo,
       tipo,
       archivo_url,
       nivel_dificultad,
       DATE_FORMAT(fecha_publicacion, '%Y-%m-%d %H:%i:%s') AS fecha_publicacion,
       (SELECT CONCAT(nombre, ' ', apellido) FROM Miembro WHERE id_usuario = c.id_autor) AS autor
     FROM ContenidoEducativo c
     WHERE estado = 'aprobado'
     ORDER BY fecha_publicacion DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener contenidos aprobados:", error);
    res.status(500).json({ message: "Error al obtener los contenidos aprobados." });
  }
};

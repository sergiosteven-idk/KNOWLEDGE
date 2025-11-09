const db = require('../config/db');

// 🧑‍💼 Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id_usuario, nombre, apellido, correo, tipo_usuario, activo, fecha_registro FROM Miembro ORDER BY fecha_registro DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// 🧱 Obtener todos los contenidos educativos
exports.obtenerContenidos = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id_contenido, titulo, tipo, estado, nivel_dificultad, fecha_publicacion
       FROM ContenidoEducativo ORDER BY fecha_publicacion DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener contenido:', error);
    res.status(500).json({ message: 'Error al obtener contenido' });
  }
};

// 📊 Estadísticas generales
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const [[usuarios]] = await db.query('SELECT COUNT(*) AS total_usuarios FROM Miembro');
    const [[contenidos]] = await db.query('SELECT COUNT(*) AS total_contenidos FROM ContenidoEducativo');
    const [[progreso]] = await db.query('SELECT AVG(porcentaje_completado) AS promedio_progreso FROM Progreso');

    res.json({
      total_usuarios: usuarios.total_usuarios,
      total_contenidos: contenidos.total_contenidos,
      promedio_progreso: progreso.promedio_progreso ? parseFloat(progreso.promedio_progreso).toFixed(2) : 0,
    });
  } catch (error) {
    console.error('❌ Error al obtener estadísticas:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas' });
  }
};

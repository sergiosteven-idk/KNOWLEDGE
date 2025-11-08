const db = require('../config/db');

// Obtener progreso de un usuario específico
exports.obtenerProgresoUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    const [rows] = await db.query(`
      SELECT 
        p.id_progreso,
        p.tipo_progreso,
        p.porcentaje_completado,
        p.tiempo_total_segundos,
        p.estado,
        c.titulo AS contenido,
        c.tipo AS tipo_contenido
      FROM Progreso p
      LEFT JOIN ContenidoEducativo c ON p.id_contenido = c.id_contenido
      WHERE p.id_usuario = ?
    `, [id_usuario]);

    res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener progreso:', error);
    res.status(500).json({ message: 'Error al obtener progreso del usuario' });
  }
};

const db = require('../config/db');

// 📝 Crear feedback
exports.crearFeedback = async (req, res) => {
  try {
    const { id_usuario, id_contenido, tipo_feedback, calificacion, comentario } = req.body;

    await db.query(
      `INSERT INTO Feedback (id_usuario, id_contenido, tipo_feedback, calificacion, comentario, estado)
       VALUES (?, ?, ?, ?, ?, 'nuevo')`,
      [id_usuario, id_contenido || null, tipo_feedback, calificacion, comentario]
    );

    res.status(201).json({ message: '✅ Gracias por tu comentario y calificación.' });
  } catch (error) {
    console.error('❌ Error al crear feedback:', error);
    res.status(500).json({ message: 'Error al enviar feedback.' });
  }
};

// 📋 Obtener feedback por contenido
exports.obtenerFeedbackPorContenido = async (req, res) => {
  try {
    const { id_contenido } = req.params;

    const [rows] = await db.query(
      `SELECT f.id_feedback, f.tipo_feedback, f.calificacion, f.comentario, f.fecha,
              m.nombre, m.apellido
       FROM Feedback f
       JOIN Miembro m ON f.id_usuario = m.id_usuario
       WHERE f.id_contenido = ?
       ORDER BY f.fecha DESC`,
      [id_contenido]
    );

    res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener feedback:', error);
    res.status(500).json({ message: 'Error al obtener feedback.' });
  }
};

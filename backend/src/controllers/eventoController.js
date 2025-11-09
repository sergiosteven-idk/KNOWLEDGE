const db = require('../config/db');

// 📅 Obtener eventos activos
exports.obtenerEventos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id_evento, titulo, descripcion, tipo_evento, fecha_inicio, fecha_fin,
             ubicacion, es_virtual, url_evento, imagen_url, estado
      FROM Evento
      WHERE estado = 'activo'
      ORDER BY fecha_inicio ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener eventos:', error);
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
};

// 📝 Registrar usuario en un evento
exports.registrarEvento = async (req, res) => {
  try {
    const { id_usuario, id_evento } = req.body;
    await db.query(
      `INSERT INTO Registro_Evento (id_evento, id_usuario, estado)
       VALUES (?, ?, 'confirmado')`,
      [id_evento, id_usuario]
    );
    res.status(201).json({ message: 'Registro exitoso al evento' });
  } catch (error) {
    console.error('❌ Error al registrar evento:', error);
    res.status(500).json({ message: 'Error al registrarse en el evento' });
  }
};

const db = require('../config/db');

// Crear nuevo contenido educativo
exports.crearContenido = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      tipo,
      url_contenido,
      id_categoria,
      id_autor,
      url_subtitulos,
      url_transcripcion,
      url_audio_descripcion,
      nivel_dificultad
    } = req.body;

    if (!titulo || !tipo) {
      return res.status(400).json({ message: 'Título y tipo son obligatorios' });
    }

    const [result] = await db.query(
      `INSERT INTO ContenidoEducativo 
      (titulo, descripcion, tipo, url_contenido, id_categoria, id_autor, url_subtitulos, url_transcripcion, url_audio_descripcion, nivel_dificultad, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'borrador')`,
      [
        titulo,
        descripcion || '',
        tipo,
        url_contenido || '',
        id_categoria || null,
        id_autor || null,
        url_subtitulos || null,
        url_transcripcion || null,
        url_audio_descripcion || null,
        nivel_dificultad || 'principiante'
      ]
    );

    res.status(201).json({ message: 'Contenido creado correctamente', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear contenido' });
  }
};

// Obtener todos los contenidos (solo publicados)
exports.obtenerContenidos = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.*, cat.nombre_categoria 
       FROM ContenidoEducativo c 
       LEFT JOIN Categoria cat ON c.id_categoria = cat.id_categoria
       WHERE c.estado = 'publicado'`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener contenidos' });
  }
};

// Obtener contenido por ID
exports.obtenerContenidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM ContenidoEducativo WHERE id_contenido = ?', [id]);

    if (rows.length === 0) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener contenido' });
  }
};

// Actualizar contenido
exports.actualizarContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    const [result] = await db.query('UPDATE ContenidoEducativo SET ? WHERE id_contenido = ?', [campos, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json({ message: 'Contenido actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar contenido' });
  }
};

// Eliminar contenido
exports.eliminarContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM ContenidoEducativo WHERE id_contenido = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json({ message: 'Contenido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar contenido' });
  }
};

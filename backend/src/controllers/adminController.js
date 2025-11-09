// ==============================
// 🧑‍💼 ADMIN CONTROLLER — KNOWLEDGE
// ==============================
const db = require("../config/db");

// 📚 Obtener todos los contenidos con detalles
exports.obtenerContenidos = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         id_contenido,
         titulo,
         tipo,
         id_autor,
         (SELECT CONCAT(nombre, ' ', apellido) FROM Miembro WHERE id_usuario = c.id_autor) AS autor,
         archivo_url,
         extension,
         CASE 
           WHEN estado IS NULL OR estado='borrador' THEN 'pendiente'
           ELSE estado
         END AS estado,
         nivel_dificultad,
         DATE_FORMAT(fecha_publicacion, '%Y-%m-%d %H:%i:%s') AS fecha_publicacion
       FROM ContenidoEducativo c
       ORDER BY fecha_publicacion DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener contenidos:", error);
    res.status(500).json({ message: "Error al obtener contenidos." });
  }
};

// ✅ Aprobar contenido
exports.aprobarContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "UPDATE ContenidoEducativo SET estado='aprobado', fecha_publicacion=NOW() WHERE id_contenido=?",
      [id]
    );
    if (!rows.affectedRows) return res.status(404).json({ message: "Contenido no encontrado" });
    res.json({ message: "✅ Contenido aprobado correctamente." });
  } catch (error) {
    console.error("❌ Error al aprobar contenido:", error);
    res.status(500).json({ message: "Error al aprobar contenido." });
  }
};

// ❌ Rechazar contenido
exports.rechazarContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "UPDATE ContenidoEducativo SET estado='rechazado' WHERE id_contenido=?",
      [id]
    );
    if (!rows.affectedRows) return res.status(404).json({ message: "Contenido no encontrado" });
    res.json({ message: "❌ Contenido rechazado correctamente." });
  } catch (error) {
    console.error("❌ Error al rechazar contenido:", error);
    res.status(500).json({ message: "Error al rechazar contenido." });
  }
};

// 🗑️ Eliminar contenido
exports.eliminarContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("DELETE FROM ContenidoEducativo WHERE id_contenido=?", [id]);
    if (!rows.affectedRows) return res.status(404).json({ message: "Contenido no encontrado" });
    res.json({ message: "🗑️ Contenido eliminado correctamente." });
  } catch (error) {
    console.error("❌ Error al eliminar contenido:", error);
    res.status(500).json({ message: "Error al eliminar contenido." });
  }
};

// 👥 Obtener usuarios registrados
exports.obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
         id_usuario,
         CONCAT(nombre, ' ', apellido) AS nombre_completo,
         correo,
         tipo_usuario,
         activo,
         fecha_registro
       FROM Miembro
       ORDER BY fecha_registro DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios." });
  }
};

// 📊 Obtener estadísticas del sistema
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const [[usuarios]] = await db.query("SELECT COUNT(*) AS usuarios FROM Miembro");
    const [[contenidos]] = await db.query("SELECT COUNT(*) AS contenidos FROM ContenidoEducativo");
    const [[promedio]] = await db.query(
      "SELECT IFNULL(AVG(porcentaje_completado),0) AS promedio_progreso FROM Progreso"
    );

    res.json({
      usuarios: usuarios.usuarios,
      contenidos: contenidos.contenidos,
      promedio_progreso: Number(promedio.promedio_progreso).toFixed(1),
    });
  } catch (error) {
    console.error("❌ Error al obtener estadísticas:", error);
    res.status(500).json({ message: "Error al obtener estadísticas." });
  }
};

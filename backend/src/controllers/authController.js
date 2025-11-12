const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasena, tipo_usuario } = req.body;
    if (!nombre || !apellido || !correo || !contrasena)
      return res.status(400).json({ message: "Todos los campos son obligatorios" });

    const [existing] = await db.query("SELECT * FROM Miembro WHERE correo = ?", [correo]);
    if (existing.length > 0)
      return res.status(400).json({ message: "El correo ya está registrado" });

    const hashed = await bcrypt.hash(contrasena, 10);
    await db.query(
      "INSERT INTO Miembro (nombre, apellido, correo, contrasena, tipo_usuario) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, correo, hashed, tipo_usuario || "estudiante"]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const [rows] = await db.query("SELECT * FROM Miembro WHERE correo = ? AND activo = TRUE", [correo]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Usuario no encontrado o inactivo" });

    const user = rows[0];
    const valid = await bcrypt.compare(contrasena, user.contrasena);
    if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        correo: user.correo,
        tipo_usuario: user.tipo_usuario,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        tipo_usuario: user.tipo_usuario,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

// 👤 Obtener perfil
exports.obtenerPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(
      "SELECT id_usuario, nombre, apellido, correo, tipo_usuario FROM Miembro WHERE id_usuario = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error al obtener perfil:", error);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};

// ✏️ Actualizar perfil
exports.actualizarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo } = req.body;

    const [rows] = await db.query(
      "UPDATE Miembro SET nombre = ?, apellido = ?, correo = ? WHERE id_usuario = ?",
      [nombre, apellido, correo, id]
    );

    if (rows.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "✅ Perfil actualizado correctamente." });
  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};

// ==============================
// 🔐 RECUPERACIÓN DE CONTRASEÑA (RF-06)
// ==============================

// Solicitar recuperación de contraseña
exports.forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;

    if (!correo || !correo.includes("@")) {
      return res.status(400).json({ message: "Correo inválido" });
    }

    const [rows] = await db.query("SELECT id_usuario, nombre FROM Miembro WHERE correo = ?", [correo]);
    if (rows.length === 0) {
      // Por seguridad, no revelamos si el correo existe o no
      return res.json({ 
        message: "Si la cuenta existe, recibirás un correo con instrucciones de recuperación." 
      });
    }

    const user = rows[0];

    // Generar token JWT de recuperación (válido por 1 hora)
    const resetToken = jwt.sign(
      { id_usuario: user.id_usuario, correo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Guardar token en tabla temporal (en producción, enviar por email)
    await db.query(
      "INSERT INTO PasswordReset (id_usuario, token, fecha_expiracion) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR)) ON DUPLICATE KEY UPDATE token = ?, fecha_expiracion = DATE_ADD(NOW(), INTERVAL 1 HOUR)",
      [user.id_usuario, resetToken, resetToken]
    );

    // TODO: En producción, enviar email con enlace:
    // const resetLink = `${process.env.FRONTEND_URL}/resetear-contrasena?token=${resetToken}`;
    // await enviarEmail(correo, "Recuperación de contraseña", `Haz clic aquí: ${resetLink}`);

    console.log(`🔐 Token de reset para ${correo}: ${resetToken}`);

    res.json({ 
      message: "✅ Instrucciones de recuperación enviadas al correo.",
      // Solo para desarrollo - REMOVER EN PRODUCCIÓN
      ...(process.env.NODE_ENV === "development" && { resetToken })
    });
  } catch (error) {
    console.error("❌ Error al solicitar recuperación:", error);
    res.status(500).json({ message: "Error al procesar recuperación de contraseña" });
  }
};

// Restablecer contraseña
exports.resetPassword = async (req, res) => {
  try {
    const { token, contrasena_nueva } = req.body;

    if (!token || !contrasena_nueva) {
      return res.status(400).json({ message: "Token y nueva contraseña son obligatorios" });
    }

    // Verificar token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    const { id_usuario } = decoded;

    // Verificar que el token existe en DB y no ha expirado
    const [resetTokenRows] = await db.query(
      "SELECT * FROM PasswordReset WHERE id_usuario = ? AND token = ? AND fecha_expiracion > NOW()",
      [id_usuario, token]
    );

    if (resetTokenRows.length === 0) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    // Cambiar contraseña
    const hashed = await bcrypt.hash(contrasena_nueva, 10);
    await db.query(
      "UPDATE Miembro SET contrasena = ? WHERE id_usuario = ?",
      [hashed, id_usuario]
    );

    // Eliminar token usado
    await db.query("DELETE FROM PasswordReset WHERE id_usuario = ?", [id_usuario]);

    res.json({ message: "✅ Contraseña restablecida correctamente. Por favor, inicia sesión." });
  } catch (error) {
    console.error("❌ Error al restablecer contraseña:", error);
    res.status(500).json({ message: "Error al restablecer contraseña" });
  }
};

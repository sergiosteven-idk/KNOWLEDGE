// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasena, tipo_usuario } = req.body;

    if (!nombre || !apellido || !correo || !contrasena) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const [existingUser] = await db.query(
      'SELECT * FROM Miembro WHERE correo = ?',
      [correo]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    await db.query(
      `INSERT INTO Miembro (nombre, apellido, correo, contrasena, tipo_usuario) 
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, apellido, correo, hashedPassword, tipo_usuario || 'estudiante']
    );

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const [rows] = await db.query(
      'SELECT * FROM Miembro WHERE correo = ? AND activo = TRUE',
      [correo]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado o inactivo' });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(contrasena, user.contrasena);

    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        correo: user.correo,
        tipo_usuario: user.tipo_usuario
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        tipo_usuario: user.tipo_usuario
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

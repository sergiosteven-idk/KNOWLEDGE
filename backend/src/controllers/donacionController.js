const db = require('../config/db');

// 💖 Crear donación
exports.crearDonacion = async (req, res) => {
  try {
    const { id_usuario, monto, metodo_pago, mensaje_donante, anonima } = req.body;
    await db.query(
      `INSERT INTO Donaciones (id_usuario, monto, metodo_pago, mensaje_donante, anonima, estado)
       VALUES (?, ?, ?, ?, ?, 'completada')`,
      [id_usuario || null, monto, metodo_pago, mensaje_donante, anonima || false]
    );
    res.status(201).json({ message: 'Gracias por tu donación 💙' });
  } catch (error) {
    console.error('❌ Error al registrar donación:', error);
    res.status(500).json({ message: 'Error al procesar donación' });
  }
};

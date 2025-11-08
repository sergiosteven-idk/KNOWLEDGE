const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

pool.getConnection()
  .then(conn => {
    console.log('✅ Conexión establecida con MySQL');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error de conexión a MySQL:', err.message);
  });

module.exports = pool;

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool(process.env.MYSQL_URL);

// Verificar conexión al arrancar
pool.getConnection()
    .then(conn => {
        console.log('Conectado a MySQL correctamente');
        conn.release();
    })
    .catch(err => {
        console.error('Error al conectar con MySQL:', err.message);
    });

module.exports = pool;
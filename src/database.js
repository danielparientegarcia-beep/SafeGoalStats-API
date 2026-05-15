const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'safegoalstats',
    port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
});

// Verificar conexión al arrancar
pool.getConnection()
    .then(connection => {
        console.log('Conectado a MySQL correctamente');
        connection.release();
    })
    .catch(err => {
        console.error('Error al conectar con MySQL:', err.message);
    });

module.exports = pool;
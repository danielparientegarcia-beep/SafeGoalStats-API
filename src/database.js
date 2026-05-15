const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,      // antes DB_HOST
    user: process.env.MYSQLUSER,      // antes DB_USER
    password: process.env.MYSQLPASSWORD, // antes DB_PASSWORD
    database: process.env.MYSQL_DATABASE, // antes DB_NAME
    port: process.env.MYSQLPORT || 3306,  // importante si Railway usa otro puerto
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
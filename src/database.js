const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
});

// test conexión real
pool.getConnection()
    .then(conn => {
        console.log("Conectado a MySQL correctamente");
        conn.release();
    })
    .catch(err => {
        console.error("Error MySQL:", err.message);
    });

module.exports = pool;
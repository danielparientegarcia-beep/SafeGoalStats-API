require('dotenv').config();
const mysql = require('mysql2/promise');

// Usar URL pública si estás local, URL privada si estás en Railway
const dbUrl = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

async function test() {
    try {
        const connection = await mysql.createConnection(dbUrl);
        console.log('✅ Conectado correctamente a la base de datos');

        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', ['daniel@correo.com']);
        console.log('Usuario encontrado:', rows[0]);

        await connection.end();
    } catch (err) {
        console.error('Error MySQL:', err.message);
    }
}

test();

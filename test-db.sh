// test-db.js
require('dotenv').config(); // cargar variables de entorno

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// URL de conexión desde Railway
const dbUrl = process.env.MYSQL_URL;

async function test() {
  try {
    const connection = await mysql.createConnection(dbUrl);
    console.log('✅ Conectado correctamente a la base de datos');

    // Probar lectura de usuarios
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', ['daniel@correo.com']);
    if (rows.length === 0) {
      console.log('❌ Usuario no encontrado');
    } else {
      const usuario = rows[0];
      console.log('Usuario encontrado:', usuario);

      // Probar bcrypt
      const passwordIngresada = '12345678';
      const valida = await bcrypt.compare(passwordIngresada, usuario.password);
      console.log('Contraseña correcta?', valida);
    }

    await connection.end();
  } catch (err) {
    console.error('Error MySQL:', err.message);
  }
}

test();

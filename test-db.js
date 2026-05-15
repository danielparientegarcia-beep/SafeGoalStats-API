require('dotenv').config();

const mysql = require('mysql2/promise');

async function run() {
  try {
    console.log("MYSQL_URL:", process.env.MYSQL_URL ? "OK" : "FALTA");

    if (!process.env.MYSQL_URL) {
      throw new Error("MYSQL_URL no está definida en .env");
    }

    const connection = await mysql.createConnection(process.env.MYSQL_URL);

    console.log("✅ Conectado a MySQL");

    const [rows] = await connection.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      ['daniel@correo.com']
    );

    console.log("Usuario encontrado:", rows[0] || "NINGUNO");

    if (!rows[0]) {
      await connection.end();
      return;
    }

    const bcrypt = require('bcrypt');

    const ok = await bcrypt.compare('12345678', rows[0].password);

    console.log("Password válida:", ok);

    await connection.end();

  } catch (err) {
    console.error("❌ ERROR:", err.message);
  }
}

run();

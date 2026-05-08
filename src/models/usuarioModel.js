const db = require('../database');

const Usuario = {

    // Buscar un usuario por email
    async buscarPorEmail(email) {
        const [rows] = await db.execute(
            'SELECT * FROM usuarios WHERE email = ?', [email]
        );
        return rows[0];
    },

    // Crear un nuevo usuario
    async crear(username, email, passwordHash) {
        const [result] = await db.execute(
            'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );
        return result.insertId;
    }
};

module.exports = Usuario;
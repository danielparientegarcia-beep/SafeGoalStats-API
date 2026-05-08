const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

const authController = {

    async registro(req, res) {
        try {
            const { username, email, password } = req.body;

            const usuarioExistente = await Usuario.buscarPorEmail(email);

            if (usuarioExistente) {
                console.warn(
                    `[REGISTRO FAIL] email repetido: ${email} | IP: ${req.ip} | Hora: ${new Date().toISOString()}`
                );

                return res.status(400).json({
                    error: 'El email ya está registrado'
                });
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const nuevoId = await Usuario.crear(
                username,
                email,
                passwordHash
            );

            console.log(
                `[REGISTRO OK] usuario: ${username} | email: ${email} | IP: ${req.ip} | Hora: ${new Date().toISOString()}`
            );

            res.status(201).json({
                mensaje: 'Usuario registrado correctamente',
                id: nuevoId
            });

        } catch (error) {
            console.error(
                `[ERROR REGISTRO] ${error.message}`
            );

            res.status(500).json({
                error: 'Error interno del servidor'
            });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const usuario = await Usuario.buscarPorEmail(email);

            if (!usuario) {
                console.warn(
                    `[LOGIN FAIL] email: ${email} | IP: ${req.ip} | Motivo: usuario no existe | Hora: ${new Date().toISOString()}`
                );

                return res.status(401).json({
                    error: 'Credenciales incorrectas'
                });
            }

            const passwordValida = await bcrypt.compare(
                password,
                usuario.password
            );

            if (!passwordValida) {
                console.warn(
                    `[LOGIN FAIL] email: ${email} | IP: ${req.ip} | Motivo: contraseña incorrecta | Hora: ${new Date().toISOString()}`
                );

                return res.status(401).json({
                    error: 'Credenciales incorrectas'
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    username: usuario.username,
                    rol: usuario.rol
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '24h'
                }
            );

            console.log(
                `[LOGIN OK] usuario: ${usuario.username} | IP: ${req.ip} | Hora: ${new Date().toISOString()}`
            );

            res.json({
                mensaje: 'Login correcto',
                token
            });

        } catch (error) {
            console.error(
                `[ERROR LOGIN] ${error.message}`
            );

            res.status(500).json({
                error: 'Error interno del servidor'
            });
        }
    }
};

module.exports = authController;
const { body, validationResult } = require('express-validator');

const validarRegistro = [
    body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('El usuario debe tener mínimo 3 caracteres'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Introduce un email válido'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener mínimo 8 caracteres'),

    (req, res, next) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                errores: errores.array()
            });
        }

        next();
    }
];

const validarLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email inválido'),

    body('password')
        .notEmpty()
        .withMessage('Debes introducir contraseña'),

    (req, res, next) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                errores: errores.array()
            });
        }

        next();
    }
];

module.exports = {
    validarRegistro,
    validarLogin
};
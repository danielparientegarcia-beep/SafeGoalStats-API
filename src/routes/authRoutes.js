const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
    validarRegistro,
    validarLogin
} = require('../middleware/validaciones');

router.post('/registro', validarRegistro, authController.registro);
router.post('/login', validarLogin, authController.login);

module.exports = router;
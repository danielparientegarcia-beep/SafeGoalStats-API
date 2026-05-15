const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// LOGIN
router.post('/login', authController.login);


// REGISTRO
router.post('/registro', authController.registro);


// TEST
router.get('/test', (req, res) => {
    res.json({ ok: true, message: 'authRoutes funcionando' });
});


// DEBUG
router.get('/debug', (req, res) => {
    res.json({ ok: true, routes: 'authRoutes loaded' });
});


module.exports = router;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Inicializar DB (solo carga conexión)
require('./database');

const authRoutes = require('./routes/authRoutes');
const footballRoutes = require('./routes/footballRoutes');

const app = express();

app.disable('x-powered-by');

// Seguridad básica
app.use(helmet());

// Rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: 'Has realizado demasiadas peticiones. Intenta más tarde.'
    }
});

app.use(limiter);

// CORS (producción)
app.use(cors({
    origin: ['https://danielparientegarcia-beep-safegoals.vercel.app', 'http://localhost:5500'],
    credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', footballRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.json({
        mensaje: 'SafeGoalStats API funcionando correctamente'
    });
});

// Puerto Railway
const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
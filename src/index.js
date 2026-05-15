const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Inicializar DB
require('./database');

const authRoutes = require('./routes/authRoutes');
const footballRoutes = require('./routes/footballRoutes');

const app = express();

app.disable('x-powered-by');

// 🔧 IMPORTANTE EN RAILWAY (arregla X-Forwarded-For error)
app.set('trust proxy', 1);

// Seguridad básica
app.use(helmet());

// CORS
app.use(cors({
    origin: [
        'https://danielparientegarcia-beep-safegoals.vercel.app',
        'http://localhost:5500'
    ],
    credentials: true
}));

// Body parser
app.use(express.json());

// Rate limit (ajustado para proxy)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Has realizado demasiadas peticiones. Intenta más tarde.'
    }
});

app.use(limiter);

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', footballRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({
        mensaje: 'SafeGoalStats API funcionando correctamente'
    });
});

// 🔥 RAILWAY PORT CORRECTO (CRÍTICO)
const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

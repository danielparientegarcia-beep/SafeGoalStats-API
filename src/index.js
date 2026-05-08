const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const db = require('./database');
const authRoutes = require('./routes/authRoutes');
const footballRoutes = require('./routes/footballRoutes');

const app = express();

app.disable('x-powered-by');

// Seguridad básica del servidor
app.use(helmet());


// Limitar número de peticiones
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        error: 'Has realizado demasiadas peticiones. Inténtalo de nuevo dentro de unos minutos.'
    }
});

app.use(limiter);


// Permitir únicamente conexiones desde SafeGoalStats
app.use(cors({
    origin: 'http://192.168.239.119'
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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
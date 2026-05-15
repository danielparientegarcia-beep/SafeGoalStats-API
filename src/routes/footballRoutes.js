const express = require('express');
const router = express.Router();

// =========================
// CLASIFICACIÓN
// =========================
router.get('/clasificacion', async (req, res) => {
    try {
        const response = await fetch(
            'https://api.football-data.org/v4/competitions/PD/standings',
            {
                headers: {
                    'X-Auth-Token': process.env.FOOTBALL_TOKEN
                }
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo clasificación' });
    }
});

// =========================
// PARTIDOS
// =========================
router.get('/partidos', async (req, res) => {
    try {
        const response = await fetch(
            'https://api.football-data.org/v4/competitions/PD/matches',
            {
                headers: {
                    'X-Auth-Token': process.env.FOOTBALL_TOKEN
                }
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo partidos' });
    }
});

// =========================
// ESTADÍSTICAS
// =========================
router.get('/estadisticas', async (req, res) => {
    try {
        const response = await fetch(
            'https://api.football-data.org/v4/competitions/PD/scorers',
            {
                headers: {
                    'X-Auth-Token': process.env.FOOTBALL_TOKEN
                }
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo estadísticas' });
    }
});

module.exports = router;
const fs = require('fs');
const path = require('path');

function verificarRouter(filePath) {
    try {
        const mod = require(filePath);
        if (typeof mod !== 'function' && !mod.stack) {
            console.log(`⚠️  El módulo ${filePath} no exporta un router válido`);
        } else {
            console.log(`✅ ${filePath} parece correcto`);
        }
    } catch (err) {
        console.log(`❌ Error cargando ${filePath}:`, err.message);
    }
}

// Revisar routes
const routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir).forEach(file => {
    const fullPath = path.join(routesDir, file);
    verificarRouter(fullPath);
});

// Revisar middleware
const middlewareDir = path.join(__dirname, 'middleware');
fs.readdirSync(middlewareDir).forEach(file => {
    const fullPath = path.join(middlewareDir, file);
    try {
        require(fullPath);
        console.log(`✅ Middleware ${fullPath} cargado correctamente`);
    } catch (err) {
        console.log(`❌ Error en middleware ${fullPath}:`, err.message);
    }
});

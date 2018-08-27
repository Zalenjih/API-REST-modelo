// Requires
const express = require('express');
const mongoose = require('mongoose');


// Inicializar variables
const app = express();
const CONEXION = 'mongodb://localhost:27017/hospitalDB';

// Conexión a la base de datos
mongoose.connection.openUri(CONEXION, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Conexión a la base de datos: \x1b[33m%s\x1b[0m', 'online');
});


// Rutas
app.get('/', (request, response, next) => {
    response.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente ()'
    })
})

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server en el puerto 3000: \x1b[36m%s\x1b[0m', 'online');
});
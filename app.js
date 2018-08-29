// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Inicializar variables
const app = express();
const CONEXION = 'mongodb://localhost:27017/hospitalDB';

// Body-Parser
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión a la base de datos
mongoose.connection.openUri(CONEXION, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Conexión a la base de datos: \x1b[33m%s\x1b[0m', 'online');
});
// Permitir que los campos en los docuentos tengan valores únicos respecto a otros documentos
mongoose.set('useCreateIndex', true)

// Importando rutas
const appRoutes = require('./Routes/app');
const usuarioRoutes = require('./Routes/usuario');
const loginRoutes = require('./Routes/login');


// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server en el puerto 3000: \x1b[36m%s\x1b[0m', 'online');
});
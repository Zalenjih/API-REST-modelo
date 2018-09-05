const express = require('express');
const app = express();

// Herramienta para encriptar la constaseña
const bcrypt = require('bcryptjs');

// Herramienta para validación del jwt generado en el login
const jwt = require('jsonwebtoken');

// Modelo de datos
const Usuario = require('../Models/usuario');

// La semilla que autentica si el token es original
const SEED = require('../Config/config').SEED;

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        usuario.password = 'X'
            // Crear un TOKEN
        const token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 });

        res.status(200).json({
            ok: true,
            usuario: usuario,
            token: token,
            id: usuario.id
        });
    });



});


module.exports = app;
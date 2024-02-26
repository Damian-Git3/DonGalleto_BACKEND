/*ESTE ES EL ROUTER PRINCIPAL DE NUESTRO PROYECTO*/
let express = require('express');
let router = express.Router();

const usuarios = require('./usuarios/usuarios')
const alumnos = require('./alumnos/alumnos')

// USUARIOS
router.use("/usuarios",usuarios)
router.use("/alumnos",alumnos)

module.exports = router;

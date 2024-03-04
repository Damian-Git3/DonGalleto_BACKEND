/*ESTE ES EL ROUTER PRINCIPAL DE NUESTRO PROYECTO*/
let express = require('express');
let router = express.Router();

const usuarios = require('./usuarios/usuarios')


// USUARIOS
router.use("/usuarios",usuarios)


module.exports = router;

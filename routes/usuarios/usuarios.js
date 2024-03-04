const express = require('express');
const router = express.Router();
const logger = require('../../utils/logger');
const UsuarioDao = require('../usuarios/usuarioDao')
const pwnedpasswords = require('pwnedpasswords');

router.post('/login', async function (req, res) {

  try {
    let usuario = req.body;

    let result = await UsuarioDao.validarUsuario(usuario);
    if (result === undefined) {
      res.status(200).send({ success: false, message: 'Usuario Autenticado' });
      return;
    }

    res.status(200).send({ success: true, message: 'Usuario Autenticado' });
  } catch (error) {
    logger.error(`Error en login: ${error}`);
    res.status(404).send({ success: false, error: error });
  }
});

router.post('/register', function (req, res) {
  try {
    pwnedpasswords(req.body.contrasena)
      .then(count => {
        if (count > 0) {
          res.status(400).send({ success: false, message: 'Contraseña comprometida '+ count +' veces. Por favor, elige una contraseña más segura.'});
        } else {
          let result = UsuarioDao.saveUser(req.body);
          res.status(200).send({ success: true, message: result });
        }
      })
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.get('/listar', async function (req, res) {
  try {
    let result = await UsuarioDao.listarUsuarios();
    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.get('/buscar', async function (req, res) {
  try {
    let result = await UsuarioDao.buscarUsuario(req.body.id);
    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.put('/actualizar', async function (req, res) {
  try {
    let result = await UsuarioDao.actualizarUsuario(req.body.usuario);
    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.delete('/eliminar', async function (req, res) {
  try {
    let result = await UsuarioDao.eliminarUsuario(req.body.id);
    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

module.exports = router;

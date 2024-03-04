let express = require('express');
let router = express.Router();
let usuarioController = require('../usuarios/usuarios');

router.post('/login', async function (req, res) {

  let usuario = req.body.usuario;

  try {
    let result = await usuarioController.validarUsuario(usuario);
    res.status(200).send({succes: true, message: result});
  } catch (error) {
    res.status(404).send({success: false, error: error});
  }

});

router.post('/registro', function (req, res) {
  try {
    let result = usuarioController.registrarUsuario(req.body.usuario);
    res.status(200).send({ succes: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.get('/listar', async function (req, res) {
  try {
    let result = await usuarioController.listarUsuarios();
    res.status(200).send({ succes: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.get('/buscar', async function (req, res) {
  try {
    let result = await usuarioController.buscarUsuario(req.body.id);
    res.status(200).send({ succes: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.put('/actualizar', async function (req, res) {
  try {
    let result = await usuarioController.actualizarUsuario(req.body.usuario);
    res.status(200).send({ succes: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.delete('/eliminar', async function (req, res) {
  try {
    let result = await usuarioController.eliminarUsuario(req.body.id);
    res.status(200).send({ succes: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const logger = require("../../utils/logger");
const UsuarioDao = require("../usuarios/usuarioDao");
const Usuario = require("../usuarios/usuarioModelo");

const jwt = require("jsonwebtoken");
const verifyToken = require("../../middleware/verifyToken");

const pwnedpasswords = require("pwnedpasswords");

router.post("/login", async function (req, res) {
  try {
    logger.debug(req.body);

    const usuario = new Usuario(req.body);

    const resultado = await UsuarioDao.validarUsuario(usuario);
    if (!resultado) {
      res.status(400).send({ success: false, message: "No existe el usuario" });
      return;
    }
    let usuarioEncontrado = new Usuario(resultado);

    if (
      (await usuarioEncontrado.validatePassword(usuario.contrasena)) === false
    ) {
      res
        .status(400)
        .send({ success: false, message: "Usuario o Contraseña Incorrectos" });
      return;
    }
    const token = jwt.sign(
      { id: usuarioEncontrado.id },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 3 }
    );
    res
      .status(200)
      .send({ success: true, message: "Usuario Autenticado", token: token });

    res.status(200).send({ success: true, message: 'Usuario Autenticado' });
    let usuarioEncontrado = new Usuario(resultado);

    if (
      (await usuarioEncontrado.validatePassword(usuario.contrasena)) === false
    ) {
      res
      .status(400)
      .send({ success: false, message: "Usuario o Contraseña Incorrectos" });
      return;
    }
    const token = jwt.sign(
      { id: usuarioEncontrado.id },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 3 }
    );
    res
      .status(200)
      .send({ success: true, message: "Usuario Autenticado", token: token });
  } catch (error) {
    logger.error(`Error en login: ${error}`);
    console.log(error);
    res.status(404).send({ success: false, error });
  }
});

router.post("/registro", async function (req, res) {
  try {
    pwnedpasswords(req.body.contrasena).then(async (count) => {
      if (count > 0) {
        res
          .status(400)
          .send({
            success: false,
            message:
              "Contraseña comprometida " +
              count +
              " veces. Por favor, elige una contraseña más segura.",
          });
      } else {
        const usuario = new Usuario(req.body);

        await usuario.encryptPassword();

        let result = await UsuarioDao.registrarUsuario(usuario);
        //El token expira en 3 minutos, tiempo representado en segundos

        const token = jwt.sign({ id: result.id }, process.env.SECRET_KEY, {
          expiresIn: 60 * 3,
        });
        res.status(200).send({ success: true, token: token });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, error });
  }
});

router.get("/listar", verifyToken, async function (req, res) {
  try {
    let result = await UsuarioDao.listarUsuarios();
    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.get("/buscar", verifyToken, async function (req, res) {
  try {
    let result = await UsuarioDao.buscarUsuario(req.body.id);
    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.put("/actualizar", verifyToken, async function (req, res) {
  try {
    let result = await UsuarioDao.actualizarUsuario(req.body.usuario);
    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.delete("/eliminar", verifyToken, async function (req, res) {
  try {
    let result = await UsuarioDao.eliminarUsuario(req.body.id);
    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.get("/test", verifyToken, async function (req, res) {
  try {
    res.status(200).send({ success: true, message: "Usuario Autenticado" });
  } catch (error) {
    res.status(404).send({ success: false, error });
  }
});

module.exports = router;
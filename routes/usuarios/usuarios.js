const express = require("express");
const session = require("express-session");
const router = express.Router();

const bcrypt = require("bcryptjs");

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

    if (usuarioEncontrado.estatus != 1) {
      res
        .status(403)
        .send({ success: false, message: "El usuario ha sido eliminado" });
      return;
    }
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
      { expiresIn: 60 * 60}
    );

    res.status(200).send({
      success: true,
      message: "Usuario Autenticado",
      token: token,
      admin: usuarioEncontrado.rol,
      id: usuarioEncontrado.id,
      nombre: usuarioEncontrado.usuario,
    });
  } catch (error) {
    logger.error(`Error en login: ${error}`);
    console.log(error);
    res.status(404).send({ success: false, error });
  }
});

router.post("/registro", async function (req, res) {
  try {
    pwnedpasswords(req.body.contrasena).then(async (count) => {
      if (count > 17000) {
        res.status(400).send({
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
          expiresIn: 60 * 60,
        });
        res.status(200).send({
          success: true,
          token: token,
          admin: result.rol,
          id: result.id,
          nombre: result.usuario,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, error });
  }
});


router.post("/editar", async function (req, res) {
  try {
    console.log(req.body);

    let usuario = {
      id: req.body.id_usuario,
      usuario: req.body.usuario,
      contrasena: req.body.contrasena,
      rol: req.body.rol,
      usuario_mod: req.body.idUsuarioModificador,
    };

    const salt = bcrypt.genSaltSync(10);
    usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);

    let result = await UsuarioDao.registrarUsuario(usuario);

    if (result instanceof Error) {
      console.log("Fue un error")
      return res.status(400).send({ success: false, message: result.message });
    }

    res
      .status(200)
      .send({
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, error });
  }
});


router.post("/lista", verifyToken, async function (req, res) {
  try {
    let result = await UsuarioDao.getUsers();
    //transformar el nombre de los campos por seguridad

    let data = result.map((usuario) => {
      return {
        id: usuario.id,
        usuario: usuario.usuario,
        estatus: usuario.estatus,
        rol: usuario.rol,
      };
    });

    res
      .status(200)
      .send({ success: true, message: "Lista concedida", data: data });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.post("/eliminar", verifyToken, async function (req, res) {
  try {
    let result = await UsuarioDao.deleteUser(req.body.id);

    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.put("/modificar", verifyToken, async function (req, res) {
  try {
    const usuario = new Usuario(req.body);
    await usuario.encryptPassword();
    data = {
      id: req.body.id,
      usuario: req.body.usuario,
      contrasena: usuario.contrasena,
      nuevo_usuario: req.body.nuevo_usuario,
    };

    let result = await UsuarioDao.updateUserData(data);

    res.status(200).send({ success: true, message: result });
  } catch (error) {
    console.log(error);
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

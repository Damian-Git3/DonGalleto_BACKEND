const express = require("express");
const session = require("express-session");
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
      { expiresIn: 60 * 3 }
    );

    res
      .status(200)
      .send({
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
          expiresIn: 60 * 3,
        });
        res
          .status(200)
          .send({
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

    let result = await UsuarioDao.updateUser(req.body.usuario, req.body.contrasena, req.body.rol, req.body.idUsuario, req.body.idUsuarioModificador)

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
    console.log(req.body.id);
    let result = await UsuarioDao.deleteUser(req.body.id);

    res.status(200).send({ success: true, message: result });
  } catch (error) {
    res.status(404).send({ success: false, error: error });
  }
});

router.put("/actualizar/contrasena", verifyToken, async function (req, res) {
  try {
    let result = await UsuarioDao.actualizarUsuario(req.body.usuario);
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

router.get("/obtener", verifyToken, async function (req, res) {
  try {
    const userId = req.query.id; // Obtener el ID del parámetro de la consulta

    let result = await UsuarioDao.getUserById(userId);

    if (!result) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    let data = {
      id: result.id,
      usuario: result.usuario,
      estatus: result.estatus,
      rol: result.rol,
    };

    res.status(200).json({ success: true, message: "Usuario obtenido", data: data });
  } catch (error) {
    res.status(404).send({ success: false, error });
  }
});

module.exports = router;
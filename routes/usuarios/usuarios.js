let express = require('express');
let router = express.Router();
//const connection = require('../utils/bd');

router.post('/login', function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  let contrasena = '1234';
  let usuario = 'admin';

  if (username === usuario && password === contrasena) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }

  // Aquí debes implementar la lógica para validar la contraseña, por ejemplo, compararla con un hash
  // Por ahora, asumiremos que la contraseña se almacena en texto plano (no recomendado)
  try {
    // connection.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
    //   if (error) {
    //     console.error('Error al ejecutar la consulta: ', error);
    //     res.status(500).send('Error interno del servidor');
    //     return;
    //   }

    //   if (results.length > 0) {
    //     // Usuario y contraseña correctos
    //     res.status(200).json({ success: true });
    //   } else {
    //     // Usuario o contraseña incorrectos
    //     res.status(401).json({ success: false });
    //   }
    // });
  } catch (error) {
    console.error('Error al procesar la solicitud: ', error);
    res.status(500).send({ message: 'Error interno del servidor' });
  }

});

module.exports = router;

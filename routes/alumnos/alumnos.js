const express = require('express');
const router = express.Router();

router.get('/listarAlumnos', function (req, res) {
    try {
        res.status(200).json({ success: true, message: 'Listado de alumnos' });
    } catch (error) {
        res.status(500).send({ message: 'Error interno del servidor' });
    }
  
});

module.exports = router;

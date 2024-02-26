'use strict';

require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger');
const winston = require('winston');
const morgan = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');


let app = express();

// Configuración de CORS para permitir solo direcciones IP específicas
const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'http://192.168.10.223:8080'],
  optionsSuccessStatus: 200
};

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('logger', logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use('/', indexRouter);

app.use(morgan(
  ':method :remote-addr :url :status :res[content-length] - :response-time ms',
  { stream: { write: (message) => logger.http(message) } }
));

// Capturar error  404 y reenviar al manejador de errores
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  // Establecer variables locales, proporcionando solo el error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error', {message: 'Error interno del servidor'});
});

// ARRANQUE DEL SERVIDOR
const server = app.listen(3000, '127.0.0.1', () => {
  const host = server.address().address;
  const port = server.address().port;
  logger.warn(`Servidor Corriendo en http://${host}:${port}`);
});

module.exports = app;

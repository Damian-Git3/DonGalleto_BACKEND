'use strict';
const winston = require('winston');
require('winston-daily-rotate-file');

/**
 * @author Fernando Gamboa
 * @description Configuración de la libreria de logging.
 * @returns 
 */

//Devuelve la fecha actual en formato local
const timezoned = () => {
    return new Date().toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City'
    });
};

const logger = winston.createLogger({
    /*
    Levels
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
    */
    level: 'info', //Indica desde que nivel se guardaran los logs (info, warn, error)
    format: winston.format.combine(
        winston.format.timestamp({ format: timezoned }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " ")
        )), //formato del log
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'logs/%DATE%/donGalleto_error.log',//Nombre del archivo
            datePattern: 'MM-YYYY',//Formato de la fecha
            maxFiles: 14, //Numero de archivos máximos que se podran crear, sobrepasando este numero eliminara los logs antiguos.
            level: 'error'//Para este archivo, reemplaza el nivel a solo mostrar logs de error
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/%DATE%/donGalleto_general.log',
            datePattern: 'MM-YYYY',

            maxFiles: 14
        })
    ],
    exceptionHandlers: [
        new winston.transports.DailyRotateFile({ //Archivo para guarda las excepciones no controladas
            filename: 'logs/%DATE%/donGalleto_exception.log',
            datePattern: 'MM-YYYY',
            maxFiles: 14
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({ format: timezoned }),
                winston.format.colorize({ all: true }),
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " ")
                )),
        })
    ]
});


//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// Si el entorno no es el de producción, muestra los logs en la consola
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp({ format: timezoned }),
            winston.format.colorize({ all: true }),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : " ")
            )),
        level: 'debug'
    }));
}

module.exports = logger;
'use strict'
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    namedPlaceholders: true // Habilita los parámetros con nombre
});

// Intenta realizar una consulta simple para verificar la conexión
pool.query('SELECT * FROM usuarios LIMIT 1')
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
        throw error; // Lanza el error para que pueda ser manejado por el código que llama a esta función
    });

module.exports = pool;
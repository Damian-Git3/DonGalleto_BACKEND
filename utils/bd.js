'use strict'
const mysql = require('mysql2/promise'); 

const poolConnection = () => {
    return mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        namedPlaceholders: true // Habilita los parámetros con nombre

    });
};

module.exports = poolConnection();
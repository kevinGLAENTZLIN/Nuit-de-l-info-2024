const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});

module.exports = connection;

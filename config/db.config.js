const mysql = require('mysql');
const db = mysql.createConnection({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD
});


module.exports = db
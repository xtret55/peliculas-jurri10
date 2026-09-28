const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'peliculas_db'
}).promise();

module.exports = db;

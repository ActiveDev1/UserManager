const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
	host: config.db.mysql.HOST,
	user: config.db.mysql.USER,
	password: config.db.mysql.PASSWORD,
	database: config.db.mysql.DB,
});

connection.connect(error => {
	if (error) throw error;
	console.log('Successfully connected to the database.');
});

module.exports = connection;

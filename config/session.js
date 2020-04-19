/* eslint-disable key-spacing */
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const authdb = require('./database.js');

module.exports = {
	secret            : '267t_76mb^@jms*=',
	resave            : false,
	saveUninitialized : true,
	store             : new MySQLStore(authdb)
};

/* eslint-disable key-spacing */
module.exports = {
	host        : process.env.CLEARDB_DATABASE_HOST,
	user        : process.env.CLEARDB_DATABASE_USER,
	password    : process.env.CLEARDB_DATABASE_PASSWORD,
	port        : '3306',
	database    : process.env.CLEARDB_DATABASE_DATABASE,
	dateStrings : 'date'
};

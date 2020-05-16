const express = require('express');
const http = require('http');
const path = require('path');
// const createError = require('http-errors');

const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');
const boardRouter = require('./routes/board.js');
const ladderRouter = require('./routes/ladder.js');
const wordchainRouter = require('./routes/wordchain.js');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/board', boardRouter);
app.use('/ladder', ladderRouter);
app.use('/wordchain', wordchainRouter);

/* app.use(function (req, res, next) {
	next(createError(404));
}); */

app.use(function (err, req, res) {
	req.locals.message = err;
	req.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	// console.log("error occurred", err);
	res.render('pages/error', { title: 'Error', error: err });
});

server.listen(port, function () {
	console.log(' server listening on ', port);
});

module.exports = app;

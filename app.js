const express = require('express');
const http = require('http');
const path = require('path');

const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');
const boardRouter = require('./routes/board.js');
const ladderRouter = require('./routes/ladder.js');
const wordchainRouter = require('./routes/wordchain.js');

const app = express();
const server = http.createServer(app);

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

app.use('/robots.txt', function (req, res) {
	res.sendFile(path.join(__dirname, '/robots.txt'));
});

app.use('/sitemap.xml', function (req, res) {
	res.sendFile(path.join(__dirname, '/sitemap.xml'));
});

app.use(function (req, res, next) {
	let err = new Error('Not Found');
	console.log('Error occurred at', req.url);
	err.status = 404;
	next(err);
});

app.use(function (err, req, res) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	console.log('error occurred ', err);
	res.render('pages/error', { title: 'Error', error: err });
});

server.listen(3000, function () {
	console.log(' server listening on 3000');
});

module.exports = app;

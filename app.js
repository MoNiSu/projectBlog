const express = require('express');
const http = require('http');
const createError = require('http-errors');
const path = require('path');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const boardRouter = require('./routes/board')

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

app.use(function(req, res, next) {
	next(createError(404));
});

app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	res.status(err.status || 500);
	//console.log("error occurred", err);
	res.render('error', { title: 'Error', error: err });
});

server.listen(3000, function() {
	console.log(' server listening on port 3000 ');
});

module.exports = app;
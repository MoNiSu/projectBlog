const express = require('express');
const https = require('https');
const mysql = require('mysql');
const session = require('express-session');
const xml2js = require('xml2js');

const dbConfig = require('../config/database.js');
const sessionAuth = require('../config/session.js');

const router = express.Router();
const parser = new xml2js.Parser();

router.use(session(sessionAuth));
const connection = mysql.createPool(dbConfig);

router.get('/', function (req, res) {
	if (req.session.username) {
		res.render('pages/wordchain', { title: 'Word Chain' });
	} else {
		res.redirect('./auth/signin');
	}
});

router.post('/word', function (req, res) {
	https.get(`https://stdict.korean.go.kr/api/search.do?&key=${process.env.STDICT_KEY}&q=${req.body.value}&type1=word&pos=1`, function (results) {
		let data = '';

		if (results.statusCode >= 200 && results.statusCode <= 400) {
			results.on('data', function (dataSum) {
				data += dataSum.toString();
			});
			results.on('end', function () {
				parser.parseString(data, function (err, results) {
					if (err) {
						console.log('error occurred', err);
						res.render('pages/error', { title: 'Error', error: err });
					} else {
						if (results.channel.item[0].pos.toString() === '명사') {
							connection.query('INSERT INTO korean SET ?', `${req.body.value}`, function (err, results) {
								if (err) {
									console.log('error occurred', err);
								} else {
									console.log('korean success : ', results);
								}
								connection.query('SELECT * FROM korean WHERE word LIKE ?', `${req.body.value[req.body.value.length - 1]}%`, function (err, results) {
									if (err) {
										console.log('error occurred', err);
										res.send('LOSE');
									} else {
										res.send(results[Math.round(Math.random() * (results.length - 1))].word);
									}
								});
							});
						} else {
							res.send('NOT');
						}
					}
				});
			});
		}
	});
});

module.exports = router;

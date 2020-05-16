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
						if (Number(results.channel.total) === 0) {
							res.send('NONE');
						} else {
							if (results.channel.item[0].pos.toString() === '명사') {
								connection.query('SELECT * FROM korean WHERE word LIKE ?', `${req.body.value[req.body.value.length - 1]}%`, function (err, results) {
									if (err) {
										console.log('error occurred', err);
									} else {
										if (!results[0]) {
											res.send('LOSE');
										} else {
											let num = Math.round(Math.floor(Math.random()) / 9 * (results.length - 1));
											if (req.body.wordList[results[num].word]) {
												num = Math.round(Math.floor(Math.random()) / 9 * (results.length - 1));
												if (req.body.wordList[results[num].word]) {
													for (num = 0; num <= results.length - 1; num++) {
														if (num < results.length - 1) {
															if (!req.body.wordList[results[num].word]) {
																break;
															}
														} else {
															if (!req.body.wordList[results[num].word]) {
																break;
															} else {
																res.send('LOSE');
															}
														}
													}
												}
											}
											res.send(results[num].word);
										}
										connection.query('INSERT INTO korean SET word = ?', req.body.value, function (err, results) {
											if (err) {
											// console.log('error occurred', err);
											} else {
												console.log('korean success : ', results);
											}
										});
									}
								});
							} else {
								res.send('NOT');
							}
						}
					}
				});
			});
		}
	});
});

module.exports = router;

const express = require('express');
const https = require('https');
const mysql = require('mysql');
const session = require('express-session');
const xml2js = require('xml2js');

const dbConfig = require('../config/database.js');
const sessionAuth = require('../config/session.js');

const router = express.Router();
const connection = mysql.createPool(dbConfig);
const parser = new xml2js.Parser();

router.use(session(sessionAuth));

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
							for (let i = 0; i <= results.channel.item.length - 1; i++) {
								if (results.channel.item[i].pos.toString() === '명사') {
									connection.query('SELECT * FROM korean WHERE word LIKE ?', `${req.body.value[req.body.value.length - 1]}%`, function (err, results) {
										if (err) {
											console.log('error occured', err);
										} else {
											if (!results[0]) {
												res.send('LOSE');
											} else {
												for (let j = 0; j <= results.length - 1; j++) {
													if (!req.body.wordList[results[j].word]) {
														res.send(results[j].word);
														break;
													}
													if (j === results.length - 1) {
														if (req.body.wordList[results[j].word]) {
															res.send('LOSE');
														}
													}
												}
											}
										}
									});
									connection.query('INSERT INTO korean SET word = ?', req.body.value, function (err, results) {
										if (err) {
											console.log('error occurred', err);
										} else {
											console.log('korean success : ', req.body.value, results);
										}
									});
									break;
								}
								if (i === results.channel.item.length - 1) {
									if (results.channel.item[i].pos.toString() !== '명사') {
										res.send('NOT');
									}
								}
							}
						}
					}
				});
			});
		}
	});
});

module.exports = router;

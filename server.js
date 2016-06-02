(function() {

	"use strict";

	let getCardSum = require('./card-sysu.js');

	let getPaySum = require('./pay-sysu.js');

	let express = require('express'),
		app = express(),
		path = require('path'),
		http = require('http').Server(app),
		bodyParser = require('body-parser');

	http.listen(3000);

	//中间件提供静态资源 js/css/image 等， 会解析public文件夹下的文件
	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
	});

	app.use(bodyParser.urlencoded({ extended: true }));

	app.post('/data', function(req, res) {
		let username = req.body.username,
			password = req.body.password,
			flag = 0;
		let payCode, paySum, cardCode, cardSum;
		getPaySum(username, password, function(sum) {
			paySum = sum;
			payCode = 0;
			if (flag) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum  });
			}
			flag = 1;
		}, function(err) {
			payCode = 1;
			paySum = -1;
			if (flag) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum  });
			}
			flag = 1;
		});
		getCardSum(username, password, function(sum) {
			cardSum = sum;
			cardCode = 0;
			if (flag) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum  });
			}
			flag = 1;
		}, function(err) {
			cardCode = 1;
			cardSum = -1;
			if (flag) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum  });
			}
			flag = 1;
		});
	});


}())
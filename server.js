(function() {

	"use strict";

	let getCardSum = require('./card-sysu.js');

	let getPaySum = require('./pay-sysu.js');

	let getLibSum = require('./lib-sysu.js');

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
		let payCode, paySum, cardCode, cardSum, bookCode, bookSum;
		//当字段为空时，在pay-sysu中判断登录成功的条件会有异常
		username = username == '' ? 0 : username; 
		password = password == '' ? 0 : password;
		getPaySum(username, password, function(sum) {
			paySum = sum;
			payCode = 0;
			if (flag === 2) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum, bookCode: bookCode, bookSum: bookSum  });
			}
			flag++;
		}, function(err) {
			payCode = 1;
			paySum = -1;
			if (flag === 2) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum, bookCode: bookCode, bookSum: bookSum  });
			}
			flag++;
		});
		getCardSum(username, password, function(sum) {
			cardSum = sum;
			cardCode = 0;
			if (flag === 2) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum, bookCode: bookCode, bookSum: bookSum  });
			}
			flag++;
		}, function(err) {
			cardCode = 1;
			cardSum = -1;
			if (flag === 2) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum, bookCode: bookCode, bookSum: bookSum  });
			}
			flag++;
		});
		getLibSum(username, password, function(sum) {
			bookSum = sum.total;
			bookCode = 0;
			if (flag === 2) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum, bookCode: bookCode, bookSum: bookSum  });
			}
			flag++;
		}, function(err) {
			bookSum = 0;
			bookCode = 1;
			if (flag === 2) {
				res.send({ payCode: payCode, paySum: paySum, cardCode: cardCode, cardSum: cardSum, bookCode: bookCode, bookSum: bookSum  });
			}
			flag++;
		})
		
	});


}())
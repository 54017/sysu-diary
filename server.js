(function() {

	"use strict";


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

	app.post('/book', function(req, res) {
		let username = req.body.username,
			password = req.body.password;
		let bookCode, bookSum;
		getLibSum(username, password, function(sum) {
			bookSum = sum.total;
			bookCode = 0;
			res.send({ bookCode: bookCode, bookSum: bookSum });
		}, function(err) {
			bookSum = 0;
			bookCode = 1;
			res.send({ bookCode: bookCode, bookSum: bookSum });
		});
	});

	app.post('/pay', function(req, res) {
		let username = req.body.username,
			password = req.body.password;
		let payCode, paySum;
		//当字段为空时，在pay-sysu中判断登录成功的条件会有异常
		username = username == '' ? 0 : username; 
		password = password == '' ? 0 : password;
		getPaySum(username, password, function(sum) {
			paySum = sum;
			payCode = 0;
			res.send({ payCode: payCode, paySum: paySum });
		}, function(err) {
			payCode = 1;
			paySum = -1;
			res.send({ payCode: payCode, paySum: paySum });
		});
	});

	app.post('/data', function(req, res) {
		let username = req.body.username,
			password = req.body.password;
		let bookCode, bookSum, payCode, paySum;
		let flag = 0;
		let days = 0;
		let temp = "20" + username.substr(0, 2);
		let inDate = new Date()

		inDate.setFullYear(parseInt(temp), 8, 15);
		days = parseInt((new Date() - inDate) / 86400000);
		//当字段为空时，在pay-sysu中判断登录成功的条件会有异常
		username = username == '' ? 0 : username; 
		password = password == '' ? 0 : password;
		getPaySum(username, password, function(sum) {
			paySum = sum;
			payCode = 0;
			if (flag === 1) {
				res.send({ payCode: payCode, paySum: paySum, bookCode: bookCode, bookSum: bookSum, days: days  });
			}
			flag = 1;
		}, function(err) {
			payCode = 1;
			paySum = -1;
			if (flag === 1) {
				res.send({ payCode: payCode, paySum: paySum, bookCode: bookCode, bookSum: bookSum, days: days  });
			}
			flag = 1;
		});

		getLibSum(username, password, function(sum) {
			bookSum = sum.total;
			bookCode = 0;
			if (flag === 1) {
				res.send({ payCode: payCode, paySum: paySum, bookCode: bookCode, bookSum: bookSum, days: days  });
			}
			flag = 1;
		}, function(err) {
			bookSum = 0;
			bookCode = 1;
			if (flag === 1) {
				res.send({ payCode: payCode, paySum: paySum, bookCode: bookCode, bookSum: bookSum, days: days  });
			}
			flag = 1;
		});
		
	});


}())
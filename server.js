(function() {

	"use strict";

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
		username = username ? username : '0000';
		password = password ? password : '0000';
		console.log('username', username);
		let bookCode, bookSum, bookName, time, days;
		let temp = "20" + username.substr(0, 2);
		let inDate = new Date()
		inDate.setFullYear(parseInt(temp), 8, 15);
		days = parseInt((new Date() - inDate) / 86400000);
		getLibSum(username, password, function(sum) {
			bookSum = sum.total;
			bookCode = 0;
			bookName = sum.first_book_name;
			time = sum.first_book_time.year + " 年 " + sum.first_book_time.month + " 月 " + sum.first_book_time.day + " 日";
			res.send({ bookCode: bookCode, bookSum: bookSum, bookName: bookName, time: time, days: days });
		}, function(err) {
			bookCode = 1;
			res.send({ bookCode: bookCode });
		});
	});




}())
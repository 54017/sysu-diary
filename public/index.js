(function() {

	"use strict";

	let $ = require('./zepto.min.js');

	require('./zepto.fullpage.js');

	require('./css/index.css');

	$('.wp-inner').fullpage();

	$('#bt').click(function() {
		let username = $('#username').val(),
			password = $('#password').val();
		console.log(username, password)
		$.post("/data", { username: username, password: password}, function(data) {
			console.log(data);
			if (data.cardCode === 0) {
				$('#cards').text(Math.abs(data.cardSum));
			} else {
				$('#cards').text("错误");
			}
			if (data.payCode === 0) {
				$('#schools').text(data.paySum);
			} else {
				$('#schools').text("错误");
			}
		});
	})

}());
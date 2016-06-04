(function() {

	"use strict";

	let $ = require('./zepto.min.js');

	require('./zepto.fullpage.js');

	require('./css/index.css');

	$('.wp-inner').fullpage({
		duration: 0,
		beforeChange: function(e) {
			if (e.cur === 2 && e.next === 1) {
				return false;
			}
		},
		afterChange: function(e) {
			if (e.cur === 1) {
				$.fn.fullpage.stop();
			}
		}
	});

	$('#bt').click(function() {
		let username = $('#username').val(),
			password = $('#password').val();
		$.post("/data", { username: username, password: password }, function(data) {
			console.log(data);
			$.fn.fullpage.start();
			$.fn.fullpage.moveNext();
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
			if (data.bookCode === 0) {
				$('#books').text(data.bookSum);
			} else {
				$('#books').text("错误");
			}
		});
	})

}());
(function() {

	"use strict";

	let $ = require('./zepto.min.js');

	require('./zepto.fullpage.js');

	require('./css/index.css');

	require('./touch.js');

	let flag = 1, type ="", chinese;

	let $cards = $('#cards'),
		$schools = $('#schools'),
		$books = $('#books'),
		$logMask = $('#log-mask'),
		$bookMask = $('#book-mask'),
		$moneyMask = $('#money-mask'),
		$type = $('#type'),
		cur;

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

	let Ajax = function(username, password) {
		this.username = username;
		this.password = password;
	};

	Ajax.prototype.getBook = function(resolve, reject) {
		$.post("/book", { username: this.username, password: this.password }, function(data) {
			if (data.bookCode === 0) {
				$books.text(data.bookSum);
				resolve();
			} else {
				reject();
			}
		});
	}

	Ajax.prototype.getCard = function(resolve, reject) {
		$.post("/card", { username: this.username, password: this.password }, function(data) {
			if (data.cardCode === 0) {
				$cards.text(data.cardSum);
				resolve();
			} else {
				reject();
			}
		});
	}

	Ajax.prototype.getPay = function(resolve, reject) {
		console.log("get pay", this.username);
		try {
		$.post("/pay", { username: this.username, password: this.password }, function(data) {
			if (data.payCode === 0) {
				$schools.text(data.paySum);
				resolve();
			} else {
				console.log("reject");
				reject();
			}
		});
		} catch(e) {
			console.log("eereer: ", e);
		}
	}

	Ajax.prototype.getBoth = function(resolve, reject) {
		let flag = 0;
		$.post("/card", { username: this.username, password: this.password }, function(data) {
			if (data.cardCode === 0) {
				$cards.text(data.cardSum);
				if (flag) {
					resolve();
				}
				flag = 1;
			} else {
				if (flag === 2) {
					reject();
				}
				flag = 2;
			}
		});
		$.post("/pay", { username: this.username, password: this.password }, function(data) {
			if (data.payCode === 0) {
				$schools.text(data.paySum);
				if (flag) {
					resolve();
				}
				flag = 1;
			} else {
				if (flag === 2) {
					reject();
				}
				flag = 2;
			}
		});
	}

	$('#bt').tap(function() {
		if (!flag) {
			return;
		}
		flag = 0;
		let username = $('#username').val(),
			password = $('#password').val();
		let ajax = new Ajax(username, password);
		if (type === 'money') {
			if ($cards.text() === '*****' && $schools.text() === '*****') {
				new Promise(ajax.getBoth.bind(ajax)).then(function() {
					$.fn.fullpage.moveTo(4);
					$logMask.addClass('hidden');
					flag = 1;
					$.fn.fullpage.start();
				}).catch(function() {
					$logMask.removeClass('hidden');
					flag = 1;
					$.fn.fullpage.start();
				});
			} else if ($cards.text() === '*****') {
				new Promise(ajax.getCard.bind(ajax)).then(function() {
					$.fn.fullpage.moveTo(4);
					$logMask.addClass('hidden');
					flag = 1;
					$.fn.fullpage.start();
				}).catch(function(e) {
					$logMask.removeClass('hidden');
					flag = 1;
					$.fn.fullpage.start();
				})
			} else if ($schools.text() === '*****') {
				new Promise(ajax.getPay.bind(ajax)).then(function() {
					$.fn.fullpage.moveTo(4);
					$logMask.addClass('hidden');
					flag = 1;
					$.fn.fullpage.start();
				}).catch(function() {
					$logMask.removeClass('hidden');
					flag = 1;
					$.fn.fullpage.start();
				});
			}
		} else if (type === 'book') {
			new Promise(ajax.getBook.bind(ajax)).then(function() {
				$.fn.fullpage.moveTo(3);
				$logMask.addClass('hidden');
				flag = 1;
				$.fn.fullpage.start();
			}).catch(function(e) {
				$logMask.removeClass('hidden');
				flag = 1;
				$.fn.fullpage.start();
			});
		} else {
			$.post("/data", { username: username, password: password }, function(data) {
				console.log(data);
				flag = 1;
				$.fn.fullpage.start();
				$.fn.fullpage.moveNext(true);
				if (data.cardCode === 0) {
					$cards.text(Math.abs(data.cardSum).toFixed(2));
				} else {
					$cards.text("*****");
					$moneyMask.removeClass('hidden');
				}
				if (data.payCode === 0) {
					$schools.text(data.paySum.toFixed(2));
				} else {
					$schools.text("*****");
					$moneyMask.removeClass('hidden');
				}
				if (data.bookCode === 0) {
					$books.text(data.bookSum);
				} else {
					$books.text("*****");
					$bookMask.removeClass('hidden');
				}
				$('#days').text(data.days);
			});
		}
	});

	$('.reput').tap(function() {
		type = this.getAttribute('data-type');
		console.log(type);
		if (type === 'book') {
			chinese = '借阅';
			cur = 2;
		} else if(type === 'money') {
			chinese = '学杂费或消费'
			cur = 3;
		} else {
			$logMask.removeClass('hidden');
		}
		$('.mask').addClass('hidden');
		$('.warn').html('无法获取你的<span id="type">' + chinese + '</span>纪录');
		$.fn.fullpage.moveTo(1);
	});

	$('.jump').tap(function() {
		$('#logMask').addClass('hidden');
		$.fn.fullpage.moveNext(true);
	});

	$('#first-jump').tap(function() {
		$('#logMask').addClass('hidden');
		$.fn.fullpage.moveTo(cur);
	})

}());
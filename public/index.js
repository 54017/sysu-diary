(function() {

	require('./css/index.css');

	$ = Zepto = require('./zepto.min.js');

	require('./zepto.fullpage.js');

	var flag = 1;

	var $logMask = $('#log-mask'),
		$books = $('#books'),
		$time = $('#first-time'),
		$first = $('#first-book'),
		$days = $('#days');

	$('.wp-inner').fullpage({
		duration: 0,
		beforeChange: function(e) {
			if (e.cur === 2 && e.next === 1) {
				return false;
			}

			$(".page"+(e.cur+1) +" .message").removeClass("fade")
		},
		afterChange: function(e) {
			if (e.cur === 1) {
				$.fn.fullpage.stop();
			}

			$(".page"+(e.cur+1) +" .message").addClass("fade")
		}
	});

	var Ajax = function(username, password) {
		this.username = username;
		this.password = password;
	};

	Ajax.prototype.getBook = function(resolve, reject) {
		$.post("/book", { username: this.username, password: this.password }, function(data) {
			if (data.bookCode === 0) {
				$books.text(data.bookSum);
				$time.text(data.time);
				$first.text("《" + data.bookName + "》");
				$days.text(data.days);
				resolve();
			} else {
				reject();
			}
		});
	}

	$('#bt').tap(function() {
		if (!flag) {
			return;
		}
		flag = 0;
		var username = $('#username').val(),
			password = $('#password').val();
		var ajax = new Ajax(username, password);
		new Promise(ajax.getBook.bind(ajax)).then(function() {
			$.fn.fullpage.moveTo(2, true);
			$logMask.addClass('hidden');
			flag = 1;
			$.fn.fullpage.start();
		}).catch(function(e) {
			$logMask.removeClass('hidden');
			flag = 1;
			//$.fn.fullpage.start();
			$.fn.fullpage.stop();
		});
	});

	$('.reput').tap(function() {
		$logMask.addClass('hidden');
	});


	$('#first-jump').tap(function() {
		$logMask.addClass('hidden');
		$.fn.fullpage.moveTo(3);
	})

}());
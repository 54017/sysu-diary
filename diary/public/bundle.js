/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function() {

		__webpack_require__(1);

		$ = Zepto = __webpack_require__(12);

		__webpack_require__(13);

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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".fullPage-wp{   \n    -webkit-transform: translate3d(0,0,0);     \n    transform: translate3d(0,0,0);     \n}\n.fullPage-wp:after {\n    display: block;\n    content: ' ';\n    height: 0;\n    clear: both;\n}\n.fullPage-wp.anim{\n    -webkit-transition: all 500ms ease-out 0s;\n    transition: all 500ms ease-out 0s; \n}\n.fullPage-page{\n    display: block;\n    overflow: hidden;\n}\n\n.fullPage-dir-h {\n    float: left;\n}\n\n.wp {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    overflow: hidden;\n}\n\n.page {\n    text-align: center;\n    position: relative;\n    background-color: rgba(16, 31, 64, 1);\n    background-size: 100% 100%;\n}\n\ninput {\n    border-top-style: none;\n    border-right-style: none;\n    border-left-style: none;\n    border-bottom: 1px solid #ccc;\n    background-color: transparent;\n    outline: none;\n    width: 65%;\n    color: white;\n    font-size: 1rem;\n    height: 25px;\n    margin-left: 15px;\n}\n\n.page1 {\n    background-image: url(" + __webpack_require__(4) + ");\n}\n\n.page2 {\n    background-image: url(" + __webpack_require__(5) + ");\n}\n\n.page3 {\n    background-image: url(" + __webpack_require__(6) + ");\n}\n\n.page4 {\n    background-image: url(" + __webpack_require__(7) + ");\n}\n\n.page5 {\n    background-image: url(" + __webpack_require__(8) + ");\n}\n\n.page6 {\n    background-image: url(" + __webpack_require__(9) + ");\n    background-position: bottom;\n}\n\n\n.arrow {\n    position: absolute;\n    bottom: 20px;\n    left: 45%;\n    width: 10%;\n    -webkit-animation: arrow 1.5s linear infinite;\n}\n\n@-webkit-keyframes arrow {\n    0%    {opacity: 0; -webkit-transform: translate3d(0, 0, 0);}\n    100%  {opacity: 1; -webkit-transform: translate3d(0, -20px, 0);}\n}\n\n.message {\n    color: white;\n    font-size: 1.2rem;\n    position: absolute;\n    width: 100%;\n    left: 50%;\n    margin-left: -50%;\n\n    opacity: 0.1;\n\n    transition: opacity 1.5s ease 0.5s, top 1.5s ease;\n}\n\n.page3 .message {\n    bottom: 65px;\n}\n\n#days, #books, #first-time, #first-book {\n    color: rgba(249, 115, 17, 1);\n    font-size: 1.8rem;\n}\n\n#percent {\n    color: rgba(249, 115, 17, 1);\n}\n\n.page4 .message {\n    top: 60px;\n}\n\n.page5 .message {\n    top: 60px ;\n}\n\n.page6 {\n    background-size: 100% auto;\n    background-repeat: no-repeat;\n}\n\n.page8 {\n    color: white;\n}\n\n.warn {\n    position: absolute;\n    top: 20%;\n    width: 100%;\n    text-align: center;\n    color: #ccc;\n    font-size: 1rem;\n}\n\n.form {\n    position: relative;\n    top: 35%;\n    color: white;\n    width: 70%;\n    margin: 0 auto;\n}\n\n#bt {\n    margin-top: 30px;\n    width: 100%;\n}\n\n.bt {\n    width: 50%;\n    margin: 0 auto;\n    margin-top: 20px;\n    display: block;\n    border-radius: 20px;\n    height: 42px;\n    line-height: 42px;\n    border: 1px solid white;\n    text-decoration: none;\n    color: white;\n}\n\n\n.show {\n    visibility: visible;\n}\n\n.mask {\n    height: 100%;\n    position: absolute;\n    width: 100%;\n    background-color: rgba(47, 47, 47, 0.5);\n    top: 0;\n}\n\n\n.reput {\n    left: 0;\n}\n\n\n.hidden {\n    visibility: hidden;\n}\n\n.building {\n    width: 60%;\n    position: absolute;\n    margin: auto;\n    top: 50px;\n    right: 0;\n    left: 0;\n    bottom: 0;\n    -webkit-animation: building 4s linear infinite;\n}\n\n@-webkit-keyframes building {\n    0%    { -webkit-transform: translate3d(0, 0, 0); }\n    50%  { -webkit-transform: translate3d(0, -20px, 0); }\n    100% { -webkit-transform: translate3d(0, 0, 0); }\n}\n\n\n#english, #ads {\n    color: white;\n    font-size: 2rem;\n    opacity: 0;\n}\n\n.page7 .message {\n    margin: auto;\n    position: absolute;\n    top: 45%;\n    width: 100%;\n    left: 50%;\n    margin-left: -50%;\n}\n\n\n.cur #english {\n    -webkit-animation: first-in 1s linear both;\n    opacity: 1;\n    margin-top: -30px;\n}\n\n.cur #ads {\n    opacity: 1;\n    -webkit-animation: second-in 1s 1s linear both;\n}\n\n@-webkit-keyframes first-in {\n    0% { opacity: 0 }\n    100% {opacity: 1 }\n}\n\n@-webkit-keyframes second-in {\n    0% { opacity: 0 }\n    100% {opacity: 1 }\n}\n\n.footer {\n    position: absolute;\n    bottom: 1px;\n    font-size: 0.8rem;\n    color: #eee;\n    padding-right: 46px;\n    background-image: url(" + __webpack_require__(10) + ");\n    background-repeat: no-repeat;\n    background-size: auto 100%;\n    background-position: right;\n    height: 28px;\n    line-height: 30px;\n    left: 50%;\n    margin-left: -79px;\n}\n\n.book-bg {\n    width: 90%;\n}\n\n.page8 p:first-of-type {\n    margin-top: -25%;\n}\n\n.toast {\n    position: absolute;\n    bottom: 33%;\n    left: 50%;\n    margin-left: -125px;\n    color: #ccc;\n    width: 250px;\n    font-size: 0.7rem;\n}\n\n.toast img {\n    width: 250px;\n}\n\n.toast .retry {\n    position: absolute;\n    text-align: center;\n    margin: auto;\n    top: 15px;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n\n.reput {\n    display: block;\n    width: 250px;\n    height: 50px;\n    position: absolute;\n    margin-top: -46px;\n    line-height: 46px;\n}\n\n/**\n *  added by ailin\n */\n.page3 .message {\n    top: 75%;\n}\n\n/*.page3 .message.fade {\n    top: 72%;\n}*/\n\n.page4 .message {\n    top: 15%\n}\n\n/*.page4 .message.fade {\n    top: 15%;\n}\n*/\n.page5 .message {\n    top: 6%;\n}\n\n/*.page5 .message.fade {\n    top: 15%;\n}\n*/\n.message.fade {\n    opacity: 1;\n\n    transition: opacity 1.5s ease 0.5s;\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "0f07f8b7d94eacccb8965aac9fe1c8f6.png";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "dbeecc1efad36ae66700b8a8bb2166b3.png";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6ac1f7c1808c5bef482db1bbe4879980.png";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "aee3a8e011cc9e30f882d5311ac06378.png";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a229882159121b079dfaabf3f03093c9.png";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a1177f3478c9c9155060cb48dec50170.png";

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAAAwCAMAAABqgKfnAAAC9FBMVEUAAADk7PH+/v7m8PH8/Pz+/v7+/v7+/f1wn+zx8vHw8vH+/v79/Pz6+vrx8fHv8fH5+fn6+vr29vb29fX09PT+/v78/Pz6+vrz8/P8/P39/f37+/v39/dIvdz4+Pj19fX29vX6+vrw8PD08/Pz8/P09PT08vLx8/P6+vr9/Pz7+vr5+fn5+Pb39/f////09PT19PP9/fz+/fz49/f19fX29vb19PT29vbw8PDu8vL5+flIu936+fn7+/v4+Phqoev19fX39/fx8fH7+fj19fX29vby8vL+/v401tQ00dP9/fxd5t37+vn09PQmy9P//v5T1tvw8PBu3uBnxOPv7+9h294w29P8/Pz+/vsgxtH+/v5Jud0Zw9Es09P+/v4lu9YqneI/z9VvoetvoetE4tj4+PhL1Npx6OEbzc094dY64dVFkOQx1tMlztFIu90k1dI529VP5NoZp9oYtNUfkOMdm98ii+UlrNw73dY+2dYjhuYmgOk319VK5NlroOv19PNqp+lLv91U19mD5uVtpO9Qxd1c4t1G0tlL1th35eNt5uBor+ts3OBBjex46OJ9uexs0eI439Q0ydIs0M8Ubuc30dI1s9lA4dYy3dM4vtYTduYcd+dCp99IoOE3uthCsN0fz89W4tte5t0putYavdEgguYhdupMud4+h+temulKm+RTteE3h+pCq9/s7Ow7jepA19aK6OZ25+Ju6OD///8+4dYg09A539UYz88y29Mq19IQyc1DmOJFleI9pd5Bm+E+ot88qN0Jw80s0NAfzs4UzM4DuM5Dg+VDhuQ/juM/n+A4w9Y3ztMPf+NAnuAMiuALkN46qd0Jldw6r9s4rds4tdo3sNo5vNgDpNU5ydQ10NISzM0MyM0Fvs0SeuYPcuZIjeRGkuNBi+NBiOM5rNwx0NEm0M8azc8EwswBvcwPeOVIj+QPheI2q9s2s9kHndg139QFq9Mm1tEk1NEFstALhOIDnNgBqtIn19EBsc88mt82str56J85AAAAtHRSTlMAAv4E1vvv54QZBurGug0KsZ9KRTb42r4V+O7exaqUYT05LiseGxIL5tHOqpyFhDEjybB7XltOQioix6uZjIqEgnJwbGlVJvPVzL++pKOhfF01JxEPB/7hzrirqqajoqGfjYWEgWVNIPr05eLhyLeysaempqWloqGfn56clpCKdXV1Z2FLSUA3MjAtIxkTEw8L+PPy8fHt7ejm4+Hd3NzZ08e/tbOtpqaIiIKAf2xnYFVSSDaUTm7aAAAFE0lEQVRIx63WZXATQRiA4e8kCXH3kIZokxACpYa7u7u7u7u7u7s7HFDc3d3d3f0Pe0dKjra0h7y/cpnsM3ubndmFZFXMp1DBf0jUSEdRlCRC9o8OUchL/Uj3b5YqOxVO10f4t45aSv2aIPBXVjk/TiVLnLvwnzpBJY9KDGe/Y5Gcmj9xXLm14bHSOIhTsJ55GYNcHUducXicXg109pwmKpwiMzcpa3iIBDmhsgX4VKgoNQFY2s76keAqI6DoyAgRsHIG6K95UTaACsv6pi3Nm9qwAsgKeNFe9ECSDPl9JYPIWd7iUO+0pRKvNzdvOBog1gAphAGMXTXryO1D6ThImzduRFYTSLkK/ebs3LWDs4Rq1islq1LZ2d/u7zzJWWLaPKXXcPi1sf2LHbt04RxXaT6SQjVrt4E9n/5Fj1+hpT0ndzzjIrV7vflnr8d1HQI/IsoW23c1JB3d/uwwB6lb5S2sKlduO5hZn2L79z34Q6nr562oz2+3hnr7tu3gxq0O7H/Ilu5wkWptoitabBOra9seJUrT+rU+s5ujdCAhIeFaT2zt3GvXEkJdOxCSxtcbCUu4SqWvb9u27Xppem1aXUefmRhp36R65QGgxpnduzhJNR/v3bv3MZJQjas9pp/20tL+CYyDpBe7d+24x0V6cuPGjSdICllP0PP1AweadkNOSNqJpAYcpIN0dSCxQQsPHtzbtNZQSCzHeY5Shy/v37//wkihhiyohhy2dHLHvfocpE9v3rz5REvskkp3OUjtL9N1gd+W/jzampykj69evfqYipSDkTisU6ezdHVTkS7SUh5Int39q3SaLhUp/cU9u7cfyQMFivssWWUQTma0AruOp+hSlc4wUkYqr59SYEA4hPQh5pBj+WwATqfBAG5hxcJI+vD8+fMPncGZmrSLlvgAOSmnTC8WqCCXWBwD5jIQreWLFWAVm3l5ofMJuu5Q3B/8nXQ/JMkhhsqWD89PegkjGev2GDMRJmkc3wJKPFYvgEVPb968+bQ7ZKG0SkeK0sv7O3cd6c3MqSRPptRWj8qJRZOmGMJYRkgVBEl2UBYBqwDWTL/19OatHkhCF5OAK2Xpa4uBaJ1yRVF50dlfKM4mKhSrVWA4mpMkwqiH2jiU4gOMWjnjFpKqUnTigDC59GJm3zEAfXxmSQSAJ6OZLITpSamDsBSAuCx6sR7yWiCrFABZSycuRtKPBAWTHOqtJ69ADisMUCJgUsUWpHIDqxEDMXP4ghkDBP1DggC6QSOALnPiZAkZAUxumwhymQTWJFdbLDpMeSGTLgIM3uJyCCcpBUzRVYp4f4xV4U7EySFZhoAgJEnQEkohGhfIRRlUBgCH2l4YCtkAy6CSayhlTEFP0CXSeNR4bJwHoJxKBk3atOnJtoQBU6IUacqmj6yC2aQ+r0htJLUKsGTCFHzS7o+kXyAyk5CnyYCTfD3kr2KRiIa929QSfimzUstI1f1Z/LpSApErrxSPV/pAKoXsmTJTKsCqkoxUxk1LrmhKSFqsVLby7zYVhSQ5SuJIilLmoxT5+WD1ZcXtStLt+yFFVJTnxxu51J5IaxBHUnxWnkGXpUAB+XBGSpqmeBaoXjKbUb1aDPn4JM9ejm/mR4ElF1aKJ9BgfpxnJnLzdMZyGbSRvFzQyETmhGEJCS0hheyY0wmFiYrxaI0LO+TumIJiK7MLNOh/h6DaBYQtc7xcHm/XAEC8SgijBwxYB2mXgSQVBkiz7x/xfxeWk0voAAAAAElFTkSuQmCC"

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	/* Zepto 1.1.3 - zepto event ajax form ie fx touch - zeptojs.com/license */
	var Zepto=function(){function L(t){return null==t?String(t):T[j.call(t)]||"object"}function A(t){return"function"==L(t)}function D(t){return null!=t&&t==t.window}function _(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function Z(t){return"object"==L(t)}function $(t){return Z(t)&&!D(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function k(t){return a.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function U(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function H(t){var e,n;return u[t]||(e=s.createElement(t),s.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function I(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(n,i,r){for(e in i)r&&($(i[e])||M(i[e]))?($(i[e])&&!$(n[e])&&(n[e]={}),M(i[e])&&!M(n[e])&&(n[e]=[]),X(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function V(t,e){return null==e?n(t):n(t).filter(e)}function Y(t,e,n,i){return A(e)?e.call(t,n,i):e}function B(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function J(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function W(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n in t.childNodes)G(t.childNodes[n],e)}var t,e,n,i,C,P,r=[],o=r.slice,a=r.filter,s=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=s.createElement("table"),w=s.createElement("tr"),x={tr:s.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:w,th:w,"*":s.createElement("div")},b=/complete|loaded|interactive/,E=/^[\w-]*$/,T={},j=T.toString,S={},N=s.createElement("div"),O={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},M=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=N).appendChild(t),i=~S.qsa(r,e).indexOf(t),o&&N.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return a.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(e,i,r){var a,u,f;return h.test(e)&&(a=n(s.createElement(RegExp.$1))),a||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in x||(i="*"),f=x[i],f.innerHTML=""+e,a=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),$(r)&&(u=n(a),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),a},S.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},S.isZ=function(t){return t instanceof S.Z},S.init=function(e,i){var r;if(!e)return S.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=S.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(s,e)}else{if(A(e))return n(s).ready(e);if(S.isZ(e))return e;if(M(e))r=k(e);else if(Z(e))r=[e],e=null;else if(l.test(e))r=S.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(s,e)}}return S.Z(r,e)},n=function(t,e){return S.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){X(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],a=i||r?e.slice(1):e,s=E.test(a);return _(t)&&s&&i?(n=t.getElementById(a))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(s&&!i?r?t.getElementsByClassName(a):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=function(t,e){return t!==e&&t.contains(e)},n.type=L,n.isFunction=A,n.isWindow=D,n.isArray=M,n.isPlainObject=$,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return a.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){T["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return b.test(s.readyState)&&s.body?t(n):s.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return A(t)?this.not(this.not(t)):n(a.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return n(P(this.concat(n(t,e))))},is:function(t){return this.length>0&&S.matches(this[0],t)},not:function(e){var i=[];if(A(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&A(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return Z(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!Z(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!Z(t)?t:n(t)},find:function(t){var e,i=this;return e="object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)})},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:S.matches(i,t));)i=i!==e&&!_(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!_(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return V(e,t)},parent:function(t){return V(P(this.pluck("parentNode")),t)},children:function(t){return V(this.map(function(){return I(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return V(this.map(function(t,e){return a.call(I(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=H(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=A(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=A(t);return this.each(function(i){var r=n(this),o=r.contents(),a=e?t.call(this,i):t;o.length?o.wrapAll(a):r.append(a)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var i=this.innerHTML;n(this).empty().append(Y(this,t,e,i))})},text:function(e){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=e===t?"":""+e})},attr:function(n,i){var r;return"string"==typeof n&&i===t?0==this.length||1!==this[0].nodeType?t:"value"==n&&"INPUT"==this[0].nodeName?this.val():!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(1===this.nodeType)if(Z(n))for(e in n)B(this,e,n[e]);else B(this,n,Y(this,i,t,this.getAttribute(n)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&B(this,t)})},prop:function(e,n){return e=O[e]||e,n===t?this[0]&&this[0][e]:this.each(function(t){this[e]=Y(this,n,t,this[e])})},data:function(e,n){var i=this.attr("data-"+e.replace(m,"-$1").toLowerCase(),n);return null!==i?W(i):t},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=Y(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=Y(this,t,e,i.offset()),o=i.offsetParent().offset(),a={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(a.position="relative"),i.css(a)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(M(t)){var a={};return n.each(M(t)?t:[t],function(t,e){a[e]=r.style[C(e)]||o.getPropertyValue(e)}),a}}var s="";if("string"==L(t))i||0===i?s=F(t)+":"+U(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?s+=F(e)+":"+U(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+s})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(J(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=J(this),o=Y(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&J(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?J(this,""):(i=J(this),Y(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),void J(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),a=Y(this,e,r,J(this));a.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||s.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,a=this[0];return r===t?D(a)?a["inner"+i]:_(a)?a.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){a=n(this),a.css(e,Y(this,r,t,a[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:S.fragment(e)}),a=this.length>1;return r.length<1?this:this.each(function(t,s){o=i?s:s.parentNode,s=0==e?s.nextSibling:1==e?s.firstChild:2==e?s:null,r.forEach(function(t){if(a)t=t.cloneNode(!0);else if(!o)return n(t).remove();G(o.insertBefore(t,s),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),S.Z.prototype=n.fn,S.uniq=P,S.deserializeValue=W,n.zepto=S,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(a[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,s,u,f){var h=l(e),d=a[h]||(a[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var a=p(i);a.fn=r,a.sel=s,a.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?a.fn.apply(this,arguments):void 0}),a.del=u;var l=u||r;a.proxy=function(t){if(t=T(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},a.i=d.length,d.push(a),"addEventListener"in e&&e.addEventListener(g(a.e),a.proxy,m(a,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete a[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function T(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=w,r&&r.apply(i,arguments)},e[n]=x}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=w)),e}function j(t){var e,i={originalEvent:t};for(e in t)b.test(e)||t[e]===n||(i[e]=t[e]);return T(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},a={},s={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};s.click=s.mousedown=s.mouseup=s.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){if(r(e)){var i=function(){return e.apply(n,arguments)};return i._zid=l(e),i}if(o(n))return t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var w=function(){return!0},x=function(){return!1},b=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,a,s,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,a,s,e,f)}),h):(o(a)||r(u)||u===!1||(u=s,s=a,a=n),(r(s)||s===!1)&&(u=s,s=n),u===!1&&(u=x),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),a&&(l=function(e){var n,o=t(e.target).closest(a,r).get(0);return o&&o!==r?(n=t.extend(j(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,s,a,l||c)}))},t.fn.off=function(e,i,a){var s=this;return e&&!o(e)?(t.each(e,function(t,e){s.off(t,i,e)}),s):(o(i)||r(a)||a===!1||(a=i,i=n),a===!1&&(a=x),s.each(function(){y(this,e,a,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):T(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(a,s){i=j(o(e)?t.Event(e):e),i._args=n,i.target=s,t.each(h(s,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(s[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),T(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function w(){}function x(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":a.test(t)?"script":s.test(t)&&"xml")||"text"}function b(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=b(e.url,e.data),e.data=void 0)}function T(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function S(e,n,i,r){var o,a=t.isArray(n),s=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(s||"object"==o||"array"==o?n:"")+"]"),!r&&a?e.add(u.name,u.value):"array"==o||!i&&"object"==o?S(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,a=/^(?:text|application)\/javascript/i,s=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,a=(t.isFunction(o)?o():o)||"jsonp"+ ++e,s=n.createElement("script"),u=window[a],c=function(e){t(s).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(s).on("load error",function(e,n){clearTimeout(h),t(s).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[a]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[a]=function(){f=arguments},s.src=i.url.replace(/\?(.+)=\?/,"?$1="+a),n.head.appendChild(s),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:w,success:w,error:w,complete:w,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n),n.cache===!1&&(n.url=b(n.url,"_="+Date.now()));var a=n.dataType,s=/\?.+=\?/.test(n.url);if("jsonp"==a||s)return s||(n.url=b(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var T,u=n.accepts[a],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=w,clearTimeout(T);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){a=a||x(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==a?(1,eval)(e):"xml"==a?e=d.responseXML:"json"==a&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var j="async"in n?n.async:!0;d.open(n.type,n.url,j,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(T=setTimeout(function(){d.onreadystatechange=w,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(T.apply(null,arguments))},t.post=function(){var e=T.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=T.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var s,r=this,a=e.split(/\s/),u=T(e,n,i),f=u.success;return a.length>1&&(u.url=a[0],s=a[1]),u.success=function(e){r.html(s?t("<div>").html(e.replace(o,"")).find(s):e),f&&f.apply(r,arguments)},t.ajax(u),this};var j=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(j(t)+"="+j(e))},S(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var n,e=[];return t([].slice.call(this.get(0).elements)).each(function(){n=t(this);var i=n.attr("type");"fieldset"!=this.nodeName.toLowerCase()&&!this.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&("radio"!=i&&"checkbox"!=i||this.checked)&&e.push({name:n.attr("name"),value:n.val()})}),e},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(e)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto),function(t,e){function x(t){return t.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function b(t){return i?i+t:t.toLowerCase()}var i,c,l,h,p,d,m,g,v,y,n="",a={Webkit:"webkit",Moz:"",O:"o"},s=window.document,u=s.createElement("div"),f=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,w={};t.each(a,function(t,r){return u.style[t+"TransitionProperty"]!==e?(n="-"+t.toLowerCase()+"-",i=r,!1):void 0}),c=n+"transform",w[l=n+"transition-property"]=w[h=n+"transition-duration"]=w[d=n+"transition-delay"]=w[p=n+"transition-timing-function"]=w[m=n+"animation-name"]=w[g=n+"animation-duration"]=w[y=n+"animation-delay"]=w[v=n+"animation-timing-function"]="",t.fx={off:i===e&&u.style.transitionProperty===e,speeds:{_default:400,fast:200,slow:600},cssPrefix:n,transitionEnd:b("TransitionEnd"),animationEnd:b("AnimationEnd")},t.fn.animate=function(n,i,r,o,a){return t.isFunction(i)&&(o=i,r=e,i=e),t.isFunction(r)&&(o=r,r=e),t.isPlainObject(i)&&(r=i.easing,o=i.complete,a=i.delay,i=i.duration),i&&(i=("number"==typeof i?i:t.fx.speeds[i]||t.fx.speeds._default)/1e3),a&&(a=parseFloat(a)/1e3),this.anim(n,i,r,o,a)},t.fn.anim=function(n,i,r,o,a){var s,b,j,u={},E="",T=this,S=t.fx.transitionEnd,C=!1;if(i===e&&(i=t.fx.speeds._default/1e3),a===e&&(a=0),t.fx.off&&(i=0),"string"==typeof n)u[m]=n,u[g]=i+"s",u[y]=a+"s",u[v]=r||"linear",S=t.fx.animationEnd;else{b=[];for(s in n)f.test(s)?E+=s+"("+n[s]+") ":(u[s]=n[s],b.push(x(s)));E&&(u[c]=E,b.push(c)),i>0&&"object"==typeof n&&(u[l]=b.join(", "),u[h]=i+"s",u[d]=a+"s",u[p]=r||"linear")}return j=function(e){if("undefined"!=typeof e){if(e.target!==e.currentTarget)return;t(e.target).unbind(S,j)}else t(this).unbind(S,j);C=!0,t(this).css(w),o&&o.call(this)},i>0&&(this.bind(S,j),setTimeout(function(){C||j.call(T)},1e3*i+25)),this.size()&&this.get(0).clientLeft,this.css(u),0>=i&&setTimeout(function(){T.each(function(){j.call(this)})},0),this},u=null}(Zepto),function(t){function u(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function f(){o=null,e.last&&(e.el.trigger("longTap"),e={})}function c(){o&&clearTimeout(o),o=null}function l(){n&&clearTimeout(n),i&&clearTimeout(i),r&&clearTimeout(r),o&&clearTimeout(o),n=i=r=o=null,e={}}function h(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function p(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}var n,i,r,o,s,e={},a=750;t(document).ready(function(){var d,m,y,w,g=0,v=0;"MSGesture"in window&&(s=new MSGesture,s.target=document.body),t(document).bind("MSGestureEnd",function(t){var n=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;n&&(e.el.trigger("swipe"),e.el.trigger("swipe"+n))}).on("touchstart MSPointerDown pointerdown",function(i){(!(w=p(i,"down"))||h(i))&&(y=w?i:i.touches[0],i.touches&&1===i.touches.length&&e.x2&&(e.x2=void 0,e.y2=void 0),d=Date.now(),m=d-(e.last||d),e.el=t("tagName"in y.target?y.target:y.target.parentNode),n&&clearTimeout(n),e.x1=y.pageX,e.y1=y.pageY,m>0&&250>=m&&(e.isDoubleTap=!0),e.last=d,o=setTimeout(f,a),s&&w&&s.addPointer(i.pointerId))}).on("touchmove MSPointerMove pointermove",function(t){(!(w=p(t,"move"))||h(t))&&(y=w?t:t.touches[0],c(),e.x2=y.pageX,e.y2=y.pageY,g+=Math.abs(e.x1-e.x2),v+=Math.abs(e.y1-e.y2))}).on("touchend MSPointerUp pointerup",function(o){(!(w=p(o,"up"))||h(o))&&(c(),e.x2&&Math.abs(e.x1-e.x2)>30||e.y2&&Math.abs(e.y1-e.y2)>30?r=setTimeout(function(){e.el.trigger("swipe"),e.el.trigger("swipe"+u(e.x1,e.x2,e.y1,e.y2)),e={}},0):"last"in e&&(30>g&&30>v?i=setTimeout(function(){var i=t.Event("tap");i.cancelTouch=l,e.el.trigger(i),e.isDoubleTap?(e.el&&e.el.trigger("doubleTap"),e={}):n=setTimeout(function(){n=null,e.el&&e.el.trigger("singleTap"),e={}},250)},0):e={}),g=v=0)}).on("touchcancel MSPointerCancel pointercancel",l),t(window).on("scroll",l)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(Zepto); module.exports = Zepto;

/***/ },
/* 13 */
/***/ function(module, exports) {

	/*!
	 * zepto.fullpage.js v0.5.0 (https://github.com/yanhaijing/zepto.fullpage)
	 * API https://github.com/yanhaijing/zepto.fullpage/blob/master/doc/api.md
	 * Copyright 2014 yanhaijing. All Rights Reserved
	 * Licensed under MIT (https://github.com/yanhaijing/zepto.fullpage/blob/master/LICENSE)
	 */
	(function($, window, undefined) {
	    if (typeof $ === 'undefined') {
	        throw new Error('zepto.fullpage\'s script requires Zepto');
	    }
	    var fullpage = null;
	    var d = {
	        page: '.page',
	        start: 0,
	        duration: 500,
	        loop: false,
	        drag: false,
	        dir: 'v',
	        der: 0.1,
	        change: function(data) {},
	        beforeChange: function(data) {},
	        afterChange: function(data) {},
	        orientationchange: function(orientation) {}
	    };

	    function touchmove(e) {
	        e.preventDefault();
	    }
	    
	    function fix(cur, pagesLength, loop) {
	        if (cur < 0) {
	            return !!loop ? pagesLength - 1 : 0;
	        }

	        if (cur >= pagesLength) {
	            return !!loop ? 0 : pagesLength - 1;
	        }


	        return cur;
	    }

	    function move($ele, dir, dist) {
	        var xPx = '0px', yPx = '0px';
	        if(dir === 'v') yPx = dist + 'px';
	        else xPx = dist + 'px';
	        $ele.css({
	            '-webkit-transform' : 'translate3d(' + xPx + ', ' + yPx + ', 0px);',
	            'transform' : 'translate3d(' + xPx + ', ' + yPx + ', 0px);'
	        });
	    }

	    function init(option) {
	        var o = $.extend(true, {}, d, option);
	        var that = this;
	        that.curIndex = -1;
	        that.o = o;

	        that.startY = 0;
	        that.movingFlag = false;

	        that.$this.addClass('fullPage-wp');
	        that.$parent = that.$this.parent();
	        that.$pages = that.$this.find(o.page).addClass('fullPage-page fullPage-dir-' + o.dir);
	        that.pagesLength = that.$pages.length;
	        that.update();
	        that.initEvent();
	        that.start();
	    }

	    function Fullpage($this, option) {
	        this.$this = $this;
	        init.call(this, option);
	    }

	    $.extend(Fullpage.prototype, {
	        update: function() {
	            if (this.o.dir === 'h') {
	                this.width = this.$parent.width();
	                this.$pages.width(this.width);
	                this.$this.width(this.width * this.pagesLength);
	            }

	            this.height = this.$parent.height();
	            this.$pages.height(this.height);

	            this.moveTo(this.curIndex < 0 ? this.o.start : this.curIndex);
	        },
	        initEvent: function() {
	            var that = this;
	            var $this = that.$this;

	            $this.on('touchstart', function(e) {
	                if (!that.status) {return 1;}
	                //e.preventDefault();
	                if (that.movingFlag) {
	                    return 0;
	                }

	                that.startX = e.targetTouches[0].pageX;
	                that.startY = e.targetTouches[0].pageY;
	            });
	            $this.on('touchend', function(e) {
	                if (!that.status) {return 1;}
	                //e.preventDefault();
	                if (that.movingFlag) {
	                    return 0;
	                }

	                var sub = that.o.dir === 'v' ? (e.changedTouches[0].pageY - that.startY) / that.height : (e.changedTouches[0].pageX - that.startX) / that.width;
	                var der = (sub > that.o.der || sub < -that.o.der) ? sub > 0 ? -1 : 1 : 0;

	                that.moveTo(that.curIndex + der, true);
	            });
	            if (that.o.drag) {
	                $this.on('touchmove', function(e) {
	                    if (!that.status) {return 1;}
	                    //e.preventDefault();
	                    if (that.movingFlag) {
	                        that.startX = e.targetTouches[0].pageX;
	                        that.startY = e.targetTouches[0].pageY;
	                        return 0;
	                    }

	                    var y = e.changedTouches[0].pageY - that.startY;
	                    if( (that.curIndex == 0 && y > 0) || (that.curIndex === that.pagesLength - 1 && y < 0) ) y /= 2;
	                    var x = e.changedTouches[0].pageX - that.startX;
	                    if( (that.curIndex == 0 && x > 0) || (that.curIndex === that.pagesLength - 1 && x < 0) ) x /= 2;
	                    var dist = (that.o.dir === 'v' ? (-that.curIndex * that.height + y) : (-that.curIndex * that.width + x));
	                    $this.removeClass('anim');
	                    move($this, that.o.dir, dist);
	                });
	            }

	            // 翻转屏幕提示
	            // ==============================             
	            window.addEventListener('orientationchange', function() {
	                if (window.orientation === 180 || window.orientation === 0) {
	                    that.o.orientationchange('portrait');
	                }
	                if (window.orientation === 90 || window.orientation === -90) {
	                    that.o.orientationchange('landscape');
	                }
	            }, false);

	            window.addEventListener('resize', function() {
	                that.update();
	            }, false);
	        },

	        holdTouch: function() {
	            $(document).on('touchmove', touchmove);
	        },
	        unholdTouch: function() {
	            $(document).off('touchmove', touchmove);
	        },
	        start: function() {
	            this.status = 1;
	            this.holdTouch();
	        },
	        stop: function() {
	            this.status = 0;
	            this.unholdTouch();
	        },
	        moveTo: function(next, anim) {
	            var that = this;
	            var $this = that.$this;
	            var cur = that.curIndex;

	            next = fix(next, that.pagesLength, that.o.loop);

	            if (anim) {
	                $this.addClass('anim');
	            } else {
	                $this.removeClass('anim');
	            }

	            if (next !== cur) {
	                var flag = that.o.beforeChange({
	                    next: next,
	                    cur: cur
	                });

	                // beforeChange 显示返回false 可阻止滚屏的发生
	                if (flag === false) {
	                    return 1;
	                }
	            }

	            that.movingFlag = true;
	            that.curIndex = next;
	            move($this, that.o.dir, -next * (that.o.dir === 'v' ? that.height : that.width));

	            if (next !== cur) {
	                that.o.change({
	                    prev: cur,
	                    cur: next
	                });
	            }

	            window.setTimeout(function() {
	                that.movingFlag = false;
	                if (next !== cur) {
	                    that.o.afterChange({
	                        prev: cur,
	                        cur: next
	                    });
	                    that.$pages.removeClass('cur').eq(next).addClass('cur');
	                }
	            }, that.o.duration);

	            return 0;
	        },
	        movePrev: function(anim) {
	            this.moveTo(this.curIndex - 1, anim);
	        },
	        moveNext: function(anim) {
	            this.moveTo(this.curIndex + 1, anim);
	        },
	        getCurIndex: function () {
	            return this.curIndex;
	        }
	    });

	    $.fn.fullpage = function(option) {
	        if (!fullpage) {
	            fullpage = new Fullpage($(this), option);
	        }
	        return this;
	    };
	    $.fn.fullpage.version = '0.5.0';
	    //暴露方法
	    $.each(['update', 'moveTo', 'moveNext', 'movePrev', 'start', 'stop', 'getCurIndex', 'holdTouch', 'unholdTouch'], function(key, val) {
	        $.fn.fullpage[val] = function() {
	            if (!fullpage) {
	                return 0;
	            }
	            return fullpage[val].apply(fullpage, [].slice.call(arguments, 0));
	        };
	    });
	}(Zepto, window));


/***/ }
/******/ ]);
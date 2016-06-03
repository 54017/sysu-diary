module.exports = (function() {
    
    "use strict";

    const http = require('http');
    const https = require('https');


    function handle(text) {
        var name, total, dates = {}, date;
        var re_name, re_total, re_book;
        var match_name, match_total, match_book;
        re_name = new RegExp("[\u4e00-\u9fa5]{3}\\s-\\s([\u4e00-\u9fa5]{2,4})[\u4e00-\u9fa5]{9}");
        re_total = new RegExp("[\u4e00-\u9fa5]{2}(\\s)+(\\d+)");
        re_book = new RegExp("[\\D](\\d{8})[\\D]", "gm");

        match_name = re_name.exec(text);
        match_total = re_total.exec(text);
        match_book = re_book.exec(text);
        if(match_name) {
            name = match_name[1];
        } else {
            console.error("Something wrong QAQ");
        }
        if(match_total) {
            total = match_total[2];
        } else {
            console.error("Something wrong QAQ");
        }
        var i = 1;
        while ((date = re_book.exec(text)) !== null) {
            if(i%2) {
            var year = date[1].substr(0, 4);
                if(!dates[year]) {
                    dates[year] = [];
                }
                dates[year].push(date[1]);
            }
            i++;
        }
        for (var year in dates) {
            dates[year] = dates[year].length;
        }
        return {
            name: name,
            total: total,
            list: dates
        }
    }

    let AutoSpider = function(id, password) {
        this.id = id;
        this.password = password;
        this.session = "";
        this.result = null;
    }

    AutoSpider.prototype = {
        
        constructor: AutoSpider,

        getSession: function(resolve, reject) {
            let options = {
                hostname: '202.116.64.108',
                port: 8991,
                path: '/F',
                method: 'GET',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, sdch',
                    'Accept-Language': 'zh-CN,zh;q=0.8',
                    'Cache-Control': 'max-age=0',
                    'Connection':'keep-alive',
                    'Cookie': 'lang=zh',
                    'Host': '202.116.64.108',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
                }
            };
            let data = "";
            let req = http.get(options, function(res) {
                var re_session = new RegExp("202.116.64.108:8991/F/"+'((\\w|-|\\d)+)\\"');
                res.on("data", function(chunk) {
                    data += chunk.toString();
                })
                res.on('end',function() {
                    this.session = re_session.exec(data)[1];
                    resolve();
                }.bind(this))
                res.on('error', function(err) {
                    console.log('error in get library session: ', err)
                })
            }.bind(this)).on('error', function(err) {
                console.log('error in get library session: ', err);
            });
        },

        login: function(resolve, reject) {
            let postData = `func=login-session&login_source=bor-info&bor_library=ZSU50&bor_id=${this.id}&bor_verification=${this.password}`;
            let options = {
                hostname: '202.116.64.108',
                port: 8991,
                path: '/F/'+this.session,
                method: 'POST',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, sdch',
                    'Accept-Language': 'zh-CN,zh;q=0.8',
                    'Cache-Control': 'max-age=0',
                    'Connection':'keep-alive',
                    'Content-Length': postData.length,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Host': '202.116.64.108:8991',
                    'Origin': 'http://library.sysu.edu.cn',
                    'Referer': 'http://202.116.64.108:8991/F/'+this.session+'?func=file&file_name=login-session',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
                }
            };
            let data = "";
            let req = http.request(options, function(res) {
                res.on("data", function(chunk) {
                    data += chunk.toString();
                })
                res.on('end', function() {
                    resolve();
                })
                res.on('error', function(err) {
                    console.log('err in library login: ', err)
                })
            }.bind(this)).on('error', function(err) {
                console.log('error in get library login: ', err);
            });
            req.write(postData);
            req.end();

        },

        getBorrowingHistory: function(resolve, reject) {
            let options = {
                hostname: '202.116.64.108',
                port: 8991,
                path: '/F/'+this.session+'?func=bor-history-loan&adm_library=ZSU50',
                method: 'GET',
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, sdch',
                    'Accept-Language': 'zh-CN,zh;q=0.8',
                    'Cache-Control': 'no-cache',
                    'Connection':'keep-alive',
                    'Cookie': 'lang=zh',
                    'Host': '202.116.64.108:8991',
                    'Referer':'http://202.116.64.108:8991/F/'+this.session,
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36'
                }
            };
            let data = "";
            let req = http.get(options, function(res) {
                res.on("data", function(chunk) {
                    data += chunk.toString();
                });
                res.on("end", function() {
                    this.result = handle(data);
                    resolve();
                }.bind(this))
                res.on("error",function(err){
                    console.log(err)
                })
            }.bind(this)).on('error', function(err) {
                console.log('error in get library session: ', e);
            });
        }
    }

    let init = (studentNumber, password, success, fail) => {
        let mySpider = new AutoSpider(studentNumber, password);
        new Promise(mySpider.getSession.bind(mySpider)).then(function() {
            return new Promise(mySpider.login.bind(mySpider))
        }).then(function(){
            return new Promise(mySpider.getBorrowingHistory.bind(mySpider))
        }).then(function(){
            success(mySpider.result)
        }).catch(function(e) {
            console.log("err", e);
            if (e === 1) {
                fail();
            }
        });
    }

    return init;

}())




var app = require('express')();
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require("socket.io")(http);
var generator = require("./utils.js");
var nodemailer = require("nodemailer");
//var mailConfig = require("./mailConfig.js");
mongoose.connect('mongodb://localhost/test');

var BubbleSchema = new mongoose.Schema({
    content: String,
    sender_id: String,
    send_time: String
});

var Bubble = mongoose.model('Bubble', BubbleSchema);
var online = 0;
var ips = [];

app.get('/', function(req, res) {
    Bubble.find({},function(err,bubbles){
        if(err) {
            console.log(err);
            res.end();
        }
        //console.log(bubbles);
        res.status(200).jsonp(bubbles);
    });
});

io.on('connection', function(socket) {
    //console.log(socket.handshake.address);
    //notifyOn(socket.handshake.address);
    io.emit('someone connect', {online: ++online});

    socket.on('id', function() {
        var id = generator();
        socket.emit('id', {sender_id: id});
    })

    socket.on('chat message', function(msg) {
        //console.log('message:' + msg["sender_id"]);
        var bubble = new Bubble({
            content: msg.content,
            sender_id: msg.sender_id,
            send_time: msg.send_time
        });
        bubble.save(function(err) {
            if(err) {
                console.log(err);
            } else {
                io.emit('chat message', msg);
            }
        })
        
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        //notifyOff(socket.handshake.address);
        socket.emit('someone disconnect', {online: --online});
    });
});

http.listen(3000, function() {
    console.log("listening on 3000");
});

//var transporter = nodemailer.createTransport('SMTP', mailConfig.from);
var notifyOn = function(ip) {
    if (ips.indexOf(ip) != -1) {
        return;
    }
    ips.push(ip);
    var options = {
        from: mailConfig.from.auth.user,
        to: mailConfig.to.join(','),
        subject: mailConfig.subject,
        text: 'ip: ' + ip + ', log on( ⊙o⊙ )'
    };
    transporter.sendMail(options, function(err, msg) {
        if(err) {
            console.log(err);
        } else {
            //console.log(msg);
        }
    });
};

var notifyOff = function(ip) {
    if (ips.indexOf(ip) == -1) {
        console.log("something wrong happen!");
        return;
    }
    ips.splice(ips.indexOf(ip), 1);
    var options = {
        from: mailConfig.from.auth.user,
        to: mailConfig.to.join(','),
        subject: mailConfig.subject,
        text: 'ip: ' + ip + ', log off( ⊙o⊙ )'
    };
    transporter.sendMail(options, function(err, msg) {
        if(err) {
            console.log(err);
        } else {
            //console.log(msg);
        }
    });
};

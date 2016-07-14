var React = require('react');
var ReactDOM = require('react-dom');

require("../less/index.less");

//var url = "localhost:3000";
var url = "ohhhhh.xyz:3000";
//var api = "http://ohhhhh.xyz:3000";

var ChatWin = require("./chatWin.js");
var Input = require("./input.js");
var Online = require("./online.js");

var App = React.createClass({
    socket: {},
    componentWillMount: function() {
        var _this = this;

        $.ajax({
            url: "http://"+url,
            type: 'GET',
            dataType: 'JSONP',  // cross-orign
            success: function(data) {
                _this.setState({bubbles: data});
            },
            error: function(e) {
                console.log(e);
            }
        });

        this.socket = io.connect('ws://'+url);
        if (!localStorage.getItem('sender_id')) {
            this.socket.emit('id');
            this.socket.on('id', function(data) {
                localStorage.setItem('sender_id', data.sender_id);
            })
        }
        this.socket.on('someone connect', function(msg) {
            _this.setState({"online": msg.online});
        });
        this.socket.on('chat message', function(msg) {
            _this.setState({"bubbles": _this.state.bubbles.concat([msg])});
        });
    },
    getInitialState: function() {
        return {
            bubbles: [],
            online: 0
        }
    },
    addMessage: function(newMessage){
        //this.setState({bubbles: this.state.bubbles.concat([newMessage])});
        this.socket.emit('chat message', newMessage);
    },
    render: function() {
        return (
            <div className="chat-container">
                <ChatWin ref="chatWin" bubbles={this.state.bubbles}/>
                <Input addMessage={this.addMessage} />
            </div>
        );
    }
});

ReactDOM.render(<App />, document.getElementById("container"));

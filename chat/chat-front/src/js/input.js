var React = require("react");

var Input = React.createClass({
    sendMessage: function() {
        var words = this.refs.words.value;
        var userId = localStorage.getItem('sender_id');
        var time = new Date();
        var str_time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        this.props.addMessage({"sender_id": userId, "content": words, "send_time": str_time});
        this.clearInput();
    },
    clearInput: function() {
        this.refs.words.value = "";
        this.refs.words.focus();
    },
    checkEnter: function(e) {
        var event = e || window.event;

        if (event.keyCode == 13) {
            this.sendMessage();
        }
    },
    render: function() {
        return (
            <div className="input-bar">
                <input onKeyDown={this.checkEnter} placeholder="输入" ref="words"/>
                <button onClick={this.sendMessage}>send</button>
            </div>
            );
    }
});

module.exports = Input;
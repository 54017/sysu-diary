var React = require('react');
var ReactDom = require('react-dom');
var Bubble = require("./bubble.js");

var ChatWin = React.createClass({
    componentDidUpdate: function() {
        var dom = ReactDom.findDOMNode(this);
        dom.scrollTop = dom.scrollHeight;
    },
    render: function() {
        var bubbles = this.props.bubbles.map(function(bubble, index) {
            return (
                <Bubble key={"bubble-"+index} sender_id={bubble.sender_id} content={bubble.content} send_time={bubble.send_time} />
                )
        });
        return (
            <div className="chat-window">
                {bubbles}
            </div>
            )
    }
});

module.exports = ChatWin;
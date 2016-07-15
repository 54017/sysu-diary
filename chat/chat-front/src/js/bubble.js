var React = require("react");

var Bubble = React.createClass({
    render: function() {
        var userId = localStorage.getItem("sender_id");
        var isYours = this.props.sender_id == userId? true: false;
        return (
            <div className="bubble-container">
                <div className={"bubble" + (isYours? " self": " other")}>
                    <p>{this.props.content}</p>
                    <span className="bubble-time">{this.props.send_time}</span>
                </div>
            </div>
            );
    }
});

module.exports = Bubble;
var React = require('react');

var Online = React.createClass({
    render: function() {
        return (
            <div className="online-box">
                <span>online: {this.props.online}</span>
            </div>
        );
    }
});

module.exports = Online;
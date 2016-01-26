const React = require('react');
const EventView = require('./EventView');

const Timeline = React.createClass({
  propTypes: {
    calendars: React.PropTypes.array,
    userId: React.PropTypes.string,
    onLoaded: React.PropTypes.func,
  },

  getStyles() {
    return {
      display: 'inline-block',
      position: 'absolute',
      right: '0px',
      left: '200px',
      top: '0px',
      bottom: '0px',
      padding: '1px',
    };
  },

  // TODO: Make filter config not static
  renderTimeline() {
    return (
      <EventView
        onLoaded={this.props.onLoaded}
        calendars={this.props.calendars}
        userId={this.props.userId}
        filter="ooo,leave,vacation,holiday" />
    );
  },

  render() {
    return (
      <div
        style={this.getStyles()}>
        {this.renderTimeline()}
      </div>
    );
  },
});

module.exports = Timeline;

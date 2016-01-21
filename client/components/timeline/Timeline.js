// const debug = require('debug')('app:components:application');
const React = require('react');
const EventView = require('./EventView');

const Timeline = React.createClass({
  propTypes: {
    calendars: React.PropTypes.array,
    userId: React.PropTypes.string,
  },

  getStyles() {
    return {
      margin: 'auto',
      backgroundColor: 'blue',
      display: 'inline-block',
    };
  },

  // TODO: Make filter config not static
  renderTimeline() {
    return (
      <EventView
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

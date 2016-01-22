const debug = require('debug')('app:components:application');
const React = require('react');

const EventView = React.createClass({
  // propTypes: {
  //   calendarId: React.PropTypes.string,
  // },
  propTypes: {
    calendars: React.PropTypes.array,
    userId: React.PropTypes.string,
    filter: React.PropTypes.string,
  },

  contextTypes: {
    stores: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      events: null,
    };
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  getStateFromStore() {
    this.state = {projects: [], loading: true};
    return this.context.stores.calendars.getBulkCalendarEvents(this.props.userId, this.props.calendars, this.props.filter)
      .then((events) => {
        this.setState({events: events, loading: false});
      })
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false});
      });
  },

  getEventStyles() {
    return {
      backgroundColor: '#bbbbee',
      height: '100%',
      width: '25px',
      display: 'inline-block',
    };
  },

  getStyles() {
    return {
      height: '100%',
      width: '100%',
    };
  },

  renderTimeline() {
    const events = this.state.events;
    const eventsView = [];
    // TODO: For tooltip make sure to write function to return string
    if (events) {
      for (let index = 0; index < events.length; index++) {
        eventsView.push(<div
          key={index}
          style={this.getEventStyles()}          
          title={events[index].summary + ' ' + (events[index].start && events[index].start.date) + ' - ' + (events[index].end && events[index].end.date)}>
          X
        </div>);
      }
    }
    return eventsView;
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

module.exports = EventView;

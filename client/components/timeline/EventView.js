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
      .then((events) => this.setState({events, loading: false}))
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false});
      });
  },

  getStyles() {
    return {
      backgroundColor: 'yellow',
      padding: '20px',
      margin: 'auto',
    };
  },

  renderTimeline() {
    const events = this.state.events && this.state.events.items;
    const eventsView = [];
    if (events) {
      for (let index = 0; index < events.length; index++) {
        eventsView.push(<div
          key={index}
          style={{position: 'relative', padding: '2px'}}>
          {events[index].summary}
          <span
           style={{paddingLeft: '25px'}}>
            {(events[index].start && events[index].start.date) || ''} : {(events[index].end && events[index].end.date) || ''}
          </span>
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

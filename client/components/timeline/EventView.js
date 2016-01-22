const debug = require('debug')('app:components:application');
const React = require('react');

const EventView = React.createClass({
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

  // TODO: Should be based on date filter, so it doesn't have to be just one year
  getNumberOfDays() {
    const now = new Date();
    const yearDate = new Date(now.getTime());
    yearDate.setFullYear(yearDate.getFullYear() + 1);
    return this.getDayDiff(now, yearDate);
  },

  getEventStyles(days, daysFromToday) {
    return {
      backgroundColor: '#27C2FD',
      height: '100%',
      width: (days / this.getNumberOfDays() * 100) + '%',
      display: 'inline-block',
      position: 'absolute',
      top: '0px',
      bottom: '0px',
      left: (daysFromToday / this.getNumberOfDays() * 100) + '%',
      minWidth: '1px',
    };
  },

  getStyles() {
    return {
      height: '100%',
      width: '100%',
    };
  },

  getDateString(evtDate) {
    return evtDate && (evtDate.date || evtDate.dateTime);
  },

  getEventDate(evtDate) {
    const strStartDate = this.getDateString(evtDate);
    return strStartDate && new Date(strStartDate);
  },

  getEventTitle(evt) {
    return evt.summary + ' ' +
      this.getDateString(evt.start) + ' - ' +
      this.getDateString(evt.end);
  },

  getDayDiff(start, end) {
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  },

  getEventDays(evt) {
    const startDate = this.getEventDate(evt.start);
    const endDate = this.getEventDate(evt.end);
    return startDate && endDate ? this.getDayDiff(startDate, endDate) : 0;
  },

  getDaysFromToday(evt) {
    const date = this.getEventDate(evt.start);
    return date ? this.getDayDiff(new Date(), date) : 0;
  },

  renderTimeline() {
    const events = this.state.events;
    const eventsView = [];
    if (events) {
      for (let index = 0; index < events.length; index++) {
        eventsView.push(<div
          key={index}
          style={this.getEventStyles(this.getEventDays(events[index]), this.getDaysFromToday(events[index]))}
          title={this.getEventTitle(events[index])} />);
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

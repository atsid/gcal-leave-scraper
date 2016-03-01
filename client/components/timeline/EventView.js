const debug = require('debug')('app:components:application');
const React = require('react');

const EventView = React.createClass({
  propTypes: {
    calendars: React.PropTypes.array,
    userId: React.PropTypes.string,
    filter: React.PropTypes.string,
    range: React.PropTypes.object,
    onLoaded: React.PropTypes.func,
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
    this.startDate = this.props.range.getStartDate();
    this.endDate = this.props.range.getEndDate(this.startDate);
    this.state = {projects: [], loading: true};
    return this.context.stores.calendars.getBulkCalendarEvents(this.props.userId, this.props.calendars, this.props.filter, this.startDate, this.endDate)
      .then((events) => {
        this.setState({events: events, loading: false});
      })
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false});
      });
  },

  getNumberOfDays() {
    return this.getDayDiff(this.startDate, this.endDate);
  },

  getEventStyles(days, daysFromToday, color) {
    return {
      backgroundColor: color,
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
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  },

  getEventDays(evt) {
    const startDate = this.getEventDate(evt.start);
    const endDate = this.getEventDate(evt.end);
    return startDate && endDate ? this.getDayDiff(startDate, endDate) : 0;
  },

  getDaysFromToday(evt, startDate) {
    const date = this.getEventDate(evt.start);
    return date ? this.getDayDiff(startDate, date) : 0;
  },

  getMonthBeginningFromToday() {
    const daysToMonth = [];
    const numberOfDays = this.getNumberOfDays();
    const now = this.startDate;
    const nextMonth = new Date(now);
    nextMonth.setDate(1);
    daysToMonth.push({
      days: 0,
      label: nextMonth.toLocaleString('en-us', {month: 'long'}),
    });
    for (let index = 0; index < 12; index++) {
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const daysFromToday = this.getDayDiff(now, nextMonth);
      if (daysFromToday <= numberOfDays) {
        daysToMonth.push({
          days: daysFromToday,
          label: nextMonth.toLocaleString('en-us', {month: 'long'}),
        });
      }
    }
    return daysToMonth;
  },

  startDate: null,
  endDate: null,

  renderTimeline() {
    const events = this.state.events;
    const eventsView = [];
    if (events) {
      for (let index = 0; index < events.length; index++) {
        eventsView.push(<div
          key={index}
          style={this.getEventStyles(this.getEventDays(events[index]), this.getDaysFromToday(events[index], this.startDate), '#27C2FD')}
          title={this.getEventTitle(events[index])} />);
      }
    }
    return eventsView;
  },

  renderTimelineMonths() {
    const months = [];
    const daysToMonth = this.getMonthBeginningFromToday();
    let styles;
    for (let index = 0; index < daysToMonth.length; index++) {
      styles = this.getEventStyles(0, daysToMonth[index].days, 'rgb(218, 222, 232)');
      styles.zIndex = '10';
      months.push(<div
        key={index}
        title={daysToMonth[index].label}
        style={styles} />);
    }
    return months;
  },

  renderTimelineToday() {
    let styles;
    styles = this.getEventStyles(0, new Date().getDate() - 1, 'rgb(243, 164, 164)');
    styles.zIndex = '100';
    return (<div
      title="Today"
      style={styles} />);
  },

  render() {
    if (this.state.events) {
      this.props.onLoaded(this.state.events);
    }
    return (
      <div
        className={this.state.events ? '' : 'loading'}
        style={this.getStyles()}>
        {this.renderTimelineMonths()}
        {this.renderTimelineToday()}
        {this.renderTimeline()}
      </div>
    );
  },
});

module.exports = EventView;

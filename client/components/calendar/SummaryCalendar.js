const React = require('react/addons');
const { Paper } = require('material-ui');
const CalendarTitle = require('./CalendarTitle');
const CalendarSummary = require('./CalendarSummary');

const SummaryCalendar = React.createClass({
  propTypes: {
    calendarData: React.PropTypes.object,
  },

  render() {
    const paperStyleOverride = {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '5px',
    };
    const title = `${this.props.calendarData.month} ${this.props.calendarData.year}`;
    const bFalse = false;
    const bTrue = true;

    return (<Paper zDepth={5} rounded={bTrue} style={paperStyleOverride}>
      <CalendarTitle title={title} showTitle={bFalse}/>
      <CalendarSummary
        employeesOff={this.props.calendarData.employeesOff}
        daysOff={this.props.calendarData.daysOff}
        hoursOff={this.props.calendarData.hoursOff}
      />
    </Paper>);
  },
});

module.exports = SummaryCalendar;

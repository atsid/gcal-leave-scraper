const React = require('react/addons');
const SummaryCalendar = require('./SummaryCalendar');

const Calendar = React.createClass({
  propTypes: {
    displayMode: React.PropTypes.oneOf(['summary']),
    calendar: React.PropTypes.object,
  },

  render() {
    let result;
    if (this.props.displayMode === 'summary') {
      // result = (<div>testing summary</div>);
      result = (<SummaryCalendar calendarData={this.props.calendar}/>);
    } else {
      result = (<div>no mode selected</div>);
    }

    return result;
  },
});

module.exports = Calendar;

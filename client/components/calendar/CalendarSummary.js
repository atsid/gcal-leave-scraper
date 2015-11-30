const React = require('react/addons');
const classNames = require('classnames');

const CalendarSummary = React.createClass({
  propTypes: {
    employeesOff: React.PropTypes.number,
    daysOff: React.PropTypes.number,
    hoursOff: React.PropTypes.number,
  },

  render() {
    const calendarContentClass = classNames('calendar-summary-content', 'calendar-content');
    const calendarRowHeadingClass = classNames('calendar-summary-title');
    const calendarDataClass = classNames('calendar-data');

    return (
      <table className={calendarContentClass}>
        <tr>
          <td className={calendarRowHeadingClass}>Employees Out:</td>
          <td className={calendarDataClass}>{this.props.employeesOff}</td>
        </tr>
        <tr>
          <td className={calendarRowHeadingClass}>Man Days Off:</td>
          <td className={calendarDataClass}>{this.props.daysOff}</td>
        </tr>
        <tr>
          <td className={calendarRowHeadingClass}>Total Man Hours:</td>
          <td className={calendarDataClass}>{this.props.hoursOff}</td>
        </tr>
      </table>);
  },
});

module.exports = CalendarSummary;

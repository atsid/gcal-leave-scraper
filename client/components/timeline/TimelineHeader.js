const React = require('react');

const TimelineHeader = React.createClass({
  // TODO: Should be based on date filter, so it doesn't have to be just one year
  getNumberOfDays() {
    const now = new Date();
    const yearDate = new Date(now.getTime());
    yearDate.setFullYear(yearDate.getFullYear() + 1);
    return this.getDayDiff(now, yearDate);
  },

  getEventStyles(days, daysFromToday) {
    return {
      height: '100%',
      backgroundColor: 'inherit',
      display: 'inline-block',
      position: 'absolute',
      top: '0px',
      bottom: '0px',
      paddingLeft: '5px',
      left: (daysFromToday / this.getNumberOfDays() * 100) + '%',
    };
  },

  getStyles() {
    return {
      left: '200px',
      height: '100%',
      position: 'absolute',
      right: '0px',
    };
  },

  getDateString(evtDate) {
    return evtDate && (evtDate.date || evtDate.dateTime);
  },

  getEventDate(evtDate) {
    const strStartDate = this.getDateString(evtDate);
    return strStartDate && new Date(strStartDate);
  },

  getDayDiff(start, end) {
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  },

  getMonthBeginningFromToday() {
    const daysToMonth = [];
    const numberOfDays = this.getNumberOfDays();
    const now = new Date();
    const nextMonth = new Date(now);
    nextMonth.setDate(1);
    daysToMonth.push({
      days: 0,
      label: nextMonth.toLocaleString('en-us', {month: 'short'}),
    });
    for (let index = 0; index < 12; index++) {
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const daysFromToday = this.getDayDiff(now, nextMonth);
      if (daysFromToday <= numberOfDays) {
        daysToMonth.push({
          days: daysFromToday,
          label: nextMonth.toLocaleString('en-us', {month: 'short'}),
        });
      }
    }
    return daysToMonth;
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
        style={styles}>
        {daysToMonth[index].label}
      </div>
      );
    }
    return months;
  },

  render() {
    return (
      <div
        style={{height: '16px', width: '100%', position: 'relative', color: '#999'}}>
        <div
          style={this.getStyles()}>
          {this.renderTimelineMonths()}
        </div>
      </div>
    );
  },
});

module.exports = TimelineHeader;

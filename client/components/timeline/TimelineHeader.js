const React = require('react');
const mui = require('material-ui');
const CircularProgress = mui.CircularProgress;

const TimelineHeader = React.createClass({
  propTypes: {
    spinner: React.PropTypes.bool,
    range: React.PropTypes.object,
  },

  getNumberOfDays() {
    return this.getDayDiff(this.startDate, this.endDate);
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
      display: 'inline-block',
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
    const now = this.startDate;
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

  startDate: null,
  endDate: null,

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

  renderLoader() {
    return this.props.spinner ? (
      <CircularProgress
        className="headerSpinner"
        mode="indeterminate"
        size={0.3} />
    ) : (<span/>);
  },

  render() {
    this.startDate = this.props.range.getStartDate();
    this.endDate = this.props.range.getEndDate(this.startDate);
    return (
      <div
        style={{height: '16px', width: '100%', position: 'relative', color: '#999'}}>
        {this.renderLoader()}
        <div
          style={this.getStyles()}>
          {this.renderTimelineMonths()}
        </div>
      </div>
    );
  },
});

module.exports = TimelineHeader;

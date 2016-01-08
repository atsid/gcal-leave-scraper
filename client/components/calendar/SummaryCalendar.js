const React = require('react');
const { Paper } = require('material-ui');
const Calendar = require('react-calendar-render').Calendar;
const ReactGridLayout = require('react-grid-layout');
const moment = require('moment');
const bFalse = false;
const bTrue = true;
const paperStyleOverride = {
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '5px',
};

class SummaryCalendar extends React.Component {

  renderMonth(month) {
    return (<Paper zDepth={5} rounded={bTrue} style={paperStyleOverride}>
      <Calendar month={month.clone()} showHeaderNav={bFalse} showWeekHeader={bFalse}/>
    </Paper>);
  }

  render() {
    return (<ReactGridLayout className="fy-calendars" isDraggable={bFalse} isResizable={bFalse} items={12} cols={4}
                             verticalCompact={bFalse}>
      <div className="fy-calendar-cell" key={1}
           _grid={{x: 0, y: 0, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth)}</div>
      <div className="fy-calendar-cell" key={2}
           _grid={{x: 1, y: 0, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(1, 'months'))}</div>
      <div className="fy-calendar-cell" key={3}
           _grid={{x: 2, y: 0, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(2, 'months'))}</div>
      <div className="fy-calendar-cell" key={4}
           _grid={{x: 3, y: 0, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(3, 'months'))}</div>
      <div className="fy-calendar-cell" key={5}
           _grid={{x: 0, y: 1, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(4, 'months'))}</div>
      <div className="fy-calendar-cell" key={6}
           _grid={{x: 1, y: 1, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(5, 'months'))}</div>
      <div className="fy-calendar-cell" key={7}
           _grid={{x: 2, y: 1, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(6, 'months'))}</div>
      <div className="fy-calendar-cell" key={8}
           _grid={{x: 3, y: 1, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(7, 'months'))}</div>
      <div className="fy-calendar-cell" key={9}
           _grid={{x: 0, y: 2, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(8, 'months'))}</div>
      <div className="fy-calendar-cell" key={10}
           _grid={{x: 1, y: 2, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(9, 'months'))}</div>
      <div className="fy-calendar-cell" key={11}
           _grid={{x: 2, y: 2, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(10, 'months'))}</div>
      <div className="fy-calendar-cell" key={12}
           _grid={{x: 3, y: 2, w: 1, h: 1}}>{this.renderMonth(this.props.startMonth.clone().add(11, 'months'))}</div>
    </ReactGridLayout>);
  }
}

SummaryCalendar.propTypes = {
  startMonth: React.PropTypes.object,
};

SummaryCalendar.defaultProps = {
  startMonth: moment(),
};

module.exports = SummaryCalendar;

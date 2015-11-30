const React = require('react/addons');
const Calendar = require('./calendar/Calendar');
const ReactGridLayout = require('react-grid-layout');

// Components
const TestPage = React.createClass({
  contextTypes: {},

  getDefaultProps() {
    return {
      className: 'layout',
      isDraggable: false,
      isResizable: false,
      autoSize: true,
      items: 12,
      cols: 4,
      verticalCompact: false,
    };
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  render() {
    const calendarData = [{}, {
      month: 'October',
      year: '2015',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'November',
      year: '2015',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'December',
      year: '2015',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'January',
      year: '2016',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'February',
      year: '2016',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'March',
      year: '2016',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'April',
      year: '2016',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'May',
      year: '2016',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'June',
      year: '2016',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'July',
      year: '2016',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'August',
      year: '2016',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }, {
      month: 'September',
      year: '2016',
      employeesOff: 5,
      daysOff: 15,
      hoursOff: 120,
    }];
    const bFalse = false;
    const bTrue = false;

    return (
      <ReactGridLayout className="fy-calendars" isDraggable={bTrue} isResizable={bFalse} items={12} cols={12}
                       verticalCompact={false}>
        <div className="fy-calendar-cell" key={1} _grid={{x: 0, y: 0, w: 1, h: 1}}><Calendar
          displayMode="summary"
          calendar={calendarData[1]}/>
        </div>
        <div className="fy-calendar-cell" key={2} _grid={{x: 1, y: 0, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                             calendar={calendarData[2]}/>
        </div>
        <div className="fy-calendar-cell" key={3} _grid={{x: 2, y: 0, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                             calendar={calendarData[3]}/>
        </div>
        <div className="fy-calendar-cell" key={4} _grid={{x: 3, y: 0, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                             calendar={calendarData[4]}/>
        </div>
        <div className="fy-calendar-cell" key={5} _grid={{x: 0, y: 1, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                             calendar={calendarData[5]}/>
        </div>
        <div className="fy-calendar-cell" key={6} _grid={{x: 1, y: 1, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                             calendar={calendarData[6]}/>
        </div>
        <div className="fy-calendar-cell" key={7} _grid={{x: 2, y: 1, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                             calendar={calendarData[7]}/>
        </div>
        <div className="fy-calendar-cell" key={8} _grid={{x: 3, y: 1, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                             calendar={calendarData[8]}/>
        </div>
        <div className="fy-calendar-cell" key={9} _grid={{x: 0, y: 2, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                             calendar={calendarData[9]}/>
        </div>
        <div className="fy-calendar-cell" key={10} _grid={{x: 1, y: 2, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                              calendar={calendarData[10]}/>
        </div>
        <div className="fy-calendar-cell" key={11} _grid={{x: 2, y: 2, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                              calendar={calendarData[11]}/>
        </div>
        <div className="fy-calendar-cell" key={12} _grid={{x: 3, y: 2, w: 1, h: 1}}><Calendar displayMode="summary"
                                                                                              calendar={calendarData[12]}/>
        </div>
      </ReactGridLayout>
    );
  },
});

module.exports = TestPage;

const React = require('react/addons');
const SummaryCalendar = require('./calendar/SummaryCalendar');

// Components
class TestPage extends React.Component {
  render() {
    return (
      <SummaryCalendar />
    );
  }
}

module.exports = TestPage;

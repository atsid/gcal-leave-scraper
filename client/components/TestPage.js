const React = require('react');
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

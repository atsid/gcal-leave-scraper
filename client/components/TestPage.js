const React = require('react/addons');

// Components
const TestPage = React.createClass({
  contextTypes: {},

  getInitialState() {
    return {};
  },

  componentDidMount() {
    this.getStateFromStore();
  },


  render() {
    return (<h1>Test Page!</h1>);
  },
});

module.exports = TestPage;

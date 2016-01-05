const React = require('react');

const NoMatch = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return (<h1>No such page!</h1>);
  },
});

module.exports = NoMatch;

const React = require('react');

const mui = require('material-ui');
const Paper = mui.Paper;

const TimelineView = React.createClass({
  getInitialState() {
    return {};
  },

  getStyles() {
    return {
      width: '300px',
      height: '150px',
      padding: '20px',
      margin: 'auto',
    };
  },

  render() {
    return (
      <Paper
        zDepth={1}
        rounded={false}
        style={this.getStyles()}>
        <h1>Hello World</h1>
      </Paper>
    );
  },
});

module.exports = TimelineView;

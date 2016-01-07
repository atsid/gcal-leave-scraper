const React = require('react');

const mui = require('material-ui');
const Paper = mui.Paper;

const Login = React.createClass({
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
        <p>You must first <a href="/api/auth/google">Login</a>.</p>
      </Paper>
    );
  },
});

module.exports = Login;

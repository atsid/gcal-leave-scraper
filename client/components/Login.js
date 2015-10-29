const React = require('react/addons');

const Login = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return (<a href="/api/auth/google">Login with Google</a>);
  },
});

module.exports = Login;

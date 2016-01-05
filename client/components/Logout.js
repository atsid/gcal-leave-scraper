const React = require('react');
const request = require('superagent-bluebird-promise');
const ReactRedirect = require('react-redirect');
const Logout = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    request.del('/api/auth/current')
      .then(() => {
        this.setState({loggedOut: true});
      })
      .catch((err) => {
        this.setState({
          logoutErr: err,
        });
      });
  },

  render() {
    let result;
    if (this.state.logoutErr) {
      result = (<h1>Could not log out!</h1>);
    } else if (this.state.loggedOut) {
      result = (<ReactRedirect location="/"/>);
    } else {
      result = (<h1>Ooops</h1>);
    }

    return result;
  },
});

module.exports = Logout;

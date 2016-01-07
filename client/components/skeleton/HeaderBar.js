const React = require('react');

// Components
const mui = require('material-ui');
const AppBar = mui.AppBar;
const FlatButton = mui.FlatButton;

const HeaderBar = React.createClass({

  // Properties

  propTypes: {
    user: React.PropTypes.object,
    appBarTitle: React.PropTypes.string,
    onLeftTouchTap: React.PropTypes.func,
    onRightTouchTap: React.PropTypes.func,
  },

  // Getters

  getAppBarRightLabel() {
    const user = this.props.user;
    return user ? `${user.firstName} ${user.lastName}` : <span onTouchTap={this.handleOnRightTouchTap}>Login</span>;
  },

  getAppBarStyles() {
    return {
      flex: '0.1 99 auto',
    };
  },

  // Handlers

  handleOnLeftTouchTap() {
    this.props.onLeftTouchTap();
  },

  handleOnRightTouchTap() {
    this.props.onRightTouchTap();
  },

  // Renders

  render() {
    return (
      <header>
        <AppBar
          title={this.props.appBarTitle}
          onLeftIconButtonTouchTap={this.handleOnLeftTouchTap}
          iconElementRight={<FlatButton label={this.getAppBarRightLabel()} />}
          style={this.getAppBarStyles()}/>
      </header>
    );
  },
});

module.exports = HeaderBar;

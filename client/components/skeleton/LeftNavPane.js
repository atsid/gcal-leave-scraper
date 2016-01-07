const React = require('react');

// Components
const mui = require('material-ui');
const LeftNav = mui.LeftNav;
const MenuItem = mui.MenuItem;

const LeftNavPane = React.createClass({

  // Properties

  propTypes: {
    user: React.PropTypes.object,
    onNavChange: React.PropTypes.func,
  },

  // Getters

  getDefaultProps() {
    return {user: null};
  },

  getInitialState() {
    return {open: false};
  },

  // Handlers

  handleNavClick(url) {
    this.props.onNavChange(url);
  },

  toggle() {
    this.setState({open: !this.state.open});
  },

  // Renders

  renderLeftNavBarMenuItems() {
    return [
      <MenuItem
        key="0"
        primaryText="Home"
        onTouchTap={this.handleNavClick.bind(this, '/')}/>,
      <MenuItem
        key="1"
        primaryText={this.props.user ? 'Logout' : 'Login'}
        onTouchTap={this.handleNavClick.bind(this, this.props.user ? '/logout' : '/login')} />,
    ];
  },

  render() {
    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        open={this.state.open}
        onRequestChange={open => this.setState({open})}>
        {this.renderLeftNavBarMenuItems()}
      </LeftNav>
    );
  },
});

module.exports = LeftNavPane;

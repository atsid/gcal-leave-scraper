const debug = require('debug')('app:components:application');
const React = require('react');
const classNames = require('classnames');

// Components
const mui = require('material-ui');
const HeaderBar = require('./HeaderBar');
const LeftNav = mui.LeftNav;
const Menu = mui.Menu;
const MenuItem = mui.MenuItem;
const Router = require('react-router');

const Skeleton = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    appBarTitle: React.PropTypes.string,
    route: React.PropTypes.object,
  },

  contextTypes: {
    history: Router.PropTypes.history.isRequired,
    stores: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {loading: true, open: false, user: null};
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  onLeftNavChange(event, key, payload) {
    // Do DOM Diff refresh
    this.context.history.pushState(null, payload.route);
  },

  getStateFromStore() {
    this.state = {projects: [], open: this.state.open, loading: true};
    return this.context.stores.users.getCurrentUser()
      .then((user) => this.setState({user, open: this.state.open, loading: false}))
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({open: this.state.open, loading: false});
      });
  },

  handleToggle() {
    this.setState({loading: this.state.loading, open: !this.state.open, user: this.state.user});
  },

  // TODO: Placeholder
  handleLogin() {
    console.warn("Not yet implemented");
  },

  handleNavClick(url) {
    window.location = url;
  },

  // Render menu items displayed in the left navigation pane
  renderLeftNavBarMenuItems() {
    return (
      <Menu>
        <MenuItem
          primaryText="Home"
          onTouchTap={this.handleNavClick.bind(this, '/')}/>
        <MenuItem
          primaryText={this.state.user ? 'Logout' : 'Login'}
          onTouchTap={this.handleNavClick.bind(this, this.state.user ? '/logout' : '/login')}/>
      </Menu>
    );
  },

  renderLeftNav() {
    return (
      <LeftNav
        ref="leftNav"
        docked={false}
        open={this.state.open}>
        {this.renderLeftNavBarMenuItems()}
      </LeftNav>
    );
  },

  renderContent() {
    return (
      <section className="content">
        {this.props.children}
      </section>
    );
  },

  renderHeader() {
    return (
      <HeaderBar
        user={this.state.user}
        appBarTitle={this.props.route.appBarTitle}
        onLeftTouchTap={this.handleToggle}
        onRightTouchTap={this.handleLogin} />
    );
  },

  render() {
    const wrapperClass = classNames('content-wrapper');
    return (
      <div className={wrapperClass}>
        {this.renderLeftNav()}
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  },
});

module.exports = Skeleton;

const debug = require('debug')('app:components:application');
const React = require('react');
const classNames = require('classnames');

// Components
const mui = require('material-ui');
const AppBar = mui.AppBar;
const LeftNav = mui.LeftNav;
const Menu = mui.Menu;
const MenuItem = mui.MenuItem;
const FlatButton = mui.FlatButton;
const Router = require('react-router');

const Skeleton = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
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

  renderHeader() {
    const user = this.state.user;
    const appBarRightLabel = user ? `${user.firstName} ${user.lastName}` : 'Login';
    const minimumHeight = {
      flex: '0.1 99 auto',
    };
    return (
      <header>
        <AppBar
          title="testing"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={<FlatButton label={appBarRightLabel} />}
          style={minimumHeight}/>
      </header>
    );
  },

  renderContent() {
    return (
      <section className="content">
        {this.props.children}
      </section>
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

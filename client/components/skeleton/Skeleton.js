const debug = require('debug')('app:components:application');
const React = require('react');
const classNames = require('classnames');

// Components
const HeaderBar = require('./HeaderBar');
const LeftNavPane = require('./LeftNavPane');

const Skeleton = React.createClass({

  // Properties

  propTypes: {
    children: React.PropTypes.node,
    appBarTitle: React.PropTypes.string,
    route: React.PropTypes.object,
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    stores: React.PropTypes.object.isRequired,
  },

  // Getters

  getInitialState() {
    return {loading: true, user: null};
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  getStateFromStore() {
    this.state = {projects: [], loading: true};
    return this.context.stores.users.getCurrentUser()
      .then((user) => this.setState({user, loading: false}))
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false});
      });
  },

  // Handlers

  handleLogin() {
    this.pageNavigation(this.loginPath);
  },

  handleNavChange(url) {
    this.pageNavigation(url);
    this.toggleLeftNav();
  },

  handleLeftNavToggle() {
    this.toggleLeftNav();
  },

  // Functions

  pageNavigation(url) {
    // TODO: Find out reason behind push not working with the login path
    if (url === this.loginPath) {
      window.location = url;
    } else {
      this.context.router.push({pathname: url});
    }
  },

  toggleLeftNav() {
    this.refs.leftNav.toggle();
  },

  // Class Properties

  loginPath: '/api/auth/google',

  // Renderers

  renderLeftNav() {
    return (
      <LeftNavPane
        ref="leftNav"
        user={this.state.user}
        onNavChange={this.handleNavChange} />
    );
  },

  renderContent() {
    return (
      <section>
        {this.props.children}
      </section>
    );
  },

  renderHeader() {
    return (
      <HeaderBar
        user={this.state.user}
        appBarTitle={this.props.route.appBarTitle}
        onLeftTouchTap={this.handleLeftNavToggle}
        onRightTouchTap={this.handleLogin} />
    );
  },

  render() {
    return (
      <div className={classNames('content-wrapper')}>
        {this.renderLeftNav()}
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  },
});

module.exports = Skeleton;

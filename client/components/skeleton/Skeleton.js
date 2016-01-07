const debug = require('debug')('app:components:application');
const React = require('react');
const classNames = require('classnames');

// Components
const HeaderBar = require('./HeaderBar');
const LeftNavPane = require('./LeftNavPane');
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
    return {loading: true, user: null};
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  onLeftNavChange(event, key, payload) {
    // Do DOM Diff refresh
    this.context.history.pushState(null, payload.route);
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

  // TODO: Placeholder
  handleLogin() {
    console.warn('Not yet implemented');
  },

  // TODO: Placeholder
  handleNavChange(url) {
    console.warn('Not yet implemented', url);
  },

  handleLeftNavToggle() {
    this.refs.leftNav.toggle();
  },

  // TODO: Placeholder
  handleContentChange() {
    console.warn('Not yet implemented');
  },

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
        onLeftTouchTap={this.handleLeftNavToggle}
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

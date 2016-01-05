const debug = require('debug')('app:components:application');
const React = require('react');
const classNames = require('classnames');

// Components
const mui = require('material-ui');
const AppBar = mui.AppBar;
const LeftNav = mui.LeftNav;
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
    return {loading: true, user: null};
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  onLeftNavToggle() {
    return this.refs.leftNav.toggle();
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

  render() {
    const menuItems = [
      {route: '/', text: 'Home'},
    ];

    if (this.state.user) {
      menuItems.push({route: '/logout', text: 'Logout'});
    } else {
      menuItems.push({route: '/login', text: 'Login'});
    }

    const user = this.state.user;
    const appBarRightLabel = user ? `${user.firstName} ${user.lastName}` : 'Login';
    const minimumHeight = {
      flex: '0.1 99 auto',
    };
    const wrapperClass = classNames('content-wrapper');

    return (
      <div className={wrapperClass}>
        <LeftNav
          ref="leftNav"
          menuItems={menuItems}
          docked={false}
          onChange={this.onLeftNavChange}/>

        <header>
          <AppBar
            title="testing"
            onLeftIconButtonTouchTap={this.onLeftNavToggle}
            iconElementRight={<FlatButton label={appBarRightLabel} />}
            style={minimumHeight}/>
        </header>

        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  },
});

module.exports = Skeleton;

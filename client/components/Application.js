const React = require('react');

// Router Components
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;

// Application Components
const NoMatch = require('./NoMatch');
const Login = require('./Login');
const Skeleton = require('./skeleton/Skeleton');
const Dashboard = require('./Dashboard');
const TimelineView = require('./timeline/TimelineView');
const Logout = require('./Logout');

// MUI
const mui = require('material-ui');
const ThemeManager = mui.Styles.ThemeManager;
// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const browserHistory = ReactRouter.browserHistory;
const Application = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
    stores: React.PropTypes.object.isRequired,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(),
      stores: require('./../stores'),
    };
  },

  appBarTitle: document.title,

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Skeleton} appBarTitle={this.appBarTitle}>
          <IndexRoute component={Dashboard}/>
          <Route path="login" component={Login}/>
          <Route path="test" component={TimelineView}/>
          <Route path="logout" component={Logout}/>
          <Route path="*" component={NoMatch}/>
        </Route>
      </Router>
    );
  },
});
module.exports = Application;

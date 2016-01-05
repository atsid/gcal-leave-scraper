const React = require('react/addons');

// Router Components
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;

// Application Components
const NoMatch = require('./NoMatch');
const Login = require('./Login');
const Skeleton = require('./Skeleton');
const Dashboard = require('./Dashboard');
const TestPage = require('./TestPage');
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

const createBrowserHistory = require('history/lib/createBrowserHistory');
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

  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Route path="/" component={Skeleton}>
          <IndexRoute component={Dashboard}/>
          <Route path="login" component={Login}/>
          <Route path="test" component={TestPage}/>
          <Route path="logout" component={Logout}/>
          <Route path="*" component={NoMatch}/>
        </Route>
      </Router>
    );
  },
});
module.exports = Application;

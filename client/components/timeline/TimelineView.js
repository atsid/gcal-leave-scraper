const debug = require('debug')('app:components:application');
const React = require('react');

const TimelineHeader = require('./TimelineHeader');
const Heatmap = require('./Heatmap');
const ContactView = require('./ContactView');
const TimelineToolbar = require('./TimelineToolbar');
const mui = require('material-ui');
const Paper = mui.Paper;

const TimelineView = React.createClass({
  contextTypes: {
    stores: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      contacts: null,
      spinner: true,
    };
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  getStateFromStore() {
    this.state = {projects: [], loading: true, spinner: this.state.spinner};
    return this.context.stores.contacts.getContacts({})
      .then((contacts) => this.setState({contacts, loading: false, spinner: this.state.spinner}))
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false, spinner: this.state.spinner});
      });
  },

  getStyles() {
    return {
      padding: '20px',
      margin: '10px',
      boxSizing: 'border-box',
      border: 'none',
    };
  },

  events: [],
  contactsLoaded: 0,

  handleLoaded(events) {
    this.contactsLoaded++;
    this.events = this.events.concat(events);
    if (this.contactsLoaded >= this.state.contacts.users.length) {
      this.timelineHeaderSpinner(false);
    }
  },

  timelineHeaderSpinner(isSpinner) {
    if (this.state.spinner !== isSpinner) {
      this.setState({contacts: this.state.contacts, spinner: isSpinner});
    }
  },

  renderHeader() {
    return (
        <TimelineHeader
          spinner={this.state.spinner} />
    );
  },

  renderContacts() {
    const contacts = this.state.contacts && this.state.contacts.users;
    const contactsView = [];
    if (contacts) {
      for (let index = 0; index < contacts.length; index++) {
        contactsView.push(
          <ContactView
            key={index}
            onLoaded={this.handleLoaded}
            contact={contacts[index]} />
        );
      }
    }
    return contactsView;
  },

  renderHeatMap() {
    return this.events.length > 0 ? (<Heatmap events={this.events} />) : (<span/>);
  },

  renderToolbar() {
    return (<TimelineToolbar />);
  },

  renderBody() {
    return (
      <Paper
        zDepth={1}
        rounded={false}
        style={this.getStyles()}>
        {this.renderHeader()}
        {this.renderHeatMap()}
        {this.renderContacts()}
      </Paper>
    );
  },

  render() {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderBody()}
      </div>
    );
  },
});

module.exports = TimelineView;

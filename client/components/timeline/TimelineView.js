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

  getStateFromStore(groupId, category) {
    console.log(category + ' groupId: ', groupId);
    if (!this.state.loading) {
      this.state = {projects: [], loading: true, spinner: true};
      this.clearData();
      return this.context.stores.groups.getGroupContacts(groupId)
        .then((contacts) => {
          this.setState({contacts: contacts, loading: false, spinner: this.state.spinner});
        })
        .catch((err) => {
          debug('error loading store data', err);
          this.setState({loading: false, spinner: this.state.spinner});
        });
    }
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

  clearData() {
    this.events = [];
    this.contactsLoaded = 0;
  },

  isHeatMapLoaded() {
    return this.contactsLoaded >= this.state.contacts.length;
  },

  handleLoaded(events) {
    this.contactsLoaded++;
    this.events = this.events.concat(events);
    if (this.isHeatMapLoaded()) {
      this.timelineHeaderSpinner(false);
    }
  },

  timelineHeaderSpinner(isSpinner) {
    if (this.state.spinner !== isSpinner) {
      this.setState({contacts: this.state.contacts, spinner: isSpinner});
    }
  },

  renderHeader() {
    return (<TimelineHeader spinner={this.state.spinner} />);
  },

  renderContacts() {
    const contactsView = [];
    if (this.state.contacts) {
      for (let index = 0; index < this.state.contacts.length; index++) {
        contactsView.push(
          <ContactView
            key={index}
            onLoaded={this.handleLoaded}
            contact={this.state.contacts[index]} />
        );
      }
    }
    return contactsView;
  },

  renderHeatMap() {
    return this.isHeatMapLoaded() ? (<Heatmap events={this.events} />) : (<span/>);
  },

  renderToolbar() {
    return (
      <TimelineToolbar
        onToolbarChange={this.getStateFromStore} />
    );
  },

  renderBody() {
    return this.state.contacts ? (
      <Paper
        zDepth={1}
        rounded={false}
        style={this.getStyles()}>
        {this.renderHeader()}
        {this.renderHeatMap()}
        {this.renderContacts()}
      </Paper>
    ) : (<span/>);
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

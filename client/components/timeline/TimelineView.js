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
      filter: null,
      spinner: true,
    };
  },

  onToolbarStateChange(id, category, selected) {
    if (category === 'groups') {
      this.getContactsFromStore(id);
    } else if (category === 'filters') {
      this.clearData();
      this.setState({filter: selected.value, contacts: this.state.contacts, spinner: this.isSpinner()});
    }
  },

  getContactsFromStore(groupId) {
    const _this = this;
    if (!this.state.loading) {
      this.state = {filter: _this.state.filter, projects: [], loading: true, spinner: true};
      this.clearData();
      return this.context.stores.groups.getGroupContacts(groupId)
        .then((contacts) => {
          _this.setState({filter: _this.state.filter, contacts: contacts, loading: false, spinner: _this.isSpinner()});
        })
        .catch((err) => {
          debug('error loading store data', err);
          _this.setState({filter: _this.state.filter, loading: false, spinner: _this.isSpinner()});
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
    return this.state && this.state.contacts && (this.contactsLoaded >= this.state.contacts.length);
  },

  isSpinner() {
    return !this.isHeatMapLoaded();
  },

  handleLoaded(events) {
    this.contactsLoaded++;
    this.events = this.events.concat(events);
    this.timelineHeaderSpinner(this.isSpinner());
  },

  timelineHeaderSpinner(isSpinner) {
    if (this.state.spinner !== isSpinner) {
      this.setState({contacts: this.state.contacts, filter: this.state.filter, spinner: isSpinner});
    }
  },

  // Render header containers wait spinner and time lables
  renderHeader() {
    return (<TimelineHeader spinner={this.state.spinner} />);
  },

  // Render a single content along with its timeline
  renderContact(contactIndex) {
    return (
      <ContactView
        key={contactIndex}
        onLoaded={this.handleLoaded}
        filter={this.state.filter}
        contact={this.state.contacts[contactIndex]} />
    );
  },

  // Render all contacts with timelines
  renderContacts() {
    const contactsView = [];
    for (let index = 0; index < this.state.contacts.length; index++) {
      contactsView.push(this.renderContact(index));
    }
    return contactsView;
  },

  // When all events have came back for all contents, render heatmap
  renderHeatMap() {
    return this.isHeatMapLoaded() ? (<Heatmap events={this.events} />) : (<span/>);
  },

  // Render toolbar which sets the group and filter for loading content
  renderToolbar() {
    return (
      <TimelineToolbar
        onToolbarChange={this.onToolbarStateChange} />
    );
  },

  // Render contents when contacts and filter have been loaded
  renderBody() {
    return !!(this.state && this.state.contacts && this.state.filter) ? (
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

  // Render container
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

const debug = require('debug')('app:components:application');
const React = require('react');

const TimelineHeader = require('./TimelineHeader');
const ContactView = require('./ContactView');
const mui = require('material-ui');
const Paper = mui.Paper;

const TimelineView = React.createClass({
  contextTypes: {
    stores: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      contacts: null,
    };
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  getStateFromStore() {
    this.state = {projects: [], loading: true};
    return this.context.stores.contacts.getContacts({})
      .then((contacts) => this.setState({contacts, loading: false}))
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false});
      });
  },

  getStyles() {
    return {
      padding: '20px',
      margin: 'auto',
      width: '100%',
      boxSizing: 'border-box',
      border: 'none',
    };
  },

  renderHeader() {
    return (
        <TimelineHeader />
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
            contact={contacts[index]} />
        );
      }
    }
    return contactsView;
  },

  render() {
    return (
      <Paper
        zDepth={1}
        rounded={false}
        style={this.getStyles()}>
        {this.renderHeader()}
        {this.renderContacts()}
      </Paper>
    );
  },
});

module.exports = TimelineView;

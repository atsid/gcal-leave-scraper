const debug = require('debug')('app:components:application');
const React = require('react');

const mui = require('material-ui');
const Paper = mui.Paper;

const TimelineView = React.createClass({
  contextTypes: {
    stores: React.PropTypes.object.isRequired,
  },

  // TODO: Add user to params
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
    // TODO: Pass user
    return this.context.stores.contacts.getContacts({})
      .then((contacts) => this.setState({contacts, loading: false}))
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false});
      });
  },

  getStyles() {
    return {
      width: '500px',
      height: '150px',
      padding: '20px',
      margin: 'auto',
    };
  },

  renderContacts() {
    const contacts = this.state.contacts && this.state.contacts.contacts;
    const contactsView = [];
    if (contacts) {
      for (let index = 0; index < contacts.length; index++) {
        contactsView.push(<div
          key={index}>
          <div
            key={index + 'id'}
            style={{width: '100px', display: 'inline-block'}}
            className="id">
            {contacts[index].id}
          </div>
          <div
            key={index + 'first'}
            style={{width: '100px', display: 'inline-block'}}
            className="first">
            {contacts[index].first}
          </div>
          <div
            key={index + 'last'}
            style={{width: '100px', display: 'inline-block'}}
            className="last">
            {contacts[index].last}
          </div>
        </div>);
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
        {this.renderContacts()}
      </Paper>
    );
  },
});

module.exports = TimelineView;

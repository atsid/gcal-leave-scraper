const debug = require('debug')('app:components:application');
const React = require('react');

const Timeline = require('./Timeline');
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
    };
  },

  renderContacts() {
    const contacts = this.state.contacts && this.state.contacts.users;
    const contactsView = [];
    if (contacts) {
      for (let index = 0; index < contacts.length; index++) {
        contactsView.push(<div
          key={index}
          style={{position: 'relative', padding: '2px'}}>
          <img
            key={index + 'thumbnail'}
            src={contacts[index].thumbnailPhotoUrl}
            style={{width: '28px', height: '28px', borderRadius: '50%'}} />
          <div
            key={index + 'fullname'}
            style={{width: '250px', display: 'inline-block', padding: '3px', paddingTop: '6px', position: 'absolute'}}
            className="id">
            {contacts[index].name.fullName}
          </div>
          <Timeline
            calendarId={contacts[index].primaryEmail}/>
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

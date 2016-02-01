// const debug = require('debug')('app:components:application');
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

  // componentDidMount() {
  //   this.getStateFromStore();
  // },

  getContacts(groupId) {
    return groupId === 10 ? [
      {
        'id': '108036615849880164430',
        'primaryEmail': 'aaron.moore@atsid.com',
        'name': {
          'givenName': 'Aaron',
          'familyName': 'Moore',
          'fullName': 'Aaron Moore',
        },
        'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCM6whoOS8fLDbyILdmNhcmRfcGhvdG8qKDgzMjUzNzlhYmU3ZmRiNmNhODc1MDYzNWI2MDkyYTBmZmRiMzQxNDEwAcBA2oRrjU9ZvgSYJmUznLtXOQ-4',
      },
      {
        'id': '102751018610668611087',
        'primaryEmail': 'admin@atsid.com',
        'name': {
          'givenName': 'Admin',
          'familyName': 'Account',
          'fullName': 'Admin Account',
        },
        'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/private/AIbEiAIAAABDCI_MkJudm-WWJiILdmNhcmRfcGhvdG8qKDAxNmZiYzIyOWVhYWIyYTBlNTU5ZGM2ZTc4OTBlY2JkMmRmNzJkNWMwAYHY7aE68De_pHTPvWqyWqwSHKMs',
      },
      {
        'id': '112225305622175243715',
        'primaryEmail': 'brad.maupin@atsid.com',
        'name': {
          'givenName': 'Brad',
          'familyName': 'Maupin',
          'fullName': 'Brad Maupin',
        },
        'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/private/AIbEiAIAAABECMO73YKO1sDUqQEiC3ZjYXJkX3Bob3RvKihiZTBkOTNiZmU3OTdiMGViNDc5MWRiYmVjYzYwODM0M2Y4NThkZDBhMAHgRHDAb6wtMVHggooXa9zPQ5FSBg',
      },
      {
        'id': '103305584059832476184',
        'primaryEmail': 'damon.taylor@atsid.com',
        'name': {
          'givenName': 'Damon',
          'familyName': 'Taylor',
          'fullName': 'Damon Taylor',
        },
        'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCJjEiOyE5vLvLSILdmNhcmRfcGhvdG8qKGMwZGQ3ZWEzMmMwODk3MzRiNWMzNjBmZGNiMTkzNDZmZjkxNGY3YjYwAVxWRQxpP_dwiBJGpP8q17OvMLVk',
      },
      {
        'id': '104748686093421533812',
        'primaryEmail': 'heather.slusher@atsid.com',
        'name': {
          'givenName': 'Heather',
          'familyName': 'Slusher',
          'fullName': 'Heather Slusher',
        },
        'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCPS06aH6mq7zQSILdmNhcmRfcGhvdG8qKDc4OTU0MjM3ODgzODdiN2ViZDUxZTQzYzdkMjg1Njk2OTNiNDcwYzkwAVAeYp7WO4GmKKVDvlJYi8ztfuQ-',
      },
      {
        'id': '108143629428139580075',
        'primaryEmail': 'lacy.dove@atsid.com',
        'name': {
          'givenName': 'Lacy',
          'familyName': 'Dove',
          'fullName': 'Lacy Dove',
        },
        'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCKu1tfWW-v6BcSILdmNhcmRfcGhvdG8qKDBhNWMxN2M1NTMzNGM0OThmMzk0Zjk1MTQxYzUzNmI5OGFiOTQ5MGEwAUmD6088OzlmmTrc3KZ-nBBFloCg',
      },
    ] : [
      {
        'id': '108036615849880164430',
        'primaryEmail': 'aaron.moore@atsid.com',
        'name': {
          'givenName': 'Aaron',
          'familyName': 'Moore',
          'fullName': 'Aaron Moore',
        },
        'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCM6whoOS8fLDbyILdmNhcmRfcGhvdG8qKDgzMjUzNzlhYmU3ZmRiNmNhODc1MDYzNWI2MDkyYTBmZmRiMzQxNDEwAcBA2oRrjU9ZvgSYJmUznLtXOQ-4',
      },
      {
        'id': '108143629428139580075',
        'primaryEmail': 'lacy.dove@atsid.com',
        'name': {
          'givenName': 'Lacy',
          'familyName': 'Dove',
          'fullName': 'Lacy Dove',
        },
        'thumbnailPhotoUrl': 'https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCKu1tfWW-v6BcSILdmNhcmRfcGhvdG8qKDBhNWMxN2M1NTMzNGM0OThmMzk0Zjk1MTQxYzUzNmI5OGFiOTQ5MGEwAUmD6088OzlmmTrc3KZ-nBBFloCg',
      },
    ];
  },

  getStateFromStore(groupId, category) {
    // this.state = {projects: [], loading: true, spinner: this.state.spinner};
    // return this.context.stores.contacts.getContacts({})
    //   .then((contacts) => {
    //     this.setState({contacts: contacts.users, loading: false, spinner: this.state.spinner});
    //   })
    //   .catch((err) => {
    //     debug('error loading store data', err);
    //     this.setState({loading: false, spinner: this.state.spinner});
    //   });
    console.log('Update contacts ' + category + ': ', groupId);
    this.state = {projects: [], loading: true, spinner: this.state.spinner};
    this.events = [];
    this.contactsLoaded = 0;
    setTimeout(() => {
      this.setState({
        contacts: this.getContacts(groupId),
        loading: false,
        spinner: this.state.spinner,
      });
    }, 1000);
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

const debug = require('debug')('app:components:application');
const React = require('react');
const Timeline = require('./Timeline');
const Contact = require('./Contact');

const ContactView = React.createClass({
  propTypes: {
    contact: React.PropTypes.object,
  },

  contextTypes: {
    stores: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      calendars: null,
    };
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  getStateFromStore() {
    this.state = {projects: [], loading: true};
    return this.context.stores.calendars.getCalendars({})
      .then((calendars) => this.setState({calendars, loading: false}))
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false});
      });
  },

  getStyle() {
    return {
      position: 'relative',
      padding: '2px',
      backgroundColor: 'green',
    };
  },

  renderTimeline() {
    console.log('> Contactview :', this.state.calendars);
    if (!this.props.calendars) {
      return (<div/>);
    }
    return (
      <Timeline
        calendars={this.state.calendars.items}
        userId={this.props.contact.primaryEmail} />
    );
  },

  renderContact() {
    return (
        <Contact
          url={this.props.contact.thumbnailPhotoUrl}
          label={this.props.contact.name.fullName} />
    );
  },

  render() {
    return (
      <div
        style={this.getStyle()}>
        {this.renderContact()}
        {this.renderTimeline()}
      </div>
    );
  },
});

module.exports = ContactView;

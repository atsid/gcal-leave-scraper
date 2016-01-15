const debug = require('debug')('app:components:application');
const React = require('react');
const EventView = require('./EventView');

const Timeline = React.createClass({
  propTypes: {
    calendarId: React.PropTypes.string,
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

  getStyles() {
    return {
      padding: '20px',
      margin: 'auto',
    };
  },

  renderTimeline() {
    const calendars = this.state.calendars && this.state.calendars.items;
    const calendarsView = [];
    if (calendars) {
      calendarsView.push(<EventView
        key={this.props.calendarId}
        calendarId={this.props.calendarId} />);
      for (let index = 0; index < calendars.length; index++) {
        calendarsView.push(<div
          key={index}
          style={{position: 'relative', padding: '2px'}}>
          {calendars[index].summary}
          <span
           style={{paddingLeft: '25px'}}>
            {calendars[index].id}
          </span>
        </div>);
        calendarsView.push(<EventView
          key={index + 'events'}
          calendarId={calendars[index].id} />);
      }
    }
    return calendarsView;
  },

  render() {
    return (
      <div
        style={this.getStyles()}>
        {this.renderTimeline()}
      </div>
    );
  },
});

module.exports = Timeline;

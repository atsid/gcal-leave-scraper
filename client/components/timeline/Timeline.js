const debug = require('debug')('app:components:application');
const React = require('react');

const TimelineView = React.createClass({
  contextTypes: {
    stores: React.PropTypes.object.isRequired,
  },

  // TODO: Add user to params
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
      width: '500px',
      padding: '20px',
      margin: 'auto',
    };
  },

  renderTimeline() {
    const calendars = this.state.calendars.items;
    const calendarsView = [];
    if (calendars) {
      for (let index = 0; index < calendars.length; index++) {
        calendarsView.push(<div
          key={index}
          style={{position: 'relative', padding: '2px'}}>
          {calendars[index].summary}
        </div>);
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

module.exports = TimelineView;

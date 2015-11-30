const React = require('react/addons');
const classNames = require('classnames');

const CalendarTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    showTitle: React.PropTypes.boolean,
  },

  getDefaultProps() {
    return {
      title: '',
      showTitle: true,
    };
  },

  render() {
    let result = false;
    const titleClass = classNames('calendar-title');

    if (this.props.showTitle) {
      result = (<div className={titleClass}>{this.props.title}</div>);
    }

    return result;
  },
});

module.exports = CalendarTitle;

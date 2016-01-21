const React = require('react');

const Contact = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    label: React.PropTypes.string,
  },

  getThumbnailStyle() {
    return {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
    };
  },

  getLabelStyle() {
    return {
      width: '250px',
      display: 'inline-block',
      padding: '3px',
      paddingTop: '6px',
      position: 'absolute',
    };
  },

  getContactStyle() {
    return {
      backgroundColor: 'red',
      width: '200px',
      display: 'inline-block',
    };
  },

  renderThumbnail(url) {
    return (
      <img
        src={url}
        style={this.getThumbnailStyle()} />
    );
  },

  renderLabel(label) {
    return (
      <div style={this.getLabelStyle()}>
        {label}
      </div>
    );
  },

  renderContact(url, label) {
    return (
      <div>
        {this.renderThumbnail(url)}
        {this.renderLabel(label)}
      </div>
    );
  },

  render() {
    return (
      <div
        style={this.getContactStyle()}>
        {this.renderContact(this.props.url, this.props.label)}
      </div>
    );
  },
});

module.exports = Contact;

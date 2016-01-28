// const debug = require('debug')('app:components:application');
const React = require('react');

const mui = require('material-ui');
const DropDownMenu = mui.DropDownMenu;
const MenuItem = mui.MenuItem;
const Toolbar = mui.Toolbar;
const ToolbarGroup = mui.ToolbarGroup;
const Divider = mui.Divider;

const TimelineToolbar = React.createClass({
  // contextTypes: {
  //   stores: React.PropTypes.object.isRequired,
  // },

  getInitialState() {
    return {
      groups: null,
      filters: null,
      range: null,
    };
  },

  // componentDidMount() {
  //   this.getStateFromStore();
  // },

  // getStateFromStore() {
  //   this.state = {projects: [], loading: true, spinner: this.state.spinner};
  //   return this.context.stores.contacts.getContacts({})
  //     .then((contacts) => this.setState({contacts, loading: false, spinner: this.state.spinner}))
  //     .catch((err) => {
  //       debug('error loading store data', err);
  //       this.setState({loading: false, spinner: this.state.spinner});
  //     });
  // },
  mocked: true,

  handleChange() {},

  renderGroup() {
    return (
        <DropDownMenu
          value="3"
          style={{margin: '5px'}}
          onChange={this.handleChange}>
          <MenuItem value="1" primaryText="Developers"/>
          <MenuItem value="2" primaryText="Management"/>
          <MenuItem value="3" primaryText="Front End Devs"/>
          <MenuItem value="4" primaryText="Back End Devs"/>
          <Divider />
          <MenuItem value="5" primaryText="Add"/>
          <MenuItem value="6" primaryText="Custom"/>
        </DropDownMenu>
    );
  },

  renderFilter() {
    return (
        <DropDownMenu
          disabled={this.mocked}
          value="1"
          style={{margin: '5px', left: '25px'}}
          onChange={this.handleChange}>
          <MenuItem value="1" primaryText="Out Of Office"/>
          <MenuItem value="2" primaryText="Vacation"/>
          <MenuItem value="3" primaryText="Projects"/>
          <Divider />
          <MenuItem value="4" primaryText="Add"/>
          <MenuItem value="5" primaryText="Custom"/>
        </DropDownMenu>
    );
  },

  renderDateSelector() {
    return (
        <DropDownMenu
          disabled={this.mocked}
          value="1"
          style={{margin: '5px', left: '25px'}}
          onChange={this.handleChange}>
          <MenuItem value="1" primaryText="Year"/>
          <MenuItem value="2" primaryText="Quarter"/>
          <MenuItem value="3" primaryText="Month"/>
          <Divider />
          <MenuItem value="4" primaryText="Custom"/>
        </DropDownMenu>
    );
  },

  render() {
    return (
      <Toolbar>
        <ToolbarGroup
          float="left">
          {this.renderGroup()}
          {this.renderFilter()}
          {this.renderDateSelector()}
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

module.exports = TimelineToolbar;

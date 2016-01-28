// const debug = require('debug')('app:components:application');
const React = require('react');

const mui = require('material-ui');
const DropDownMenu = mui.DropDownMenu;
const MenuItem = mui.MenuItem;
const Toolbar = mui.Toolbar;
const ToolbarGroup = mui.ToolbarGroup;
const Divider = mui.Divider;

const TimelineToolbar = React.createClass({
  contextTypes: {
    stores: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      selectedGroup: null,
      selectedFilter: null,
      selectedRange: null,
      groups: [],
      filters: [],
      range: [],
    };
  },

  componentDidMount() {
    this.getStateFromStore();
  },

  getStateFromStore() {
    // this.state = {projects: [], loading: true, spinner: this.state.spinner};
    // return this.context.stores.contacts.getContacts({})
    //   .then((contacts) => this.setState({contacts, loading: false, spinner: this.state.spinner}))
    //   .catch((err) => {
    //     debug('error loading store data', err);
    //     this.setState({loading: false, spinner: this.state.spinner});
    //   });
    setTimeout(() => {
      this.setState({
        selectedGroup: 3,
        selectedFilter: 1,
        selectedRange: 1,
        groups: [
          {
            id: 1,
            label: 'Developers',
          },
          {
            id: 2,
            label: 'Management',
          },
          {
            id: 3,
            label: 'Front End Devs',
          },
          {
            id: 4,
            label: 'Back End Devs',
          },
        ],
        filters: [
          {
            id: 1,
            label: 'Out Of Office',
          },
          {
            id: 2,
            label: 'Vacation',
          },
          {
            id: 3,
            label: 'Projects',
          },
        ],
        range: [
          {
            id: 1,
            label: 'Year',
          },
          {
            id: 2,
            label: 'Quarter',
          },
          {
            id: 3,
            label: 'Month',
          },
        ],
      });
    }, 500);
  },

  // TODO: Remove after everything is implemented
  mocked: true,

  // TODO: Implement handler to allow for seting state on timelineView
  handleChange() {},

  renderMenu(items, hasAdd, hasCustom) {
    const menu = [];
    if (items) {
      items.map((item) => {
        menu.push(<MenuItem value={item.id} primaryText={item.label} />);
      });
    }
    if (hasAdd || hasCustom) {
      menu.push(<Divider />);
      if (hasAdd) {
        menu.push(<MenuItem value="add" primaryText="Add"/>);
      }
      if (hasCustom) {
        menu.push(<MenuItem value="custom" primaryText="Custom"/>);
      }
    }
    return menu;
  },

  renderGroup() {
    return (
        <DropDownMenu
          value={this.state.selectedGroup}
          style={{margin: '5px'}}
          onChange={this.handleChange}>
          {this.renderMenu(this.state.groups, true, true)}
        </DropDownMenu>
    );
  },

  renderFilter() {
    return (
        <DropDownMenu
          disabled={this.mocked}
          value={this.state.selectedFilter}
          style={{margin: '5px', left: '25px'}}
          onChange={this.handleChange}>
          {this.renderMenu(this.state.filters, true, true)}
        </DropDownMenu>
    );
  },

  renderDateSelector() {
    return (
        <DropDownMenu
          disabled={this.mocked}
          value={this.state.selectedRange}
          style={{margin: '5px', left: '25px'}}
          onChange={this.handleChange}>
          {this.renderMenu(this.state.range, false, true)}
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

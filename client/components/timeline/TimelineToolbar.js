const debug = require('debug')('app:components:application');
const React = require('react');

const mui = require('material-ui');
const DropDownMenu = mui.DropDownMenu;
const MenuItem = mui.MenuItem;
const Toolbar = mui.Toolbar;
const ToolbarGroup = mui.ToolbarGroup;
const Divider = mui.Divider;
const FontIcon = mui.FontIcon;

const TimelineToolbar = React.createClass({
  propTypes: {
    onToolbarChange: React.PropTypes.func,
  },

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
    this.state = {projects: [], loading: true, spinner: this.state.spinner};
    return this.context.stores.groups.getGroups({})
      .then((groups) => {
        this.setState({
          selectedGroup: 0,
          selectedFilter: 10,
          selectedRange: 10,
          groups: groups,
          filters: [
            {
              id: 10,
              label: 'Leave',
              edit: true,
            },
            {
              id: 20,
              label: 'Vacation',
              edit: true,
            },
            {
              id: 30,
              label: 'Projects',
              edit: true,
            },
          ],
          range: [
            {
              id: 10,
              label: 'Year',
              edit: false,
            },
            {
              id: 20,
              label: 'Quarter',
              edit: false,
            },
            {
              id: 30,
              label: 'Month',
              edit: false,
            },
          ],
        });
        this.props.onToolbarChange(0, 'groups');
      })
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false, spinner: this.state.spinner});
      });
  },

  // TODO: Remove after everything is implemented
  mocked: true,

  isMenuIcon(evt) {
    return evt.target.className.indexOf('material-icons') > -1;
  },

  routePage(value, category) {
    // TODO: Route to new page to allow for user to make a new group
    console.log('Rout to group page to: ' + value + ' - ' + category);
  },

  stateChange(evt, value, category, newState) {
    const isEdit = this.isMenuIcon(evt);
    if (isEdit || value === 'add' || value === 'custom') {
      this.routePage(value, category);
    } else {
      this.setState(newState);
      this.props.onToolbarChange(value, category);
    }
    // TODO: Event back to TimelineViewer to load contacts from group
  },

  handleGroupChange(evt, index, value) {
    if (value !== this.state.selectedGroup) {
      this.stateChange(evt, value, 'group', {selectedGroup: value});
    }
  },

  handleFilterChange(evt, index, value) {
    if (value !== this.state.selectedFilter) {
      this.stateChange(evt, value, 'filter', {selectedFilter: value});
    }
  },

  handleRangeChange(evt, index, value) {
    if (value !== this.state.selectedRange) {
      this.stateChange(evt, value, 'range', {selectedRange: value});
    }
  },

  renderEditIcon() {
    return (<FontIcon
      className="material-icons menuIcon">
      mode_edit
    </FontIcon>);
  },

  renderMenu(key, items, hasAdd, hasCustom) {
    const menu = [];
    if (items && items.length > 0) {
      items.map((item) => {
        menu.push(<MenuItem
          key={'menu' + key + item.id}
          value={item.id}
          rightIcon={item.edit ? this.renderEditIcon() : <span key={'menuIcon' + key + item.id} />}
          primaryText={item.label} />);
      });
    }
    if (hasAdd || hasCustom) {
      menu.push(<Divider key="devider" />);
      if (hasAdd) {
        menu.push(<MenuItem key="add" value="add" primaryText="Add"/>);
      }
      if (hasCustom) {
        menu.push(<MenuItem key="custom" value="custom" primaryText="Custom"/>);
      }
    }
    return menu;
  },

  renderGroup() {
    return (
        <DropDownMenu
          value={this.state.selectedGroup}
          style={{margin: '5px'}}
          onChange={this.handleGroupChange}>
          {this.renderMenu('group', this.state.groups, true, true)}
        </DropDownMenu>
    );
  },

  renderFilter() {
    return (
        <DropDownMenu
          disabled={this.mocked}
          value={this.state.selectedFilter}
          style={{margin: '5px', left: '25px'}}
          onChange={this.handleFilterChange}>
          {this.renderMenu('filter', this.state.filters, true, true)}
        </DropDownMenu>
    );
  },

  renderDateSelector() {
    return (
        <DropDownMenu
          disabled={this.mocked}
          value={this.state.selectedRange}
          style={{margin: '5px', left: '25px'}}
          onChange={this.handleRangeChange}>
          {this.renderMenu('range', this.state.range, false, true)}
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

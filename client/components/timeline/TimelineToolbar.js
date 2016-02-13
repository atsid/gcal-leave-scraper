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

  getGroupsFromStore() {
    this.state = {projects: [], loading: true, spinner: this.state.spinner};
    return this.context.stores.groups.getGroups({})
      .then((groups) => {
        this.setState({
          selectedGroup: groups.selected,
          groups: groups.items,
        });
        this.props.onToolbarChange(groups.selected, 'groups');
      })
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false, spinner: this.state.spinner});
      });
  },

  getFiltersFromStore() {
    this.state = {projects: [], loading: true, spinner: this.state.spinner};
    return this.context.stores.filters.getFilters({})
      .then((filters) => {
        this.setState({
          selectedFilter: filters.selected,
          filters: filters.items,
        });
        const filter = this.find('id', filters.selected, filters.items);
        if (filter) {
          this.props.onToolbarChange(filters.selected, 'filters', filter);
        }
      })
      .catch((err) => {
        debug('error loading store data', err);
        this.setState({loading: false, spinner: this.state.spinner});
      });
  },

  getDateFromStore() {
    this.setState({
      selectedRange: 10,
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
  },

  getStateFromStore() {
    this.getFiltersFromStore();
    this.getDateFromStore();
    this.getGroupsFromStore();
  },

  // TODO: Remove after everything is implemented
  mocked: true,

  isMenuIcon(evt) {
    return evt.target.className.indexOf('material-icons') > -1;
  },

  find(prop, value, myArray) {
    let match;
    myArray.map((obj) => {
      if (obj[prop] === value) {
        match = obj;
      }
    });
    return match;
  },

  routePage(value, category) {
    // TODO: Route to new page to allow for user to make a new group
    console.log('Rout to group page to: ' + value + ' - ' + category);
  },

  selectedItem(category, selectedState) {
    let items;
    let selected;
    if (category === 'filters') {
      items = this.state.filters;
      selected = selectedState.selectedFilter;
    } else if (category === 'groups') {
      items = this.state.groups;
      selected = selectedState.selectedGroup;
    } else if (category === 'ranges') {
      items = this.state.ranges;
      selected = selectedState.selectedRange;
    }
    return this.find('id', selected, items);
  },

  stateChange(evt, value, category, newState) {
    const isEdit = this.isMenuIcon(evt);
    if (isEdit || value === 'add' || value === 'custom') {
      this.routePage(value, category);
    } else {
      this.setState(newState);
      this.props.onToolbarChange(value, category, this.selectedItem(category, newState));
    }
    // TODO: Event back to TimelineViewer to load contacts from group
  },

  handleGroupChange(evt, index, value) {
    if (value !== this.state.selectedGroup) {
      this.stateChange(evt, value, 'groups', {selectedGroup: value});
    }
  },

  handleFilterChange(evt, index, value) {
    if (value !== this.state.selectedFilter) {
      this.stateChange(evt, value, 'filters', {selectedFilter: value});
    }
  },

  handleRangeChange(evt, index, value) {
    if (value !== this.state.selectedRange) {
      this.stateChange(evt, value, 'ranges', {selectedRange: value});
    }
  },

  renderEditIcon() {
    return (<FontIcon
      className="material-icons menuIcon"
      style={this.mocked ? {pointerEvents: 'none', opacity: '0.2'} : {}}>
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
        menu.push(<MenuItem key="add" disabled={this.mocked} value="add" primaryText="Add"/>);
      }
      if (hasCustom) {
        menu.push(<MenuItem key="custom" disabled={this.mocked} value="custom" primaryText="Custom"/>);
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

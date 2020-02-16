import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => (
  {
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    title: {
      flex: '1 1 100%'
    },
    closeIcon: {
      float: 'right'
    },
    filtersWrapper: {
      width: '100%'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
  });

class TableFilters extends Component {
  static propTypes = {
    classes: PropTypes.object,
    filters: PropTypes.array,
    onSearch: PropTypes.func,
    onCreate: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      filtersOpen: false,
      filters: {}
    };
  }

  _onFilterChange = (id, value) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [id]: value
      },
    });
  };

  _getFilterComponent = (filter) => {
    const { classes } = this.props;
    switch (filter.type) {
      case 'select':
        return (
          <FormControl key={filter.id} className={classes.formControl}>
            <InputLabel id={`${filter.id}-label`} shrink>{filter.label}</InputLabel>
            <Select
              labelId={filter.label}
              id={filter.id}
              defaultValue={filter.defaultValue}
              onChange={(event) => this._onFilterChange(filter.id, event.target.value)}
              displayEmpty
            >
              {(filter.options || []).map((option) => (
                <MenuItem key={option.value}
                          value={option.value}>{option.text}</MenuItem>))}
            </Select>
          </FormControl>
        );
      case 'text':
      case 'number':
      case 'date':
        return (<TextField key={filter.id} required id={filter.id} label={filter.label} type={filter.type}
                           onChange={(event) => this._onFilterChange(filter.id, event.target.value)
                           }
                           InputLabelProps={{
                             shrink: true,
                           }}
                           {...filter.extraProps}
        />);
      default:
        return null;
    }
  };

  _openFilters = () => {
    this.setState({
      filtersOpen: true
    });
  };

  _closeFilters = () => {
    this.setState({
      filtersOpen: false,
      filters: {}
    });
  };

  _search = () => {
    const { onSearch } = this.props;
    onSearch(this.state.filters);
  };

  render() {
    const { classes, filters, onCreate } = this.props;

    return (
      this.state.filtersOpen ?
        <div className={classes.filtersWrapper}>
          {
            (filters || []).map(f => this._getFilterComponent(f))
          }
          <Tooltip title="Close">
            <IconButton aria-label="close" onClick={this._closeFilters}
                        className={classes.closeIcon}>
              <CloseIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton aria-label="search" onClick={this._search}
                        className={classes.closeIcon}>
              <SearchIcon/>
            </IconButton>
          </Tooltip>
        </div> :
        <Fragment>
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Products
          </Typography>
          <Tooltip title="Create Product">
            <IconButton aria-label="create product" onClick={onCreate}>
              <AddCircleIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list" onClick={this._openFilters}>
              <FilterListIcon/>
            </IconButton>
          </Tooltip>
        </Fragment>
    );
  }
}

export default withStyles(styles)(TableFilters);
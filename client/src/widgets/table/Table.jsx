import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import TableHeader from './TableHeader';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import TableFilters from 'widgets/Table/TableFilters';
import TableActions from 'widgets/Table/TableActions';
import { withStyles, lighten } from '@material-ui/core/styles';

const styles = (theme) => (
  {
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200
      },
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
    tableRow: {
      cursor: 'pointer'
    },
  });


class TableEnhancer extends Component {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    idField: PropTypes.string,
    title: PropTypes.string,
    onRowClick: PropTypes.func,
    onSearch: PropTypes.func,
    selectable: PropTypes.bool,
    filters: PropTypes.array,
    onCreate: PropTypes.func,
    classes: PropTypes.object,
    selectAll: PropTypes.bool,
    actions: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
      selectedRows: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.length && prevProps.data.length !== this.props.data.length) {
      this.setState({
        selectedRows: []
      });
    }
  }

  _handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  _handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  _isSelected = (rowId) => this.state.selectedRows.indexOf(rowId) !== -1;

  handleSelectAllClick = (event) => {
    const { data, idField } = this.props;
    if (event.target.checked) {
      const newSelected = data.map(r => r[idField]);
      this.setState({
        selectedRows: newSelected
      });
      return;
    }

    this.setState({
      selectedRows: []
    });
  };

  _handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const { selectAll } = this.props;
    const { selectedRows } = this.state;
    const selectedIndex = this.state.selectedRows.indexOf(id);
    let newSelected = [];

    if (selectAll) {
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedRows, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedRows.slice(1));
      } else if (selectedIndex === selectedRows.length - 1) {
        newSelected = newSelected.concat(selectedRows.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedRows.slice(0, selectedIndex),
          selectedRows.slice(selectedIndex + 1),
        );
      }
    } else {
      if (selectedIndex === -1) {
        newSelected = [id];
      }
    }

    this.setState({
      selectedRows: newSelected
    });
  };

  render() {
    const { classes, columns, data, idField, onRowClick, selectable, onSearch, filters, onCreate, selectAll, actions } = this.props;
    const { page, rowsPerPage, selectedRows } = this.state;

    return (
      <Fragment>
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: selectedRows.length > 0,
          })}
        >
          {
            selectedRows.length > 0 ? <TableActions
                selectedRowsLength={selectedRows.length}
                actions={actions}
                selectedRows={selectedRows}
              /> :
              <TableFilters
                filters={filters}
                onSearch={onSearch}
                onCreate={onCreate}
              />
          }
        </Toolbar>
        <TableContainer component={Paper}>
          <Table>
            <TableHeader
              selectable={selectable}
              dataLength={data.length}
              selectedRowsLength={selectedRows.length}
              columns={columns}
              selectAll={selectAll}
              handleSelectAllClick={this.handleSelectAllClick}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  const isItemSelected = this._isSelected(row[idField]);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (<TableRow className={classes.tableRow} key={row[idField]} hover
                                    {...(onRowClick ? {
                                      onClick: () => onRowClick(row),
                                    } : {})}>
                    {
                      selectable ?
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            onClick={(event) => this._handleCheckboxClick(event, row[idField])}
                          />
                        </TableCell> : null
                    }
                    {
                      columns.map(c =>
                        <TableCell
                          key={c.id}>{c.cell ? c.cell(row[c.id]) : row[c.id]}</TableCell>)
                    }
                  </TableRow>);
                },
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this._handleChangePage}
                  onChangeRowsPerPage={this._handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }
}

export default withStyles(styles)(TableEnhancer);

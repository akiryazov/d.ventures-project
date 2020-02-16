import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

export default class TableHeader extends Component {
  static propTypes = {
    selectable: PropTypes.bool,
    selectAll: PropTypes.bool,
    dataLength: PropTypes.number,
    selectedRowsLength: PropTypes.number,
    columns: PropTypes.array,
    handleSelectAllClick: PropTypes.func
  };

  render() {
    const { selectable, selectAll, dataLength, selectedRowsLength, columns, handleSelectAllClick } = this.props;

    return (<TableHead>
      <TableRow>
        {
          selectAll ?
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedRowsLength > 0 && selectedRowsLength < dataLength}
                checked={dataLength > 0 && selectedRowsLength === dataLength}
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all products' }}
              />
            </TableCell> : (selectable ? <TableCell padding="checkbox"/> : null)
        }
        {
          columns.map(c =>
            <TableCell
              key={c.id}>{c.label}</TableCell>)
        }
      </TableRow>
    </TableHead>);
  }
}

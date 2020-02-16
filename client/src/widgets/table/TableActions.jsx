import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = () => (
  {
    title: {
      flex: '1 1 100%'
    },
  });

class TableActions extends Component {
  static propTypes = {
    classes: PropTypes.object,
    actions: PropTypes.array,
    selectedRowsLength: PropTypes.number,
    selectedRows: PropTypes.array
  };

  render() {
    const { selectedRowsLength, classes, actions, selectedRows } = this.props;

    return (
      <Fragment>
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {selectedRowsLength} selected
        </Typography>
        {
          actions.map(action => (<Tooltip key={action.id} title={action.title}>
            <IconButton onClick={() => action.onClick(selectedRows)}>
              {action.icon}
            </IconButton>
          </Tooltip>))
        }
      </Fragment>
    );
  }
}

export default withStyles(styles)(TableActions);
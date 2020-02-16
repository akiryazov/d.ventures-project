import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';
import { DRAWER_WIDTH } from 'constants/constants';
import StorefrontIcon from '@material-ui/icons/Storefront';

const styles = () => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  },
});

class Navigation extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div/>
        <Divider/>
        <List>
          {routes.filter(route => route.sideNav).map((route) => (
            <Link key={route.path} to={route.path} style={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon><StorefrontIcon/></ListItemIcon>
                <ListItemText primary={route.name}/>
              </ListItem>
            </Link>))
          }
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Navigation);
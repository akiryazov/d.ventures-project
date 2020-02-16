import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from 'constants/routes';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from 'widgets/appbar/Appbar';
import Navigation from 'widgets/navigation/Navigation';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
});

class Root extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar/>
        <Navigation/>
        <div className={classes.toolbar}/>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Switch>
            {routes.map(r => <Route key={r.path} path={r.path} component={r.component}
                                    exact={r.exact}/>)}
          </Switch>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Root);

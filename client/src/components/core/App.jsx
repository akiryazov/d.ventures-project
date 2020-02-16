import React, { Component } from 'react';
import { Provider as StateProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import Root from 'components/core/Root';
import PropTyes from 'prop-types';
import { history } from 'util/routeHistory';

export default class App extends Component {
  static propTypes = {
    store: PropTyes.object.isRequired
  };

  render() {
    const { store } = this.props;
    return (
      <StateProvider store={store}>
        <Router history={history}>
          <Root/>
        </Router>
      </StateProvider>
    );
  }
}
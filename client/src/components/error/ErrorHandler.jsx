import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearError } from 'reducers/products/actions';

const mapStateToProps = (state) => {
  return {
    error: state.error
  };
};

const mapDispatchToProps = {
  clearError
};

export default function withErrors(WrappedComponent) {
  class ErrorHandler extends Component {

    static propTypes = {
      error: PropTypes.string,
      clearError: PropTypes.func
    };

    componentWillUnmount() {
      this.props.clearError();
    }

    render() {
      const { error, dispatch, ...rest } = this.props;
      return (error ? <div>{error}</div> : <WrappedComponent {...rest}/>);
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from "components/core/App";
import { applyMiddleware, createStore } from 'redux';
import rootReducer from 'reducers/index';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <App store={store}/>,
    document.querySelector('#app')
);
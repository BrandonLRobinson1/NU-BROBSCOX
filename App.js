/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { config } from './private';
import Router from './Router';
import { store } from './src/store';


export default class App extends Component {
  componentWillMount() {
    // TODO: right here load their recent, their favorites, and settings into redux
    firebase.initializeApp(config);

  }

  render() {
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

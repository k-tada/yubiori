import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './utils/redux';
import App from './components/App';

export default class ReduxMain extends Component {
  render() {
    return (
      <Provider store={ configureStore() }>
        <App />
      </Provider>
    );
  }
}


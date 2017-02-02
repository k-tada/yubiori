import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Main from './Main';
import ReduxMain from './redux/ReduxMain';
import routes from './routes';

console.log( 'browserHistory', browserHistory );

ReactDOM.render(
  <Router history={ browserHistory }>{ routes }</Router>,
  document.getElementById('app')
);


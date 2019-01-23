/*eslint-disable import/default */
//by commenting this way eslint wont complaint about that we are using a file that doesn't have a default export.

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from "react-router";
import routes from './routes';
import configureStoreDev from './store/configureStore.dev';
import { Provider } from 'react-redux';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStoreDev();

//dispatch the loadcourses and loadauthors functions as the actions
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './modules/App.jsx';
import style from './styles/main.scss';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/slide/:slideIndex" component={App}/>
  </Router>
), document.getElementById('app'))
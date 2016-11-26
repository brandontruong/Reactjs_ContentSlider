import React from 'react';
import { render } from 'react-dom';
import App from './modules/App.jsx';
import About from './modules/About';
import Repos from './modules/Repos';
import style from './styles/main.scss';
import { Router, Route, hashHistory } from 'react-router';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    {/* add the routes here */}
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('app'))
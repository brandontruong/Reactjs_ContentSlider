import React from 'react';
import { render } from 'react-dom';
import App from './modules/App.jsx';
import style from './styles/main.scss';
import { Router, Route, hashHistory } from 'react-router';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
	<Route path="/slide/:slideIndex" component={App}/>
</Router>
), document.getElementById('app'))
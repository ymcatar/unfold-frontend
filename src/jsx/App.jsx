import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery-browserify';
import {Router, Route, Link, IndexRoute} from 'react-router';

import ReaderView from 'views/ReaderView.jsx';

ReactDOM.render((
    <Router>
        <Route path='/' component={ReaderView}>
        </Route>
    </Router>
), document.getElementById('main'));

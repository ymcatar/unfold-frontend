import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery-browserify';
import {Router, Route, Link, IndexRoute} from 'react-router';

import ReaderView from 'views/ReaderView.jsx';
import ContributorView from 'views/ContributorView.jsx';

ReactDOM.render((
    <Router>
        <Route path='/'>
            <Route path='contributor' component={ContributorView} />
            <IndexRoute path='*' component={ReaderView} />
        </Route>
    </Router>
), document.getElementById('main'));

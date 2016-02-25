import React from 'react';
import ReactDOM from 'react-dom';

import createBrowserHistory from 'history/lib/createBrowserHistory';

const history = createBrowserHistory({ queryKey: false });

import $ from 'jquery-browserify';
import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router';

import ReaderView from 'views/ReaderView.jsx';
import ContributorView from 'views/ContributorView.jsx';

ReactDOM.render((
    <Router history={history}>
        <Route path='/'>
            <Route path='contributor' component={ContributorView} />
            <IndexRoute component={ReaderView} />
        </Route>
    </Router>
), document.getElementById('main'));

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from 'redux/store';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import ReaderView from 'views/ReaderView.jsx';
import ContributorView from 'views/ContributorView.jsx';

const history = createBrowserHistory({ queryKey: false });

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path='/'>
                <Route path='contributor' component={ContributorView} />
                <IndexRoute component={ReaderView} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('main'));

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from 'redux/store';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import ReaderView from 'views/ReaderView.jsx';
import ContributorView from 'views/ContributorView.jsx';
import ErrorView from 'views/ErrorView.jsx';

const history = createBrowserHistory({ queryKey: false });

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path='/main'>
                <Route path='reader'>
                    <Route path=":eventId" component={ReaderView} />
                </Route>
                <Route path='contributor'>
                    <Route path=":eventId" component={ContributorView} />
                </Route>
                <IndexRoute component={ErrorView} />
            </Route>
            <IndexRoute component={ErrorView} />
        </Router>
    </Provider>
), document.getElementById('main'));

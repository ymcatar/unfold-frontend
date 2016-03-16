import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router';

import ReaderView from 'views/ReaderView.jsx';
import store from './store';

const history = createBrowserHistory({ queryKey: false });

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Route path='/'>
                <IndexRoute component={ReaderView} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('main'));

import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
window.$ = $;

import { Provider } from 'react-redux';
import store from 'redux/store';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import {Router, Route, browserHistory} from 'react-router';

import ReaderView from 'views/ReaderView.jsx';
import ContributorView from 'views/ContributorView.jsx';
import TranslatorView from 'views/TranslatorView.jsx';
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
                <Route path='translator'>
                    <Route path=":eventId" component={TranslatorView} />
                </Route>
                <Route path='*' component={ErrorView} />
            </Route>
            <Route path='*' component={ErrorView} />
        </Router>
    </Provider>
), document.getElementById('main'));

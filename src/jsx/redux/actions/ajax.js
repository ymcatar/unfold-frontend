import { domain } from 'config/config';
import fetch from 'isomorphic-fetch';

import { showError, hideLogin } from './modal';

export const RECEIVE_EVENT = 'ajax: receive event';
let receiveEvent = data => {
    return {
        type: RECEIVE_EVENT,
        data
    };
};

export const FETCH_EVENT = 'ajax: fetch event';
export let fetchEvent = id => {
    id = 'dbc13850-804f-474b-a274-7d15d7665c12' || id;
    return function(dispatch) {
        dispatch(receiveEvent());
        // return fetch(`${domain}/event/${id}`)
        //     .then(msg => msg.json())
        //     .then(data => dispatch(receiveEvent(data)))
        //     .catch(console.error.bind(console));
    };
};

export const RECEIVE_LOGIN = 'ajax: receive login';
let receiveLogin = data => {
    return {
        type: RECEIVE_LOGIN,
        data
    };
};

export const LOAD_LOGIN = 'ajax: load login';
export let loadLogin = (token, exp) => {
    return function(dispatch) {
        return new Promise((resolve, reject) => {
            dispatch(receiveLogin({token, exp}));
            resolve();
        });
    };
};

export const LOAD_LOGOUT = 'ajax: load logout';
export let loadLogout = () => ({
    type: LOAD_LOGOUT
});

export const POST_LOGIN = 'ajax: post login';
export let postLogin = (username, password) => {
    return function(dispatch) {
        return fetch(`${domain}/auth`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        dispatch(receiveLogin(data));
                        dispatch(getUser(username));
                        dispatch(hideLogin());
                    });
                } else {
                    dispatch(showError('Login failed. Please try again.'));
                }
            });
    };
};

export const RECEIVE_USER = 'ajax: receive user';
let receiveUser = data => {
    return {
        type: RECEIVE_USER,
        data
    };
};

export const POST_USER = 'ajax: get user';
export let getUser = username => {
    return function(dispatch) {
        return fetch(`${domain}/user/${username}`)
            .then(res => res.json())
            .then(data => {
                dispatch(receiveUser(data));
            });
    };
};

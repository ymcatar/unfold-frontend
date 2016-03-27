import { domain } from 'config/config';
import fetch from 'isomorphic-fetch';

import { showError, hideLogin, showSuccess } from './modal';

/* event */

export const RECEIVE_EVENT = 'ajax: receive event';
let receiveEvent = data => ({ type: RECEIVE_EVENT, data });

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

/* login */

export const RECEIVE_LOGIN = 'ajax: receive login';
let receiveLogin = data => ({ type: RECEIVE_LOGIN, data });

export let loadLogin = (token, exp) => {
    return function(dispatch) {
        return new Promise((resolve, reject) => {
            dispatch(receiveLogin({token, exp}));
            resolve();
        });
    };
};

export const LOAD_LOGOUT = 'ajax: load logout';
export let loadLogout = () => ({ type: LOAD_LOGOUT });

export let postLogin = (username, password) => {
    return function(dispatch) {
        return fetch(`${domain}/auth`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({username, password})
            })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        dispatch(receiveLogin(data));
                        dispatch(getUser(username));
                        dispatch(showSuccess('Login success.'));
                    });
                } else {
                    dispatch(showError('Login failed. Please try again.'));
                }
            });
    };
};

/* user */

export const RECEIVE_USER = 'ajax: receive user';
let receiveUser = data => ({ type: RECEIVE_USER, data });

export let getUser = id => {
    return function(dispatch) {
        return fetch(`${domain}/user/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch(receiveUser(data));
            });
    };
};

export let putUser = (id, name, profile) => {
    return function(dispatch) {
        return fetch(`${domain}/user/${id}`, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({name, profile})
        })
        .then(res => {
            if (res.status == 200)
                dispatch(showSuccess('Profile successfully updated.'));
            else
                dispatch(showError('Profile update failed. Please try again.'));
        })
        .catch(err => {dispatch(showError('Profile update failed. Please try again.')); });
    };
};

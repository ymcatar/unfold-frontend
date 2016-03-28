import { domain } from 'config/config';
import fetch from 'isomorphic-fetch';

import { showError, hideLogin, showSuccess } from './modal';

/* event */

export const RECEIVE_EVENT = 'ajax: receive event';
let receiveEvent = data => ({ type: RECEIVE_EVENT, data });

export let fetchEvent = id => {
    return function(dispatch) {
        return fetch(`${domain}/event/${id}`)
            .then(msg => msg.json())
            .then(data => dispatch(receiveEvent(data)))
            .catch(console.error.bind(console));
    };
};

export let putEvent = (token, eventId, data) => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoibnlhbmNhdF81NjU2IiwibmFtZSI6Ik55YW4gQ2F0IiwiY3JlYXRlZEF0IjoiMjAxNi0wMy0yN1QxNzoyOTo0OC40ODdaIiwicHJvZmlsZSI6e319LCJpYXQiOjE0NTkwOTk3ODgsImV4cCI6MTQ1OTEwMDY4OH0.7XsiWPB-Y1Qr-uRmJusP1YYw_5yf4DouZDXq7xrpEYA' // hard code the token for now
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        dispatch(showSuccess('Stream settings saved successfully.'));
                        dispatch(fetchEvent(eventId));
                    });
                } else {
                    dispatch(showError('Editing settings failed. Please try again.'));
                }
            });
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

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
                    'Authorization': token
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                if (res.status == 200) {
                    dispatch(showSuccess('Stream settings saved successfully.'));
                    dispatch(fetchEvent(eventId));
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

export let putUser = (token, id, name, profile) => {
    return function(dispatch) {
        return fetch(`${domain}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({name, profile})
        })
        .then(res => {
            if (res.status == 200) {
                dispatch(showSuccess('Profile successfully updated.'));
                dispatch(getUser(id));
            }
            else
                dispatch(showError('Profile update failed. Please try again.'));
        })
        .catch(err => {dispatch(showError('Profile update failed. Please try again.')); });
    };
};

/* timeline */

export const RECEIVE_TIMELINE = 'ajax: receive timeline';
let receiveTimeline = data => ({ type: RECEIVE_TIMELINE, data });

export let getTimeline = eventId => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}/timeline`)
            .then(res => res.json())
            .then(data => {
                dispatch(receiveTimeline(data.posts));
            });
    };
};

/* timegram */

export const RECEIVE_TIMEGRAM = 'ajax: receive timegram';
let receiveTimegram = data => ({ type: RECEIVE_TIMEGRAM, data });

export let getTimegram = eventId => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}/timegram?resolution=3600`)
            .then(res => res.json())
            .then(data => {
                dispatch(receiveTimegram(data));
            });
    };
};

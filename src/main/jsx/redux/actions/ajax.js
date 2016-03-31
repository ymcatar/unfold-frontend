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

/* post */

export const ENQUEUE_POST = 'ajax: enqueue post';
let enqueuePost = data => ({ type: ENQUEUE_POST, data });

export const DEQUEUE_POST = 'ajax: dequeue post';
export let dequeuePost = () => ({ type: DEQUEUE_POST });

const post = {
	"data": {
		"siteImage": "https://abs.twimg.com/a/1458881967/img/t1/favicon.svg",
		"authorImage": null,
		"rel": "TEXT",
		"title": "Richard Frost on Twitter",
		"content": "At the barricades outside Mandarin Hotel. People dressed for tear gas. Umbrellas are strung through the fences. HK pic.twitter.com/WuyADbLd6e&mdash; Richard Frost (@frostyhk) September 29, 2014\n",
		"url": "https://twitter.com/frostyhk/status/516633958000234498",
		"site": "twitter.com",
		"author": "Richard Frost"
	},
	"id": "44666ff9-3df2-4e08-9cb6-333fdae04abe",
	"caption": "This is a new post!",
	"tags": [],
	"createdAt": "2016-03-27T17:31:25.458Z",
	"updatedAt": "2016-03-27T17:33:31.410Z",
	"authorId": "umbrella_19632",
	"eventId": "2ff24461-dea2-4240-9db6-4b5bb5eafaed",
	"author": {
		"id": "umbrella_19632",
		"name": "Socrates Oliver",
		"createdAt": "2016-03-27T17:30:47.051Z",
		"profile": {
			"description": "Test1234"
		}
	}
};

export let simulatePost = () => {
    return function(dispatch) {
        setTimeout(() => {
            dispatch(enqueuePost(post));
        }, 10000);
    };
};

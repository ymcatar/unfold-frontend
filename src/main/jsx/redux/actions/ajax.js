import { domain, socket_domain } from 'config/config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import { showError, hideLogin, showSuccess } from './modal';
import { showErrorPage } from './ui';

/* event */

export const RECEIVE_EVENT = 'ajax: receive event';
let receiveEvent = data => ({ type: RECEIVE_EVENT, data });

export let fetchEvent = id => {
    return function(dispatch) {
        return fetch(`${domain}/event/${id}`)
            .then(msg => msg.json())
            .then(data => new Promise((resolve, reject) => {
                if (data.error)
                    reject(data.error);
                else
                    resolve(data);
            }))
            .then(data => dispatch(receiveEvent(data)))
            .catch(err => {
                dispatch(showErrorPage(err));
            });
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
            if (moment.unix(exp).isSameOrBefore(moment())) {
                fetch(`${domain}/auth`, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({token})
                })
                .then(res => {
                    if (res.status == 200) {
                        res.json().then(data => {
                            dispatch(receiveLogin(data));
                        });
                    } else {
                        dispatch(showError('Login failed. Please try again.'));
                    }
                });
            } else {
                dispatch(receiveLogin({token, exp}));
                resolve();
            }
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

/* stream */

export const RECEIVE_STREAM = 'ajax: receive stream';
let receiveStream = data => ({ type: RECEIVE_STREAM, data });

export let getStream = (eventId, lang) => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}/timeline${lang?`?language=${lang}`: ''}`)
        //return fetch(`${domain}/event/${eventId}/timeline`)
            .then(res => res.json())
            .then(data => {
                dispatch(receiveStream(data.posts));
            });
    };
};

export const RECEIVE_RAW = 'ajax: receive raw';
let receiveRaw = data => ({ type: RECEIVE_RAW, data });

export let getRaw = () => {
    return function(dispatch) {
        dispatch(receiveRaw());
    };
};

/* timegram */

export const RECEIVE_TIMEGRAM = 'ajax: receive timegram';
let receiveTimegram = data => ({ type: RECEIVE_TIMEGRAM, data });

export let getTimegram = eventId => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}/timegram?resolution=3600&sparse=true`)
            .then(res => res.json())
            .then(data => {
                dispatch(receiveTimegram(data));
            });
    };
};

/* tags */

export const RECEIVE_TAGS = 'ajax: receive tags';
let receiveTags = data => ({ type: RECEIVE_TAGS, data });

export let getTags = eventId => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}/tags`)
            .then(res => res.json())
            .then(data => {
                dispatch(receiveTags(data));
            });
    };
};

/* translation */

export let putTranslation = (token, eventId, postId, data) => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}/timeline/${postId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.status == 200)
                dispatch(showSuccess('Update successfully added.'));
            else
                dispatch(showError('Update adding failed. Please try again.'));
        })
        .catch(err => {
            console.error(err);
            dispatch(showError('Update adding failed. Please try again.'));
        });
    };
};

/* post */

export const RECEIVE_POST = 'ajax: receive post';
export let receivePost = data => ({ type: RECEIVE_POST, data });

export let postPost = (token, eventId, data) => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}/timeline`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.status == 201)
                dispatch(showSuccess('Update successfully added.'));
            else
                dispatch(showError('Update adding failed. Please try again.'));
        })
        .catch(err => {
            console.error(err);
            dispatch(showError('Update adding failed. Please try again.'));
        });
    };
};

export let startStreaming = eventId => {
    return function(dispatch) {
        let client = new WebSocket(`${socket_domain}/event/${eventId}`);
        // client.onopen = event => {
        //     console.log('Connected!');
        // };
        client.onmessage = event => {
            let { data } = event;
            data = JSON.parse(data);
            if (data.type == 'created' && data.resource === 'post' && !data.data.data) // so many data!
                dispatch(receivePost(data.data));
            else if (data.type == 'updated' && data.resource === 'post')
                dispatch(receivePost(data.data));
        };
        client.onerror = err => {
            console.error(err);
        };
    };
};

/* scraper */

export const RECEIVE_SCRAPER_CONFIG = 'ajax: scraper config';
export let receiveScraperConfig = data => ({ type: RECEIVE_SCRAPER_CONFIG, data });

export const getScrapperConfig = (token, eventId) => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}/sources`, {
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch(receiveScraperConfig(data));
            })
            .catch(err => {
                console.error(err);
            });
    };
};

export let putScraperConfig = (token, eventId, data) => {
    return function(dispatch) {
        return fetch(`${domain}/event/${eventId}/sources`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.status == 200)
                dispatch(showSuccess('Update successfully added.'));
            else
                dispatch(showError('Update adding failed. Please try again.'));
        })
        .catch(err => {
            console.error(err);
            dispatch(showError('Update adding failed. Please try again.'));
        });
    };
};

export const RECEIVE_SCRAPER_POST = 'ajax: receive scraper post';
let receiveScraperPost = data => ({ type: RECEIVE_SCRAPER_POST, data });

export let startScraper = (token, eventId) => {
    return function(dispatch) {
        let client = new WebSocket(`${socket_domain}/event/${eventId}/ticks`);
        client.onopen = event => {
            console.log('Connected!');
        };
        client.onmessage = event => {
            let { data } = event;
            data = JSON.parse(data);
            if (data.type === 'created' && data.resource === 'tick') // so many data!
                dispatch(receiveScraperPost(data.data));
        };
    };
};

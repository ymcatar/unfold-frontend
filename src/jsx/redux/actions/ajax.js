import { domain } from 'config/config';
import fetch from 'isomorphic-fetch';

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
        return true;
        // return fetch(`${domain}/event/${id}`)
        //     .then(msg => msg.json())
        //     .then(data => dispatch(receiveEvent(data)))
        //     .catch(console.error.bind(console));
    };
};

export const RECEVIVE_LOGIN = 'ajax: receive login';
let receiveLogin = data => {
    return {
        type: RECEVIVE_LOGIN,
        data
    };
};

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
            .then(msg => msg.json())
            .then(data => {
                dispatch(receiveLogin(data));
            })
            .catch(console.error.bind(console));
    };
};

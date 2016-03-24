import { domain } from 'config/config';
import fetch from 'isomorphic-fetch';

export const RECEIVE_EVENT = 'event: receive event';
let receiveEvent = data => {
    return {
        type: RECEIVE_EVENT,
        data
    };
};

export const FETCH_EVENT = 'event: fetch event';
export let fetchEvent = id => {
    id = 'dbc13850-804f-474b-a274-7d15d7665c12' || id;
    return function(dispatch) {
        return fetch(`${domain}/event/${id}`)
            .then(msg => msg.json())
            .then(data => dispatch(receiveEvent(data)))
            .catch(console.error.bind(console));
    };
};

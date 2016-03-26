import _ from 'lodash';

import { event as placeholder } from 'config/placeholder/event';

import { RECEIVE_EVENT } from '../actions/ajax';

const initialState = placeholder;

export default function reduceEvent(state, action) {

    let changes = {};

    switch (action.type) {
        case RECEIVE_EVENT:
            let { event } = state;
            changes.event = placeholder;
            break;
        case RECEIVE_LOGIN:
            console.log(action.data);
            break;
    }

    return _.defaults({ changes }, state);
}

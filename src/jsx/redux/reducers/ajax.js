import _ from 'lodash';

import { event as placeholder } from 'config/placeholder/event';

import * as actions from '../actions/ajax';

const initialState = placeholder;

export default function reduceEvent(state, action) {

    let changes = {};

    switch (action.type) {
        case actions.RECEIVE_EVENT:
            let { event } = state;
            changes.event = placeholder;
            break;
        case actions.RECEIVE_LOGIN:
            console.log(action.data);
            break;
    }

    return _.defaults(changes, state);
}

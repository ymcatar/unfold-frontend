import _ from 'lodash';

import * as actions from '../actions/event';
import { event as placeholder } from 'config/placeholder/event';

const initialState = placeholder;

export default function reduceEvent(state, action) {
    let {event} = state;
    event = event || initialState;

    switch (action.type) {
        case actions.RECEIVE_EVENT:
            //event = _.defaults(action.data, event);
            break;
    }

    return _.defaults({event}, state);
}

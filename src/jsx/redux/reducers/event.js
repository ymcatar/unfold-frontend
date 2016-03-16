import actions from '../actions/event';
import _ from 'lodash';

import * as EventData from 'config/placeholder/event';

const initialState = EventData;

export default function reduceEvent(state, action) {
    let {event} = state;
    event = event || initialState;
    return _.defaults({event}, state);
}

import actions from '../actions/event';
import _ from 'lodash';

import Placeholder from '../config/Placeholder.jsx';

const initialState = Placeholder;

export default function reduceEvent(state, action) {
    let {event} = state;

    event = event || initialState;

    return _.defaults({event}, state);
}

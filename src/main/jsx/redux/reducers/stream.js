import _ from 'lodash';
import uuid from 'node-uuid';

import * as actions from '../actions/stream';

const initialState = {
    filter: 'all',
    completeStream: [],
    filteredStream: [],
    completeNewStream: [],
    filteredNewStream: [],
    tags: []
};

initialState.filteredStream = initialState.completeStream;

export default function reduceStream(state, action) {
    let {event, stream} = state;
    stream = stream || initialState;

    switch (action.type) {
        case actions.SELECT_FILTER:
            stream = {
                filter: action.filter,
                filteredStream: action.filter === 'all'?
                    stream.completeStream: stream.completeStream.filter(item => (
                        item.tags && item.tags.indexOf(action.filter) >= 0
                    )),
                filteredNewStream: action.filter === 'all'?
                    stream.completeNewStream: stream.completeNewStream.filter(item => (
                        item.tags && item.tags.indexOf(action.filter) >= 0
                    )),
                position: 0
            };
            break;

        case actions.SCROLL_TO:
            stream = {
                scrollPending: true,
                position: action.position
            };
            break;

        case actions.RESET_SCROLL:
            stream = {
                scrollPending: false
            };
            break;
    }
    return _.defaults({ stream: _.defaults(stream, state.stream) }, state);
}

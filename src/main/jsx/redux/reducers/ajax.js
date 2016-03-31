import _ from 'lodash';

import { event as placeholder } from 'config/placeholder/event';

import rawPlaceholder from 'config/placeholder/raw';

import * as actions from '../actions/ajax';

const initialState = placeholder;

export default function reduceEvent(state, action) {

    let changes = {};

    switch (action.type) {
        case actions.RECEIVE_EVENT: {
            let { event } = state;
            changes.event = action.data || placeholder;
            changes.event.roles = placeholder.roles; // using placeholder until avatar upload added
            break;
        }
        case actions.LOAD_LOGIN:
        case actions.RECEIVE_LOGIN: {
            let { user } = state;
            localStorage.token = action.data.token;
            localStorage.exp = action.data.exp;
            changes.auth = {
                token: action.data.token,
                exp: action.data.exp
            };
            break;
        }
        case actions.LOAD_LOGOUT: {
            delete state.auth;
            delete state.user;
            delete localStorage.token;
            delete localStorage.exp;
            break;
        }
        case actions.RECEIVE_USER: {
            let { user } = state;
            localStorage.user = action.data.id;
            changes.user = action.data;
            break;
        }

        case actions.RECEIVE_STREAM: {
            state.stream.filteredStream = action.data;
            state.stream.completeStream = action.data;
            return state;
        }

        case actions.RECEIVE_RAW: {
            state.stream.filteredStream = rawPlaceholder;
            state.stream.completeStream = rawPlaceholder;
            return state;
        }

        case actions.RECEIVE_TIMEGRAM: {
            state.timeline = {};
            state.timeline.span = action.data.span;
            state.timeline.timegram = action.data.timegram;
            return state;
        }

        case actions.RECEIVE_POST: {
            state.stream.completeNewStream = state.stream.completeNewStream || [];
            state.stream.filteredNewStream = state.stream.filteredNewStream || [];
            state.stream.completeNewStream = state.stream.completeNewStream.concat([action.data]);

            if (action.data.tags.indexOf(state.stream.filter) >= 0 || state.stream.filter === "all")
                state.stream.filteredNewStream = state.stream.filteredNewStream.concat([action.data]);

            return state;
        }
    }
    return _.defaults(changes, state);
}

import _ from 'lodash';

import { event as placeholder } from 'config/placeholder/event';

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

        case actions.RECEIVE_TIMELINE: {
            state.stream.filteredStream = action.data;
            state.stream.completeStream = action.data;
            return state;
        }

        case actions.RECEIVE_TIMEGRAM: {
            state.timeline = {};
            state.timeline.span = action.span;
            state.timeline.timegram = action.timegram;
            return state;
        }
    }
    return _.defaults(changes, state);
}

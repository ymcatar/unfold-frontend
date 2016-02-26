import React from 'react';
import _ from 'lodash';
import uuid from 'node-uuid';

import * as actions from '../actions/stream';
import Placeholder from '../config/Placeholder.jsx';
import UpdateBox from '../stream/common/UpdateBox.jsx';

class ElementStore {
    constructor(data) {
        this.data = data || {};
    }

    get(key) {
        return this.data[key];
    }

    set(key, entry) {
        this.data[key] = entry;
        // Pretend to be immutable =)
        return new ElementStore(this.data);
    }

    forEach(iteratee) {
        // FIXME: order of forEach may not be stable
        _.forEach(this.data, (entry, key) => iteratee(entry, key));
    }
}

const stream = Placeholder.readerStream
    .map(post => {
        let id = uuid.v1();
        let contributor = Placeholder.contributors.filter(user => user.id === post.contributor)[0];
        return _.defaults({id, contributor}, post);
    })
    .sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime));

const top = {
    index: 0,
    offset: 0,
    scrollTop: 0
};

const initialState = {
    filter: 'all',
    completeStream: stream,
    filteredStream: stream,
    position: top,
    elements: new Array(stream.length),
    cachedElements: [],
    elementStore: new ElementStore()
};

initialState.filteredStream = initialState.completeStream;

export default function reduceStream(state, action) {
    let {event, stream} = state;

    stream = stream || initialState;

    switch (action.type) {
        case actions.SELECT_FILTER: {
            stream = {
                filter: action.filter,

                filteredStream: action.filter === 'all'
                    ? stream.completeStream
                    : stream.completeStream.filter(item => (
                        item.tags && item.tags.indexOf(action.filter) >= 0
                    )),

                position: top
            };
            break;
        }

        case actions.SCROLL_TO: {
            let index = -1;

            if (action.top)
                index = 0;
            else
                index = _.findIndex(stream.completeStream,
                                    x => new Date(x.submitTime) - action.date < 0);

            if (index === -1)
                index = stream.completeStream.length - 1;

            stream = {
                position: {
                    index: index,
                    offset: 0,
                    force: true
                }
            };
            break;
        }

        case actions.REPORT_SCROLL: {
            stream = {
                position: action.position
            };
            break;
        }

        case actions.REPORT_VIEWPORT: {
            // Load data or something fancy
            break;
        }
    }
    return _.defaults({stream: _.defaults(stream, state.stream)}, state);
}
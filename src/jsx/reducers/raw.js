import _ from 'lodash';
import uuid from 'node-uuid';

import * as actions from 'actions/stream';
import Placeholder from '../config/Placeholder.jsx';

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

const stream = Placeholder.contributorStream
    .map(post => {
        let id = uuid.v1();
        return _.defaults({id}, post);
    })
    .sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime));

const top = {
    index: 0,
    offset: 0
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

export default function reduceRaw(state, action) {
    let {raw: stream} = state;

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
                index = _.findIndex(stream.filteredStream,
                                    x => new Date(x.submitTime) - action.date < 0);

            if (index === -1)
                index = stream.filteredStream.length - 1;

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

        case actions.CREATE_POST: {
            const types = ['facebook', 'twitter', 'imgur', 'youtube', 'flickr', 'text'];
            let type = _.find(types, x => action.post.source.path.indexOf(x) !== -1);
            // For prototyping purpose only
            let post = {
                content: action.post.content,
                tags: action.post.tags,
                source: action.post.source,
                type: type,

                id: uuid.v1(),
                submitTime: new Date(2014, 9, 1, 8, 12),
                contributor: Placeholder.contributors[0]
            };
            stream = {
                completeStream: [post, ...stream.completeStream],
                filteredStream:
                    (stream.filter === 'all' || action.tags.indexOf(stream.filter) !== -1)
                        ? [post, ...stream.filteredStream]
                        : stream.filteredStream
            };
        }
    }
    return _.defaults({raw: _.defaults(stream, state.raw)}, state);
}

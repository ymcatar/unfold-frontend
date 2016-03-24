import _ from 'lodash';
import uuid from 'node-uuid';

import * as actions from '../actions/raw';

import StreamData from 'config/placeholder/raw';

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

const stream = StreamData
    .map(post => {
        let id = uuid.v1();
        return _.defaults({id}, post);
    })
    .sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime));

const top = { index: 0, offset: 0 };

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
    let {event, raw} = state;
    raw = raw || initialState;

    switch (action.type) {
        case actions.SELECT_FILTER:
            raw = {
                filter: action.filter,
                filteredStream: action.filter === 'all'?
                    raw.completeStream: raw.completeStream.filter(item => (
                        item.tags && item.tags.indexOf(action.filter) >= 0
                    )),
                position: top
            };
            break;

        case actions.SELECT_ADDEDPOST:
            raw = { addedPost: action.addedPost };
            break;

        case actions.SCROLL_TO:
            let index = -1;

            if (action.top)
                index = 0;
            else
                index = _.findIndex(raw.filteredStream, x => new Date(x.submitTime) - action.date < 0);

            if (index === -1)
                index = raw.filteredStream.length - 1;

            raw = { position: { index: index, offset: 0, force: true } };
            break;

        case actions.REPORT_SCROLL: {
            raw = { position: action.position };
            break;
        }

        case actions.REPORT_VIEWPORT: {
            // Load data or something fancy
            break;
        }

        case actions.CREATE_POST: {
            const types = ['facebook', 'twitter', 'imgur', 'youtube', 'flickr', 'text'];
            let type = _.find(types, x => action.post.source.path.indexOf(x) !== -1);

            let post = {
                content: action.post.content,
                tags: action.post.tags,
                source: action.post.source,
                type,
                id: uuid.v1(),
                submitTime: new Date(2014, 9, 1, 8, 12),
                contributor: Placeholder.contributors[0]
            };
            raw = {
                completeStream: [post, ...raw.completeStream],
                filteredStream:
                    (raw.filter === 'all' || action.tags.indexOf(raw.filter) !== -1)?
                        [post, ...raw.filteredStream]: raw.filteredStream
            };
        }
    }
    return _.defaults({ raw: _.defaults(raw, state.raw) }, state);
}

import _ from 'lodash';
import uuid from 'node-uuid';

import Placeholder from 'config/Placeholder.jsx';

class ElementStore {
    constructor(data = {}) {
        this.data = data;
    }
    get(key) {
        return this.data[key];
    }
    set(key, entry) {
        this.data[key] = entry;
        return new ElementStore(this.data);
    }
    forEach(iteratee) {
        _.forEach(this.data, (entry, key) => iteratee(entry, key));
    }
}

const stream = Placeholder.contributorStream
    .map(post => {
        let id = uuid.v1();
        return _.defaults({id}, post);
    })
    .sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime));

const initialState = {
    completeStream: stream,
    elementStore: new ElementStore()
};

export default function reduceRaw(state, action) {
    let {raw} = state;
    raw = raw || initialState;

    switch(action.type) {

    }
    return _.defaults({raw: _.defaults(raw, state.raw)}, state);
}

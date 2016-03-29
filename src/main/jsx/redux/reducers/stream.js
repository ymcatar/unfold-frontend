import _ from 'lodash';
import uuid from 'node-uuid';

import * as actions from '../actions/stream';

// import StreamData from 'config/placeholder/stream';
// import { roles } from 'config/placeholder/event';

// let ContributorsData = roles.filter(i => i.type === "CONTRIBUTOR");

// const stream = StreamData
//     .map(post => {
//         let id = uuid.v1();
//         let contributor = ContributorsData.filter(user => user.id === post.contributor)[0];
//         return _.defaults({id, contributor}, post);
//     })
//     .sort((a, b) => new Date(b.submitTime) - new Date(a.submitTime));

const initialState = {
    filter: 'all',
    completeStream: [],
    filteredStream: [],
    position: { index: 0, offset: 0 }
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
                position: top
            };
            break;

        case actions.SELECT_ADDEDPOST:
            stream = { addedPost: action.addedPost };
            break;

        case actions.SCROLL_TO:
            let index = -1;

            if (action.top)
                index = 0;
            else
                index = _.findIndex(stream.filteredStream, x => new Date(x.submitTime) - action.date < 0);

            if (index === -1)
                index = stream.filteredStream.length - 1;

            stream = { position: { index: index, offset: 0, force: true } };
            break;

        case actions.REPORT_SCROLL: {
            stream = { position: action.position };
            break;
        }

        case actions.REPORT_VIEWPORT: {
            // Load data or something fancy
            break;
        }
    }
    return _.defaults({ stream: _.defaults(stream, state.stream) }, state);
}

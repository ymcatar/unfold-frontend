import event from './event';
import stream from './stream';

export default function reducer(state, action) {
    state = state || {};
    state = event(state, action);
    state = stream(state, action);

    return state;
}

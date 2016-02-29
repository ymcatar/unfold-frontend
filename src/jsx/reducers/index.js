import event from './event';
import stream from './stream';
import raw from './raw';

export default function reducer(state, action) {
    state = state || {};
    state = event(state, action);
    state = stream(state, action);
    state = raw(state, action);
    return state;
}

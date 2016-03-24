import event from './event';
import stream from './stream';
import raw from './raw';
import modal from './modal';

export default function reducer(state, action) {
    state = state || {};
    state = event(state, action);
    state = stream(state, action);
    state = raw(state, action);
    state = modal(state, action);
    return state;
}
